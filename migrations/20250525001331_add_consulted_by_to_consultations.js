exports.up = function (knex) {
    return knex.schema.alterTable('consultations', table => {
        table.integer('consulted_by').unsigned().nullable()
            .references('id').inTable('users').onDelete('SET NULL');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('consultations', table => {
        table.dropColumn('consulted_by');
    });
};
