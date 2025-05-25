exports.up = function (knex) {
    return knex.schema.createTable('countries', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('code', 3).notNullable().unique(); // e.g. 'IN', 'US'
        table.string('currency_symbol', 5);
        table.boolean('is_default').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('countries');
};
