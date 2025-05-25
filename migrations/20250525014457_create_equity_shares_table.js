// 📄 Knex Migration: create_equity_shares_table
exports.up = function (knex) {
    return knex.schema.createTable('equity_shares', (table) => {
        table.increments('id').primary();
        table.integer('shareholder_id').unsigned().notNullable().references('id').inTable('shareholders').onDelete('CASCADE');
        table.decimal('percentage', 5, 2).notNullable();
        table.integer('granted_by').unsigned().references('id').inTable('users');
        table.date('effective_from');
        table.integer('vesting_period'); // in months
        table.boolean('is_revoked').defaultTo(false);
        table.text('notes');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('equity_shares');
};
