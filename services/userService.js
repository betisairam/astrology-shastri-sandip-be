const db = require('../db/knex');
const bcrypt = require('bcrypt');

exports.getAll = () => db('users').select('id', 'name', 'email', 'role', 'created_at');

exports.create = async ({ name, email, password, role }) => {
    const hashed = await bcrypt.hash(password, 10);
    return db('users').insert({ name, email, password: hashed, role }).returning(['id', 'name', 'email', 'role']);
};
