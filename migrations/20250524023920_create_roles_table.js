exports.up = async function (knex) {
    await knex.schema.createTable('roles', table => {
        table.increments('id').primary();
        table.string('name').notNullable().unique(); // e.g., super_admin, admin, customer
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
    });

    // Insert default roles
    await knex('roles').insert([
        { name: 'super_admin' },
        { name: 'admin' },
        { name: 'customer' },
    ]);
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('roles');
};
