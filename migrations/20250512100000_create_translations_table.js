exports.up = function (knex) {
    return knex.schema.createTable('translations', function (table) {
        table.increments('id').primary();
        table.string('type').notNullable(); // 'services' or 'serviceComparison'
        table.string('key').notNullable();
        table.string('lang', 5).notNullable(); // 'en' or 'hi'
        table.jsonb('value').notNullable();
        table.timestamp('deleted_at').nullable();
        table.timestamps(true, true);
    });
};

exports.down = knex => knex.schema.dropTable('translations');
