// migrations/xxxx_create_astrologer_profiles.js

exports.up = function (knex) {
    return knex.schema.createTable('astrologer_profiles', table => {
        table.increments('id').primary();
        table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .unique();

        table.integer('experience_years').defaultTo(0);
        table.specificType('expertise', 'text[]'); // PostgreSQL array
        table.specificType('languages', 'text[]'); // PostgreSQL array
        table.float('rating').defaultTo(0);
        table.text('bio').nullable();

        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('astrologer_profiles');
};
