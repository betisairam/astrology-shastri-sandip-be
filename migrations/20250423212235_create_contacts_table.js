exports.up = function (knex) {
    return knex.schema.createTable('contacts', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('mobileNumber').notNullable();
        table.text('description').notNullable();
        table.enu('status', ['pending', 'responded', 'closed']).defaultTo('pending');
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamp('deleted_at').nullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('contacts');
};
