exports.up = function (knex) {
    return knex.schema.alterTable('contacts', (table) => {
        table.integer('created_by').unsigned().nullable().alter();
        table.integer('assigned_to').unsigned().nullable().alter();

        table.foreign('created_by').references('id').inTable('users').onDelete('SET NULL');
        table.foreign('assigned_to').references('id').inTable('users').onDelete('SET NULL');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('contacts', (table) => {
        table.dropForeign('created_by');
        table.dropForeign('assigned_to');
    });
};
