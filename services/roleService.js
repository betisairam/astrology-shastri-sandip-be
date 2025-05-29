const db = require('../db/knex');

exports.getAll = () => {
    return db('roles')
        .where({ is_active: true })
        .whereNull('deleted_at');
};
exports.getById = (id) => db('roles').where({ id }).first();
exports.create = (data) => db('roles').insert(data).returning('*');
exports.update = (id, data) => db('roles').where({ id }).update(data).returning('*');
exports.remove = async (id) => {
    const role = await db('roles').where({ id }).first();

    if (!role) return null;
    if (role.name === 'super_admin') {
        throw new Error('Cannot delete super_admin role');
    }

    return db('roles')
        .where({ id })
        .update({
            is_active: false,
            deleted_at: new Date()
        });
};

exports.restore = async (id) => {
    return db('roles')
        .where({ id })
        .update({
            is_active: true,
            deleted_at: null
        });
};
