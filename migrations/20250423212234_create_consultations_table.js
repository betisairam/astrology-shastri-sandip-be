exports.up = function (knex) {
    return knex.schema.hasTable('consultations').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('consultations', table => {
                table.increments('id');
                table.string('fullName').notNullable();
                table.string('email').notNullable();
                table.string('mobileNumber').notNullable();
                table.date('dateOfBirth');
                table.time('timeOfBirth');
                table.string('placeOfBirth');
                table.enu('status', ['pending', 'reviewed', 'closed']).defaultTo('pending');
                table.integer('created_by');
                table.integer('updated_by');
                table.timestamp('deleted_at').nullable();
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('consultations');
};
