const db = require('../db/knex');
const logger = require('../utils/logger');

exports.getOverview = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }

        const now = new Date();
        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // 0th day = last day of previous month

        // 🗂 Bookings
        const [{ totalBookings }] = await db('consultations').whereNull('deleted_at').count('id as totalBookings');
        const [{ thisMonthBookings }] = await db('consultations').whereNull('deleted_at').where('created_at', '>=', firstDayThisMonth).count('id as thisMonthBookings');
        const [{ lastMonthBookings }] = await db('consultations').whereNull('deleted_at').whereBetween('created_at', [firstDayLastMonth, lastDayLastMonth]).count('id as lastMonthBookings');

        // 📞 Contacts
        const [{ totalContacts }] = await db('contacts').whereNull('deleted_at').count('id as totalContacts');
        const [{ thisMonthContacts }] = await db('contacts').whereNull('deleted_at').where('created_at', '>=', firstDayThisMonth).count('id as thisMonthContacts');
        const [{ lastMonthContacts }] = await db('contacts').whereNull('deleted_at').whereBetween('created_at', [firstDayLastMonth, lastDayLastMonth]).count('id as lastMonthContacts');

        // 👤 Users
        const [{ totalUsers }] = await db('users').count('id as totalUsers');
        const [{ thisMonthUsers }] = await db('users').where('created_at', '>=', firstDayThisMonth).count('id as thisMonthUsers');
        const [{ lastMonthUsers }] = await db('users').whereBetween('created_at', [firstDayLastMonth, lastDayLastMonth]).count('id as lastMonthUsers');

        // 🧠 Conversion Rate calculations
        const overallConversionRate = totalUsers > 0 ? ((totalBookings / totalUsers) * 100).toFixed(2) : "0";

        const thisMonthConversionRate = thisMonthUsers > 0 ? ((thisMonthBookings / thisMonthUsers) * 100).toFixed(2) : "0";
        const lastMonthConversionRate = lastMonthUsers > 0 ? ((lastMonthBookings / lastMonthUsers) * 100).toFixed(2) : "0";

        const calculateGrowth = (current, last) => {
            if (last == 0) return 100; // if no last month, assume 100% growth
            return (((current - last) / last) * 100).toFixed(2);
        };

        const conversionGrowth = calculateGrowth(thisMonthConversionRate, lastMonthConversionRate);

        res.json({
            totalBookings: {
                count: parseInt(totalBookings),
                growth: calculateGrowth(thisMonthBookings, lastMonthBookings) + "%"
            },
            totalContacts: {
                count: parseInt(totalContacts),
                growth: calculateGrowth(thisMonthContacts, lastMonthContacts) + "%"
            },
            totalUsers: {
                count: parseInt(totalUsers),
                growth: calculateGrowth(thisMonthUsers, lastMonthUsers) + "%"
            },
            conversionRate: {
                rate: `${overallConversionRate}%`,
                growth: `${conversionGrowth}%`
            }
        });

    } catch (err) {
        logger.error('❌ Failed to get dashboard stats', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
