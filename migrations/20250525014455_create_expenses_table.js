exports.up = function (knex) {
    return knex.schema.createTable('expenses', (table) => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.decimal('amount', 12, 2).notNullable();        // Expense amount in original currency
        table.integer('country_id').unsigned().notNullable()
            .references('id').inTable('countries')
            .onDelete('RESTRICT')
            .index();
        table.date('date_incurred').notNullable();
        table.timestamps(true, true);                         // created_at, updated_at
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('expenses');
};
