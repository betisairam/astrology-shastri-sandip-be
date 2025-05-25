// 📄 Knex Migration: create_shareholders_table
exports.up = function (knex) {
    return knex.schema.createTable('shareholders', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('role').defaultTo('partner');
        table.boolean('is_active').defaultTo(true);
        table.boolean('is_founder').defaultTo(false);
        table.date('joined_on');
        table.integer('invited_by').unsigned().references('id').inTable('users');
        table.text('notes');
        table.string('profile_url');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('shareholders');
};
