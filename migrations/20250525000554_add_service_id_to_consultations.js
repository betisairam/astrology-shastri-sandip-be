exports.up = function (knex) {
    return knex.schema.alterTable('consultations', table => {
        table
            .integer('service_id')
            .unsigned()
            .references('id')
            .inTable('services') // assumes you have a 'services' table
            .onDelete('SET NULL');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('consultations', table => {
        table.dropColumn('service_id');
    });
};
