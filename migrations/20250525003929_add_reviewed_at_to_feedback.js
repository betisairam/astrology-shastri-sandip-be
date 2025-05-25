exports.up = async function (knex) {
    const hasColumn = await knex.schema.hasColumn('feedback', 'reviewed_at');
    if (!hasColumn) {
        await knex.schema.alterTable('feedback', (table) => {
            table.timestamp('reviewed_at', { useTz: true }).nullable();
        });
    }
};

exports.down = function (knex) {
    return knex.schema.alterTable('feedback', table => {
        table.dropColumn('reviewed_at');
    });
};
