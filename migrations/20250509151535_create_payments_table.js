exports.up = function (knex) {
    return knex.schema.createTable('payments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable(); // assuming JWT auth
        table.string('razorpay_order_id').notNullable();
        table.string('razorpay_payment_id');
        table.string('razorpay_signature');
        table.integer('amount').notNullable(); // in paise
        table.enu('status', ['created', 'paid', 'failed']).defaultTo('created');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('payments');
};
