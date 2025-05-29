exports.up = function (knex) {
    return knex.schema.createTable("lead_messages", (table) => {
        table.increments("id").primary();
        table.integer("lead_id").unsigned().references("customer_leads.id").onDelete("CASCADE");
        table.string("sender_type"); // "customer" or "admin"
        table.text("message_enc");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("lead_messages");
};
