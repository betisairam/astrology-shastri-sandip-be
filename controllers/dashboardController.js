const db = require('../db/knex');
const logger = require('../utils/logger');

exports.getOverview = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }

        const now = new Date();
        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // 🗂 Bookings (consultations)
        const [{ totalBookings }] = await db('consultations')
            .whereNull('deleted_at')
            .count('id as totalBookings');
        const [{ thisMonthBookings }] = await db('consultations')
            .whereNull('deleted_at')
            .where('created_at', '>=', firstDayThisMonth)
            .count('id as thisMonthBookings');
        const [{ lastMonthBookings }] = await db('consultations')
            .whereNull('deleted_at')
            .whereBetween('created_at', [firstDayLastMonth, lastDayLastMonth])
            .count('id as lastMonthBookings');

        // 📞 Contacts
        const [{ totalContacts }] = await db('contacts')
            .whereNull('deleted_at')
            .count('id as totalContacts');
        const [{ thisMonthContacts }] = await db('contacts')
            .whereNull('deleted_at')
            .where('created_at', '>=', firstDayThisMonth)
            .count('id as thisMonthContacts');
        const [{ lastMonthContacts }] = await db('contacts')
            .whereNull('deleted_at')
            .whereBetween('created_at', [firstDayLastMonth, lastDayLastMonth])
            .count('id as lastMonthContacts');

        // 👤 Users
        const [{ totalUsers }] = await db('users')
            .whereNull('deleted_at')
            .count('id as totalUsers');
        const [{ thisMonthUsers }] = await db('users')
            .whereNull('deleted_at')
            .where('created_at', '>=', firstDayThisMonth)
            .count('id as thisMonthUsers');
        const [{ lastMonthUsers }] = await db('users')
            .whereNull('deleted_at')
            .whereBetween('created_at', [firstDayLastMonth, lastDayLastMonth])
            .count('id as lastMonthUsers');

        // Conversion Rate calculations
        const overallConversionRate = Number(totalUsers) > 0
            ? ((Number(totalBookings) / Number(totalUsers)) * 100).toFixed(2)
            : "0";

        const thisMonthConversionRate = Number(thisMonthUsers) > 0
            ? ((Number(thisMonthBookings) / Number(thisMonthUsers)) * 100).toFixed(2)
            : "0";

        const lastMonthConversionRate = Number(lastMonthUsers) > 0
            ? ((Number(lastMonthBookings) / Number(lastMonthUsers)) * 100).toFixed(2)
            : "0";

        const calculateGrowth = (current, last) => {
            current = Number(current);
            last = Number(last);
            if (last === 0) return "100.00";
            return (((current - last) / last) * 100).toFixed(2);
        };

        const conversionGrowth = calculateGrowth(thisMonthConversionRate, lastMonthConversionRate);

        // Get last 6 months
        const months = [...Array(6)].map((_, i) => {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            return {
                label: date.toLocaleString('default', { month: 'short' }),
                year: date.getFullYear(),
                month: date.getMonth() + 1 // JS months are 0-based
            };
        });

        // Helper for monthly counts
        const getMonthlyCounts = async (table) => {
            const results = await Promise.all(months.map(({ year, month }) => {
                const start = new Date(year, month - 1, 1);
                const end = new Date(year, month, 1);
                return db(table)
                    .whereNull('deleted_at')
                    .where('created_at', '>=', start)
                    .andWhere('created_at', '<', end)
                    .count('id as count')
                    .then(([{ count }]) => parseInt(count, 10));
            }));

            return months.map((m, i) => ({
                month: m.label,
                count: results[i]
            })).reverse(); // reverse to show oldest first
        };

        const getMonthlyConversionRates = async () => {
            const results = await Promise.all(months.map(async ({ year, month }) => {
                const start = new Date(year, month - 1, 1);
                const end = new Date(year, month, 1);

                const [{ bookings }] = await db('consultations')
                    .whereNull('deleted_at')
                    .whereBetween('created_at', [start, end])
                    .count('id as bookings');

                const [{ users }] = await db('users')
                    .whereNull('deleted_at')
                    .whereBetween('created_at', [start, end])
                    .count('id as users');

                const bookingsCount = parseInt(bookings, 10);
                const usersCount = parseInt(users, 10);

                const rate = usersCount > 0
                    ? ((bookingsCount / usersCount) * 100).toFixed(2) + '%'
                    : '0%';

                return { month: start.toLocaleString('default', { month: 'short' }), rate };
            }));

            return results.reverse();
        };

        // Add monthly trends
        const monthlyBookings = await getMonthlyCounts('consultations');
        const monthlyContacts = await getMonthlyCounts('contacts');
        const monthlyUsers = await getMonthlyCounts('users');
        const monthlyConversionRates = await getMonthlyConversionRates();

        res.json({
            totalBookings: {
                count: parseInt(totalBookings, 10),
                growth: calculateGrowth(thisMonthBookings, lastMonthBookings) + "%",
                thisMonthCount: parseInt(thisMonthBookings, 10),
                lastMonthCount: parseInt(lastMonthBookings, 10)
            },
            totalContacts: {
                count: parseInt(totalContacts, 10),
                growth: calculateGrowth(thisMonthContacts, lastMonthContacts) + "%",
                thisMonthCount: parseInt(thisMonthContacts, 10),
                lastMonthCount: parseInt(lastMonthContacts, 10)
            },
            totalUsers: {
                count: parseInt(totalUsers, 10),
                growth: calculateGrowth(thisMonthUsers, lastMonthUsers) + "%",
                thisMonthCount: parseInt(thisMonthUsers, 10),
                lastMonthCount: parseInt(lastMonthUsers, 10)
            },
            conversionRate: {
                rate: `${overallConversionRate}%`,
                growth: `${conversionGrowth}%`,
                thisMonthRate: `${thisMonthConversionRate}%`,
                lastMonthRate: `${lastMonthConversionRate}%`
            },
            trends: {
                bookings: monthlyBookings,
                contacts: monthlyContacts,
                users: monthlyUsers,
                conversionRates: monthlyConversionRates
            }
        });

    } catch (err) {
        logger.error('❌ Failed to get dashboard stats', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


