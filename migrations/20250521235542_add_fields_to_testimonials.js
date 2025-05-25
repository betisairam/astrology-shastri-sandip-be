exports.up = async function (knex) {
    const hasLocation = await knex.schema.hasColumn('testimonials', 'location');
    const hasRating = await knex.schema.hasColumn('testimonials', 'rating');
    const hasCategory = await knex.schema.hasColumn('testimonials', 'category');
    const hasFeatured = await knex.schema.hasColumn('testimonials', 'featured');

    return knex.schema.table('testimonials', (table) => {
        if (!hasLocation) table.jsonb('location').nullable();
        if (!hasRating) table.integer('rating').nullable();
        if (!hasCategory) table.string('category').nullable();
        if (!hasFeatured) table.boolean('featured').defaultTo(false);
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
