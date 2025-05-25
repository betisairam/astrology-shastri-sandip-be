// 📄 Knex Migration: create_profit_shares_table
exports.up = function (knex) {
    return knex.schema.createTable('profit_shares', (table) => {
        table.increments('id').primary();
        table.integer('shareholder_id').unsigned().notNullable().references('id').inTable('shareholders').onDelete('CASCADE');
        table.date('month').notNullable();
        table.decimal('amount', 12, 2).notNullable();
        table.boolean('is_paid').defaultTo(false);
        table.date('payment_date');
        table.string('payment_method');
        table.integer('paid_by').unsigned().references('id').inTable('users');
        table.text('notes');
        table.string('invoice_url');
        table.timestamps(true, true);

        table.unique(['shareholder_id', 'month']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('profit_shares');
};