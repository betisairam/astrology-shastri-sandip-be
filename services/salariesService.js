const db = require('../db/knex');

exports.getAll = () => db('salaries').select('*');

exports.getById = id => db('salaries').where({ id }).first();

exports.create = data => db('salaries').insert(data).returning('*').then(r => r[0]);

exports.update = (id, data) => db('salaries').where({ id }).update(data).returning('*').then(r => r[0]);

exports.remove = id => db('salaries').where({ id }).del();
