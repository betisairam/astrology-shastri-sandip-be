const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
    const roleId = await getCustomerRoleId(knex);
    const password = await bcrypt.hash('Contact@123', 10); // default password for all

    const contacts = [];

    for (let i = 0; i < 5; i++) {
        const name = faker.person.fullName();
        const email = faker.internet.email({ firstName: name.split(' ')[0] });

        // Create user
        const [{ id: userId }] = await knex('users')
            .insert({
                name,
                email,
                password,
                role_id: roleId,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            })
            .returning('id');

        // Create contact
        contacts.push({
            name,
            email,
            mobileNumber: faker.phone.number('+91##########'),
            message: faker.lorem.sentences(2),
            subject: faker.lorem.words(5),
            created_by: userId,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    await knex('contacts').insert(contacts);
};

async function getCustomerRoleId(knex) {
    const role = await knex('roles').select('id').where({ name: 'customer' }).first();
    if (!role) throw new Error("❌ 'customer' role not found. Please seed the roles table first.");
    return role.id;
}
