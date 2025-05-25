/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    // 1. Remove fields from consultations table
    const colsToRemove = ['dateOfBirth', 'timeOfBirth', 'mobileNumber', 'placeOfBirth'];
    for (const col of colsToRemove) {
        if (await knex.schema.hasColumn('consultations', col)) {
            await knex.schema.table('consultations', (table) => {
                table.dropColumn(col);
            });
        }
    }

    // 2. Create customer_profiles table (moved fields here)
    const hasCustomerProfiles = await knex.schema.hasTable('customer_profiles');
    if (!hasCustomerProfiles) {
        await knex.schema.createTable('customer_profiles', (table) => {
            table.increments('id').primary();
            table.integer('user_id').unique().notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.date('date_of_birth');
            table.time('time_of_birth');
            table.string('mobile_number', 255);
            table.string('place_of_birth', 255);
            table.string('gender', 10);
            table.string('location', 255);
            table.jsonb('preferences');
            table.timestamps(true, true);
        });
    }

    // 3. Create audit_logs table
    if (!(await knex.schema.hasTable('audit_logs'))) {
        await knex.schema.createTable('audit_logs', (table) => {
            table.increments('id').primary();
            table.string('table_name').notNullable();
            table.integer('record_id').notNullable();
            table.string('action').notNullable(); // e.g. insert, update, delete
            table.jsonb('old_data');
            table.jsonb('new_data');
            table.integer('user_id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    }

    // 4. consultation_sessions
    if (!(await knex.schema.hasTable('consultation_sessions'))) {
        await knex.schema.createTable('consultation_sessions', (table) => {
            table.increments('id').primary();
            table.integer('consultation_id').notNullable().references('id').inTable('consultations').onDelete('CASCADE');
            table.timestamp('start_time').notNullable();
            table.timestamp('end_time');
            table.string('session_url', 500);
            table.text('notes');
            table.timestamps(true, true);
        });
    }

    // 5. astrologer_certifications
    if (!(await knex.schema.hasTable('astrologer_certifications'))) {
        await knex.schema.createTable('astrologer_certifications', (table) => {
            table.increments('id').primary();
            table.integer('astrologer_id').notNullable().references('id').inTable('astrologer_profiles').onDelete('CASCADE');
            table.string('certificate_name').notNullable();
            table.date('issued_date');
            table.date('expiry_date');
            table.string('issuing_organization');
            table.text('certificate_url');
            table.timestamps(true, true);
        });
    }

    // 6. user_notifications
    if (!(await knex.schema.hasTable('user_notifications'))) {
        await knex.schema.createTable('user_notifications', (table) => {
            table.increments('id').primary();
            table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.text('message').notNullable();
            table.boolean('is_read').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('read_at');
        });
    }

    // 7. consultation_payments
    if (!(await knex.schema.hasTable('consultation_payments'))) {
        await knex.schema.createTable('consultation_payments', (table) => {
            table.increments('id').primary();
            table.integer('consultation_id').notNullable().references('id').inTable('consultations').onDelete('CASCADE');
            table.decimal('amount', 10, 2).notNullable();
            table.string('payment_method').notNullable();
            table.string('payment_status').notNullable();
            table.timestamp('payment_date').defaultTo(knex.fn.now());
            table.string('transaction_id').unique();
            table.timestamps(true, true);
        });
    }

    // 8. astrologer_availability
    if (!(await knex.schema.hasTable('astrologer_availability'))) {
        await knex.schema.createTable('astrologer_availability', (table) => {
            table.increments('id').primary();
            table.integer('astrologer_id').notNullable().references('id').inTable('astrologer_profiles').onDelete('CASCADE');
            table.date('available_date').notNullable();
            table.time('start_time').notNullable();
            table.time('end_time').notNullable();
            table.boolean('is_available').defaultTo(true);
            table.timestamps(true, true);
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    // Drop new tables
    await knex.schema.dropTableIfExists('astrologer_availability');
    await knex.schema.dropTableIfExists('consultation_payments');
    await knex.schema.dropTableIfExists('user_notifications');
    await knex.schema.dropTableIfExists('astrologer_certifications');
    await knex.schema.dropTableIfExists('consultation_sessions');
    await knex.schema.dropTableIfExists('audit_logs');
    await knex.schema.dropTableIfExists('customer_profiles');

    // Add removed columns back to consultations table
    const colsToAdd = [
        { name: 'dateOfBirth', type: 'date' },
        { name: 'timeOfBirth', type: 'time' },
        { name: 'mobileNumber', type: 'string', length: 255 },
        { name: 'placeOfBirth', type: 'string', length: 255 },
    ];
    for (const col of colsToAdd) {
        if (!(await knex.schema.hasColumn('consultations', col.name))) {
            await knex.schema.table('consultations', (table) => {
                if (col.type === 'date') table.date(col.name);
                else if (col.type === 'time') table.time(col.name);
                else if (col.type === 'string') table.string(col.name, col.length);
            });
        }
    }
};
