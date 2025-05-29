exports.up = function (knex) {
    return knex.schema.createTable('blogs', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('slug').notNullable().unique();
        table.string('summary');
        table.text('content');
        table.string('featured_image');
        table.jsonb('tags').defaultTo('[]');
        table.enu('status', ['draft', 'published', 'scheduled']).defaultTo('draft');
        table.timestamp('published_at').nullable();
        table.integer('created_by').unsigned().references('id').inTable('users');
        table.timestamp('deleted_at').nullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('blogs');
};
