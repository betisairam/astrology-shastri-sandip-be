const db = require('../db/knex');

exports.getPaginated = async (countryCode = 'IN', page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const country = await db('countries')
        .select('id')
        .where({ code: countryCode })
        .first();

    if (!country) {
        throw new Error(`Country ${countryCode} not found`);
    }

    const query = db('services')
        .select(
            'services.*',
            'sp.price',
            'sp.actual_price',
            'sp.country_id'
        )
        .leftJoin('service_prices as sp', function () {
            this.on('services.id', '=', 'sp.service_id')
                .andOn('sp.country_id', '=', db.raw('?', [country.id]));
        })
        .whereNull('services.deleted_at')
        .orderBy('services.id', 'desc')
        .limit(limit)
        .offset(offset);

    const [services, [{ count }]] = await Promise.all([
        query,
        db('services')
            .count('id')
            .whereNull('deleted_at')
    ]);

    return {
        services,
        pagination: {
            page,
            limit,
            total: Number(count)
        }
    };
};

exports.getAllGlobal = async () => {
    const services = await db('services as s')
        .select([
            's.*',
            db.raw(`json_agg(
                json_build_object(
                    'id', sp.id,
                    'country_id', sp.country_id,
                    'price', sp.price,
                    'actual_price', sp.actual_price,
                    'currency_symbol', c.currency_symbol,
                    'country_code', c.code,
                    'country_name', c.name
                )
            ) as prices`)
        ])
        .leftJoin('service_prices as sp', 's.id', 'sp.service_id')
        .leftJoin('countries as c', 'sp.country_id', 'c.id')
        .whereNull('s.deleted_at')
        .groupBy('s.id')
        .orderBy('s.id', 'desc');

    return services;
};

exports.getById = async (id) => {
    const service = await db('services as s')
        .select([
            's.*',
            db.raw(`json_agg(
                json_build_object(
                    'id', sp.id,
                    'country_id', sp.country_id,
                    'price', sp.price,
                    'actual_price', sp.actual_price,
                    'currency_symbol', c.currency_symbol,
                    'country_code', c.code,
                    'country_name', c.name
                )
            ) as prices`)
        ])
        .leftJoin('service_prices as sp', 's.id', 'sp.service_id')
        .leftJoin('countries as c', 'sp.country_id', 'c.id')
        .where('s.id', id)
        .whereNull('s.deleted_at')
        .groupBy('s.id')
        .first();

    return service;
};

exports.create = async (data) => {
    const { prices, ...serviceData } = data;

    const [service] = await db('services').insert(serviceData).returning('*');

    if (Array.isArray(prices)) {
        const enrichedPrices = prices.map((p) => ({
            ...p,
            service_id: service.id,
        }));

        await db('service_prices').insert(enrichedPrices);
    }

    return service.id;
};

exports.update = async (id, data) => {
    const { prices, ...baseUpdate } = data;

    await db('services')
        .where({ id })
        .update({
            ...baseUpdate,
            updated_at: new Date()
        });

    if (Array.isArray(prices)) {
        // Delete existing prices for this service
        await db('service_prices').where({ service_id: id }).del();

        const enrichedPrices = prices.map((p) => ({
            ...p,
            service_id: id,
        }));

        await db('service_prices').insert(enrichedPrices);
    }

    return true;
};

exports.softDelete = async (id) => {
    return db('services')
        .where({ id })
        .update({
            deleted_at: new Date()
        });
};

exports.restore = async (id) => {
    return db('services')
        .where({ id })
        .update({
            deleted_at: null,
            updated_at: new Date()
        });
};
