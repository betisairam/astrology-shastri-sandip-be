exports.up = async function (knex) {
    // Step 1: Drop the old columns
    await knex.schema.alterTable('services', (table) => {
        table.dropColumn('title');
        table.dropColumn('content');
        table.dropColumn('cta');
        table.dropColumn('features');
    });

    // Step 2: Add new jsonb columns
    await knex.schema.alterTable('services', (table) => {
        table.jsonb('title').notNullable();
        table.jsonb('content').notNullable();
        table.jsonb('cta').notNullable();
        table.jsonb('features').notNullable();
    });
};

exports.down = async function (knex) {
    // Step 1: Drop the jsonb columns
    await knex.schema.alterTable('services', (table) => {
        table.dropColumn('title');
        table.dropColumn('content');
        table.dropColumn('cta');
        table.dropColumn('features');
    });

    // Step 2: Re-add the original columns
    await knex.schema.alterTable('services', (table) => {
        table.string('title').notNullable();
        table.text('content');
        table.string('cta');
        table.specificType('features', 'text[]');
    });
};
