exports.up = function (knex) {
    return knex.schema.createTable('service_prices', (table) => {
        table.increments('id').primary();
        table.integer('service_id').unsigned().notNullable()
            .references('id').inTable('services')
            .onDelete('CASCADE');

        table.string('country_code', 2).notNullable(); // e.g., 'IN', 'US', 'UK'
        table.decimal('price', 10, 2).notNullable();
        table.decimal('actual_price', 10, 2);
        table.string('currency', 3).notNullable(); // e.g., 'INR', 'USD'
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);

        table.unique(['service_id', 'country_code']); // Unique per service-country
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('service_prices');
};
