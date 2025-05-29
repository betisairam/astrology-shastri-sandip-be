exports.up = function (knex) {
    return knex.schema.alterTable('blogs', (table) => {
        table.string('seo_title').nullable();
        table.text('seo_description').nullable();
        table.string('featured_image_alt').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('blogs', (table) => {
        table.dropColumn('seo_title');
        table.dropColumn('seo_description');
        table.dropColumn('featured_image_alt');
    });
};
