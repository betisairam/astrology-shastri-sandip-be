exports.up = function (knex) {
    return knex.schema.createTable('expense_inr_summary', (table) => {
        table.increments('id').primary();
        table
            .integer('expense_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('expenses')
            .onDelete('CASCADE')
            .index();
        table.decimal('conversion_rate', 10, 4).notNullable();
        table.decimal('amount_in_inr', 12, 2).notNullable();
        table.date('converted_on').defaultTo(knex.fn.now());
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('expense_inr_summary');
};
