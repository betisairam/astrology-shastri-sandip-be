const db = require('../db/knex');

exports.getAll = async ({ page = 1, limit = 10, status, tag, author }) => {
    const query = db('blogs as b')
        .select(
            'b.id',
            'b.title',
            'b.slug',
            'b.summary',
            'b.content',
            'b.featured_image',
            'b.tags',
            'b.status',
            'b.published_at',
            'b.deleted_at',
            'b.created_at',
            'b.updated_at',
            'u.id as author_id',
            'u.name as author_name'
        )
        .leftJoin('users as u', 'b.created_by', 'u.id')
        .whereNull('b.deleted_at')
        .modify((qb) => {
            if (status) qb.where('b.status', status);
            if (tag) qb.whereRaw('b.tags::text ILIKE ?', [`%${tag}%`]);
            if (author) qb.where('b.created_by', author);
        })
        .orderBy('b.created_at', 'desc')
        .limit(limit)
        .offset((page - 1) * limit);

    const data = await query;
    return { data };
};

exports.getBySlug = (slug) =>
    db('blogs').where({ slug }).whereNull('deleted_at').first();

exports.create = async (data) => {
    const [id] = await db('blogs').insert(data).returning('id');
    return id;
};

exports.update = (id, data) =>
    db('blogs').where({ id }).update({ ...data, updated_at: new Date() });

exports.softDelete = (id) =>
    db('blogs').where({ id }).update({ deleted_at: new Date() });
