require('dotenv').config();  // load .env file if you use one
const bcrypt = require('bcrypt');
const db = require('./knex');

const seedSuperAdmin = async () => {
    const email = process.env.SUPER_ADMIN_EMAIL;
    const plainPassword = process.env.SUPER_ADMIN_PASSWORD;
    const roleName = 'super_admin';

    if (!email || !plainPassword) {
        throw new Error('SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD environment variables must be set.');
    }

    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
        console.log('✅ Super admin already exists.');
        return;
    }

    const role = await db('roles').where({ name: roleName, is_active: true }).first();
    if (!role) {
        throw new Error(`Role "${roleName}" not found or not active.`);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await db('users').insert({
        name: 'Sandip Sevak',
        email,
        password: hashedPassword,
        role_id: role.id,
    });

    console.log('✅ Super admin seeded successfully!');
};

module.exports = seedSuperAdmin;
