exports.up = async function (knex) {
    await knex.schema.alterTable('consultations', table => {
        table.dropColumn('status');
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
};

exports.down = async function (knex) {
    await knex.schema.alterTable('consultations', table => {
        table.dropColumn('status');
    });

    await knex.schema.alterTable('consultations', table => {
        table.enu('status', ['pending']).defaultTo('pending').notNullable();
    });
};
