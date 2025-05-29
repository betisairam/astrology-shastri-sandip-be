const db = require('../db/knex');

exports.getAll = async () => {
    return db('countries')
        .whereNull('deleted_at')
        .andWhere('is_active', true);
};

exports.getById = async (id) => {
    return db('countries')
        .where({ id })
        .whereNull('deleted_at')
        .first();
};

exports.create = async (data) => {
    if (data.is_default) {
        await unsetDefault();
    }
    return db('countries').insert(data).returning('*');
};

exports.update = async (id, data) => {
    if (data.is_default) {
        await unsetDefault();
    }
    return db('countries').where({ id }).update(data).returning('*');
};

exports.softDelete = async (id) => {
    return db('countries')
        .where({ id })
        .update({ deleted_at: new Date(), is_active: false });
};

exports.restore = async (id) => {
    return db('countries')
        .where({ id })
        .update({ deleted_at: null, is_active: true });
};

const unsetDefault = async () => {
    await db('countries').update({ is_default: false });
};
