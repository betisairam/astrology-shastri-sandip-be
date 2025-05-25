exports.up = async function (knex) {
    // First, make sure the column exists
    const hasColumn = await knex.schema.hasColumn('service_prices', 'country_code');
    if (!hasColumn) {
        await knex.schema.alterTable('service_prices', (table) => {
            table.string('country_code').notNullable().defaultTo('IN'); // or null if you'd populate later
        });
    }

    // Ensure foreign key constraint
    await knex.schema.alterTable('service_prices', (table) => {
        table.foreign('country_code').references('countries.code').onDelete('CASCADE');
    });
};

exports.down = async function (knex) {
    await knex.schema.alterTable('service_prices', (table) => {
        table.dropForeign('country_code');
        table.dropColumn('country_code'); // optional, only if you want to reverse column addition
    });
};
