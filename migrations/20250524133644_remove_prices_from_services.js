exports.up = function (knex) {
    return knex.schema.table('services', (table) => {
        table.dropColumn('price');
        table.dropColumn('actual_price');
    });
};

exports.down = function (knex) {
    return knex.schema.table('services', (table) => {
        table.string('price');
        table.string('actual_price');
    });
};
