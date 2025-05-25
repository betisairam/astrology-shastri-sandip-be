exports.up = function (knex) {
    return knex.schema.alterTable('feedback', table => {
        table.integer('reviewed_by').unsigned().nullable()
            .references('id').inTable('users')
            .onDelete('SET NULL');

        table.timestamp('reviewed_at').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('feedback', table => {
        table.dropColumn('reviewed_by');
    });
};
