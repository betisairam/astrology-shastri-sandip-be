exports.up = function (knex) {
    return knex.schema.alterTable('service_prices', (table) => {
        table.dropColumn('currency');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('service_prices', (table) => {
        table.string('currency', 3).notNullable().defaultTo('USD'); // or your default currency
    });
};
