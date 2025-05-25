exports.up = function (knex) {
    return knex.schema.alterTable('contacts', (table) => {
        table.string('mobileNumber').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('contacts', (table) => {
        table.dropColumn('mobileNumber');
    });
};
