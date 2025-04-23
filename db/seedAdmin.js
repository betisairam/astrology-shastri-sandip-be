const bcrypt = require('bcrypt');
const db = require('./knex');

const seedAdmin = async () => {
    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;
    const role = 'admin';

    const existingAdmin = await db('users').where({ email }).first();
    if (existingAdmin) {
        console.log('✅ Admin already exists.');
        return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await db('users').insert({
        name: 'Sandip Sevak',
        email,
        password: hashedPassword,
        role,
    });

    console.log('✅ Default admin seeded successfully!');
};

module.exports = seedAdmin;
