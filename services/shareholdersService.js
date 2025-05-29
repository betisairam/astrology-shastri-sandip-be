const db = require('../db/knex');

exports.getAll = () => db('shareholders').select('*');

exports.getById = id => db('shareholders').where({ id }).first();

exports.create = data => db('shareholders').insert(data).returning('*').then(rows => rows[0]);

exports.update = (id, data) => db('shareholders').where({ id }).update(data).returning('*').then(rows => rows[0]);

exports.remove = id => db('shareholders').where({ id }).del();
