const db = require('../db/knex');

exports.getAll = async ({ page = 1, limit = 10, status, tag, author }) => {
    const baseQuery = db('blogs as b')
        .leftJoin('users as u', 'b.created_by', 'u.id')
        .whereNull('b.deleted_at')
        .modify((qb) => {
            if (status) qb.where('b.status', status);
            if (tag) qb.whereRaw('b.tags::text ILIKE ?', [`%${tag}%`]);
            if (author) qb.where('b.created_by', author);
        });

    // Clone base query to count total records
    const [{ count }] = await baseQuery.clone().count('* as count');
    const total = parseInt(count, 10);

    // Fetch paginated data
    const data = await baseQuery
        .clone()
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
        .orderBy('b.created_at', 'desc')
        .limit(limit)
        .offset((page - 1) * limit);

    // Pagination metadata
    const totalPages = Math.ceil(total / limit);

    return {
        meta: {
            total,
            page,
            pageSize: limit,
            totalPages,
        },
        data
    };
};

exports.getBySlug = async (slug) => {
    const blog = await db('blogs as b')
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
            'b.created_at',
            'b.updated_at',
            'b.deleted_at',
            'b.seo_title',
            'b.seo_description',
            'u.name as created_by_name'
        )
        .leftJoin('users as u', 'b.created_by', 'u.id')
        .where('b.slug', slug)
        .whereNull('b.deleted_at')
        .first();

    // Parse tags if JSON
    if (blog && typeof blog.tags === 'string') {
        try {
            blog.tags = JSON.parse(blog.tags);
        } catch (e) {
            blog.tags = [];
        }
    }

    return blog;
};

exports.create = async (data) => {
    const [id] = await db('blogs').insert(data).returning('id');
    return id;
};

exports.update = (id, data) =>
    db('blogs').where({ id }).update({ ...data, updated_at: new Date() });

exports.softDelete = (id) =>
    db('blogs').where({ id }).update({ deleted_at: new Date() });
