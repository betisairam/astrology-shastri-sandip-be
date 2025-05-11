const knex = require('../db/knex');

exports.getAll = ({ lang, type }) => {
    const query = knex('translations').whereNull('deleted_at');
    if (lang) query.andWhere('lang', lang);
    if (type) query.andWhere('type', type);
    return query.select('*');
};

exports.bulkInsert = (data) => knex('translations').insert(data);

exports.softDelete = (id) => {
    return knex('translations')
        .where({ id })
        .update({ deleted_at: knex.fn.now() });
};
