const db = require('../db/knex');

exports.getAll = () => db('equity_shares').select('*');

exports.getById = id => db('equity_shares').where({ id }).first();

exports.create = data => db('equity_shares').insert(data).returning('*').then(rows => rows[0]);

exports.update = (id, data) => db('equity_shares').where({ id }).update(data).returning('*').then(rows => rows[0]);

exports.remove = id => db('equity_shares').where({ id }).del();
