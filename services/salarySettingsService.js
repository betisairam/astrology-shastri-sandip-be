const db = require('../db/knex');

exports.getAll = () => db('salary_settings');
exports.create = (data) => db('salary_settings').insert(data).returning('*');
exports.update = (id, data) => db('salary_settings').where({ id }).update(data).returning('*');
exports.remove = (id) => db('salary_settings').where({ id }).del();
