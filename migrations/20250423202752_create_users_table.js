exports.up = function (knex) {
    return knex.schema.hasTable('users').then(exists => {
        if (!exists) {
            return knex.schema.createTable('users', table => {
                table.increments('id');
                table.string('name').notNullable();
                table.string('email').notNullable().unique();
                table.string('password').notNullable();
                table.string('role').defaultTo('user');
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
