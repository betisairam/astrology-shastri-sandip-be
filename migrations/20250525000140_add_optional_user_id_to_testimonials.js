exports.up = function (knex) {
    return knex.schema.alterTable('testimonials', table => {
        table
            .integer('user_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('users')
            .onDelete('SET NULL'); // so testimonial isn't lost if user is deleted
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('testimonials', table => {
        table.dropColumn('user_id');
    });
};
