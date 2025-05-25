exports.up = function (knex) {
    return knex.schema.hasTable('services').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('services', (table) => {
                table.increments('id');
                table.string('key').unique().notNullable();
                table.string('title').notNullable();
                table.text('content');
                table.string('price');
                table.string('actual_price');
                table.string('cta');
                table.decimal('delivery_days');
                table.string('delivery_time');
                table.string('format');
                table.string('best_for');
                table.string('type');
                table.specificType('features', 'text[]');

                // New fields
                table.boolean('is_active').defaultTo(true);
                table.boolean('recommended').defaultTo(false);
                table.timestamp('deleted_at').nullable();

                table.timestamps(true, true); // created_at and updated_at
            });
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('services');
};
