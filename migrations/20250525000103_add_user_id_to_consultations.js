exports.up = function (knex) {
    return knex.schema.alterTable('consultations', table => {
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE'); // or 'SET NULL' depending on behavior
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('consultations', table => {
        table.dropColumn('user_id');
    });
};
