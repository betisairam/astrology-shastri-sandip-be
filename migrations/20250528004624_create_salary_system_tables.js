exports.up = async function (knex) {
    await knex.schema.createTable('salary_settings', (table) => {
        table.increments('id');
        table.boolean('equity_salary_enabled').defaultTo(true);
        table.decimal('profit_threshold', 12, 2).defaultTo(0);
        table.decimal('base_multiplier', 5, 2).defaultTo(1.0);
        table.timestamps(true, true);
    });

    await knex.schema.createTable('salaries', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned().notNullable()
            .references('id').inTable('users').onDelete('CASCADE');
        table.decimal('base_salary', 12, 2).notNullable();
        table.decimal('equity_adjustment', 12, 2).defaultTo(0);
        table.decimal('final_salary', 12, 2).notNullable();
        table.date('month').notNullable();

        table.enu('approval_status', ['pending', 'approved', 'rejected']).defaultTo('pending');
        table.integer('approved_by').unsigned().references('id').inTable('users');
        table.timestamp('approved_at');

        table.enu('status', ['pending', 'paid', 'failed']).defaultTo('pending');
        table.timestamp('paid_on');
        table.text('notes');
        table.string('pdf_path');

        table.timestamps(true, true);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('salaries');
    await knex.schema.dropTableIfExists('salary_settings');
};
