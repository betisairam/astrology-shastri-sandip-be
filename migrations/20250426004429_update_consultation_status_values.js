exports.up = async function (knex) {
    await knex.schema.alterTable('consultations', table => {
        table.renameColumn('status', 'status_old');
    });

    await knex.schema.alterTable('consultations', table => {
        table.enu('status', [
            'pending',
            'responded',
            'not_picking_up',
            'meeting_scheduled',
            'scam_user',
            'rejected'
        ]).defaultTo('pending').notNullable();
    });

    // Copy old status (optional step)
    await knex.raw(`UPDATE consultations SET status = status_old`);

    // Drop old column
    await knex.schema.alterTable('consultations', table => {
        table.dropColumn('status_old');
    });
};

exports.down = async function (knex) {
    await knex.schema.alterTable('consultations', table => {
        table.renameColumn('status', 'status_new');
    });

    await knex.schema.alterTable('consultations', table => {
        table.enu('status', ['pending']).defaultTo('pending').notNullable();
    });

    await knex.raw(`UPDATE consultations SET status = 'pending'`);

    await knex.schema.alterTable('consultations', table => {
        table.dropColumn('status_new');
    });
};
