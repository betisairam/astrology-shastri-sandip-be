exports.up = function (knex) {
    return knex.schema.createTable("customer_leads", (table) => {
        table.increments("id").primary();
        table.string("phone_number").notNullable();   // Not encrypted for indexing/search
        table.text("name_enc");       // Encrypted (Base64)
        table.text("dob_enc");
        table.text("birth_place_enc");
        table.text("birth_time_enc");
        table.enum("state", [
            "awaiting_name",
            "awaiting_dob",
            "awaiting_birth_place",
            "awaiting_birth_time",
            "showing_services",
            "awaiting_payment",
            "completed"
        ]).defaultTo("awaiting_name");
        table.text("screenshot_url");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("customer_leads");
};
