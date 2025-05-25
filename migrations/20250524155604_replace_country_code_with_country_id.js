exports.up = async function (knex) {
    // 1. Add the new column
    await knex.schema.alterTable('service_prices', (table) => {
        table.integer('country_id').unsigned().references('id').inTable('countries');
    });

    // 2. Populate country_id using the existing country_code
    await knex.raw(`
      UPDATE service_prices sp
      SET country_id = c.id
      FROM countries c
      WHERE sp.country_code = c.code
    `);

    // 3. Set NOT NULL constraint after data is safely migrated
    await knex.schema.alterTable('service_prices', (table) => {
        table.dropColumn('country_code');
        table.integer('country_id').unsigned().notNullable().alter(); // enforce NOT NULL
    });
};

exports.down = async function (knex) {
    // Rollback: Add country_code back
    await knex.schema.alterTable('service_prices', (table) => {
        table.string('country_code', 3);
    });

    // Repopulate country_code
    await knex.raw(`
      UPDATE service_prices sp
      SET country_code = c.code
      FROM countries c
      WHERE sp.country_id = c.id
    `);

    await knex.schema.alterTable('service_prices', (table) => {
        table.dropColumn('country_id');
    });
};
