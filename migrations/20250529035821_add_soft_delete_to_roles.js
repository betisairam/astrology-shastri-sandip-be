exports.up = function (knex) {
    return knex.schema.alterTable('roles', (table) => {
        table.timestamp('deleted_at').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('roles', (table) => {
        table.dropColumn('deleted_at');
    });
};
