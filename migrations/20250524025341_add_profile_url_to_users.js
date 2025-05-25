exports.up = function (knex) {
    return knex.schema.alterTable('users', table => {
        table.string('profile_url').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('profile_url');
    });
};
