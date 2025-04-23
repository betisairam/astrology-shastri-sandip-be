const db = require('../db/knex');

exports.create = async ({
    fullName, email, mobileNumber,
    dateOfBirth, timeOfBirth, placeOfBirth,
    created_by
}) => {
    const [consultation] = await db('consultations')
        .insert({
            fullName,
            email,
            mobileNumber,
            dateOfBirth,
            timeOfBirth,
            placeOfBirth,
            status: 'pending',
            created_by
        })
        .returning('*');

    return consultation;
};

exports.getAll = () => {
    return db('consultations')
        .select('*')
        .whereNull('deleted_at');
};

exports.softDelete = async (id, adminId) => {
    return db('consultations')
        .where({ id })
        .update({ deleted_at: new Date(), updated_by: adminId });
};
