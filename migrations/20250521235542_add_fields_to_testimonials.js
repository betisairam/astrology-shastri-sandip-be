exports.up = function (knex) {
    return knex.schema.table('testimonials', (table) => {
        table.jsonb('location').nullable();
        table.integer('rating').nullable();
        table.string('category').nullable();
        table.boolean('featured').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table('testimonials', (table) => {
        table.dropColumn('location');
        table.dropColumn('rating');
        table.dropColumn('category');
        table.dropColumn('featured');
    });
};
