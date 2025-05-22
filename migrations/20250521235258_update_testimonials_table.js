exports.up = function (knex) {
    return knex.schema.hasTable('testimonials').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('testimonials', table => {
                table.increments('id');
                table.jsonb('name').notNullable(); // { en: "John", hi: "जॉन" }
                table.jsonb('message').notNullable(); // { en: "...", hi: "..." }
                table.jsonb('designation').nullable(); // { en: "CEO", hi: "..." }
                table.jsonb('location').nullable(); // add location as multilingual JSONB
                table.integer('rating').nullable();
                table.string('category').nullable();
                table.boolean('featured').defaultTo(false);
                table.string('image').nullable(); // image URL or filename
                table.boolean('is_active').defaultTo(true);
                table.timestamp('deleted_at').nullable(); // soft delete
                table.timestamps(true, true);
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.hasTable('testimonials').then((exists) => {
        if (exists) {
            return knex.schema.dropTable('testimonials');
        }
    });
};
