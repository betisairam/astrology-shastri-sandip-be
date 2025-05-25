const db = require('../db/knex');

exports.create = async ({ name, email, mobileNumber, message, subject, created_by }) => {
    const [contact] = await db('contacts')
        .insert({
            name,
            email,
            mobileNumber,
            message,
            subject,
            created_by,
        })
        .returning(['id', 'name', 'email', 'mobileNumber', 'message', 'subject', 'created_by']);

    return contact;
};

exports.getAll = async () => {
    return db('contacts')
        .select('id', 'name', 'email', 'mobileNumber', 'description', 'status', 'created_at')
        .whereNull('deleted_at');
};

exports.softDelete = async (id, adminId) => {
    return db('contacts')
        .where({ id })
        .update({ deleted_at: new Date(), updated_by: adminId });
};

