exports.up = function (knex) {
    return knex.schema.createTable('feedback', table => {
        table.increments('id').primary();

        table.integer('user_id').unsigned().nullable()
            .references('id').inTable('users').onDelete('SET NULL');

        table.integer('consultation_id').unsigned().nullable()
            .references('id').inTable('consultations').onDelete('SET NULL');

        table.integer('service_id').unsigned().nullable()
            .references('id').inTable('services').onDelete('SET NULL');

        table.integer('rating').notNullable().unsigned().checkBetween([1, 5]); // rating from 1 to 5

        table.text('comments').nullable();

        table.boolean('is_active').defaultTo(true);

        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('feedback');
};
