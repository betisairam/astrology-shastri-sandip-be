exports.up = function (knex) {
    return knex.schema.alterTable('countries', (table) => {
        table.boolean('is_active').defaultTo(true);
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('countries', (table) => {
        table.dropColumn('is_active');
        table.dropColumn('deleted_at');
    });
};
