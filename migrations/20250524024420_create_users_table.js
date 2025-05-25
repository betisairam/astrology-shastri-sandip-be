exports.up = function (knex) {
    return knex.schema.hasTable('users').then(exists => {
        if (!exists) {
            return knex.schema.createTable('users', table => {
                table.increments('id');
                table.string('name').notNullable();
                table.string('email').notNullable().unique();
                table.string('password').notNullable();

                table
                    .integer('role_id')
                    .unsigned()
                    .references('id')
                    .inTable('roles')
                    .onDelete('SET NULL');

                table.boolean('is_active').defaultTo(true); // active by default

                table.timestamp('deleted_at').nullable(); // soft delete timestamp

                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
