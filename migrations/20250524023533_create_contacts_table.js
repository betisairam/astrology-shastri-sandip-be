exports.up = function (knex) {
    return knex.schema.createTable('contacts', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();

        // Customer’s original message fields
        table.string('subject').nullable();
        table.text('message').nullable();

        // Super_admin reply stored as JSONB (subject + message)
        table.jsonb('reply_message').nullable();

        table.string('source').nullable();
        table.integer('assigned_to').nullable();
        table.specificType('tags', 'text[]').nullable();
        table.text('notes').nullable();
        table.enu('priority', ['low', 'medium', 'high']).defaultTo('medium');
        table.boolean('is_active').defaultTo(true);
        table.timestamp('deleted_at').nullable();

        // Add the 'created_by' column here directly
        table.integer('created_by').nullable();

        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('contacts');
};
