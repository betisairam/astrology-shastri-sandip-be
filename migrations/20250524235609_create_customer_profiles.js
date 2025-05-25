// migrations/xxxx_create_customer_profiles.js

exports.up = function (knex) {
    return knex.schema.createTable('customer_profiles', table => {
        table.increments('id').primary();
        table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .unique();

        table.date('date_of_birth').nullable();
        table.string('gender', 10).nullable();
        table.string('location').nullable();
        table.jsonb('preferences').nullable(); // flexible for interests, language, etc.

        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('customer_profiles');
};
