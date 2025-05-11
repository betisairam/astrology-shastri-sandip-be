exports.up = function (knex) {
    return knex.schema.createTable('webhook_logs', (table) => {
        table.increments('id').primary();
        table.string('event_type').notNullable();
        table.text('razorpay_order_id').nullable();
        table.text('razorpay_payment_id').nullable();
        table.jsonb('payload').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('webhook_logs');
};
