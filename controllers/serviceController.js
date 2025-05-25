const db = require('../db/knex');

exports.getServicesWithPrices = async (req, res) => {
    try {
        // Parse pagination params, default page=1, pageSize=10
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;

        const offset = (page - 1) * pageSize;
        console.log('offset', offset)
        // 1. Get paginated services
        const services = await db('services')
            .select(
                'id',
                'key',
                'title',
                'content',
                'cta',
                'features',
                'delivery_days',
                'delivery_time',
                'format',
                'best_for',
                'type',
                'is_active',
                'recommended',
                'created_at',
                'updated_at'
            )
            .limit(pageSize)
            .offset(offset)
            .orderBy('id', 'asc');

        const serviceIds = services.map((s) => s.id);

        // 2. Get all active prices for these services with countries
        const prices = await db('service_prices')
            .join('countries', 'service_prices.country_id', 'countries.id')
            .select(
                'service_prices.service_id',
                'service_prices.price',
                'service_prices.actual_price',
                'service_prices.is_active',
                'countries.id as country_id',
                'countries.code as country_code',
                'countries.name as country_name',
                'countries.currency_symbol'
            )
            .whereIn('service_prices.service_id', serviceIds)
            .andWhere('service_prices.is_active', true);

        // 3. Group prices by service_id
        const pricesByService = prices.reduce((acc, price) => {
            if (!acc[price.service_id]) acc[price.service_id] = [];
            acc[price.service_id].push(price);
            return acc;
        }, {});

        // 4. Attach prices array to each service
        const servicesWithPrices = services.map((service) => ({
            ...service,
            prices: pricesByService[service.id] || [],
        }));

        // 5. Get total count for pagination
        const [{ count }] = await db('services').count('id as count');

        res.json({
            data: servicesWithPrices,
            pagination: {
                total: parseInt(count, 10),
                page,
                pageSize,
                totalPages: Math.ceil(count / pageSize),
            },
        });
    } catch (error) {
        console.error('Error fetching services with prices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const country = req.query.country || 'IN'; // default to India

    // Total count
    const [{ count }] = await db('services')
        .whereNull('deleted_at')
        .andWhere('is_active', true)
        .count('id');

    const total = parseInt(count);

    // Get paginated services + country-wise price
    const data = await db('services as s')
        .leftJoin('service_prices as sp', function () {
            this.on('s.id', '=', 'sp.service_id').andOn('sp.country_code', '=', db.raw('?', [country]));
        })
        .select(
            's.*',
            'sp.price',
            'sp.actual_price',
            'sp.currency',
            'sp.is_active as price_active'
        )
        .whereNull('s.deleted_at')
        .andWhere('s.is_active', true)
        .orderBy('s.created_at', 'desc')
        .limit(limit)
        .offset(offset);

    res.json({
        data,
        meta: {
            total,
            page,
            pageSize: limit,
            totalPages: Math.ceil(total / limit)
        }
    });
};

exports.getById = async (req, res) => {
    const service = await db('services').where({ id: req.params.id }).first();
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json(service);
};

exports.create = async (req, res) => {
    const [id] = await db('services').insert({ ...req.body, created_at: new Date(), updated_at: new Date() });
    res.status(201).json({ id });
};

exports.update = async (req, res) => {
    const updated = await db('services').where({ id: req.params.id }).update({ ...req.body, updated_at: new Date() });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
};

exports.remove = async (req, res) => {
    const updated = await db('services')
        .where({ id: req.params.id })
        .update({ deleted_at: new Date() });

    if (!updated) return res.status(404).json({ error: 'Not found' });

    res.json({ message: 'Soft deleted successfully' });
};

exports.restore = async (req, res) => {
    const updated = await db('services')
        .where({ id: req.params.id })
        .update({ deleted_at: null });

    if (!updated) return res.status(404).json({ error: 'Not found' });

    res.json({ message: 'Restored successfully' });
};
