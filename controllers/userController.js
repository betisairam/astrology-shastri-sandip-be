const userService = require('../services/userService');
const logger = require('../utils/logger');
const db = require('../db/knex');

exports.getAll = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admins only' });
    }

    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const baseQuery = db('users');

        if (search) {
            baseQuery.where((builder) =>
                builder
                    .whereILike('name', `%${search}%`)
                    .orWhereILike('email', `%${search}%`)
                    .orWhereILike('username', `%${search}%`) // Adjust according to schema
            );
        }

        const [{ count }] = await baseQuery.clone().count('id');
        const total = parseInt(count, 10);

        const users = await baseQuery
            .select('*')
            .orderBy('created_at', 'desc')
            .offset(offset)
            .limit(limit);

        res.json({
            data: users,
            meta: {
                total,
                page,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        logger.error('❌ Failed to fetch users', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.create = async (req, res) => {
    const { email, name, password, role } = req.body;

    if (!email || !name || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check if email already exists
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Insert new user
        const [user] = await db('users')
            .insert({ email, name, password, role })
            .returning(['id', 'name', 'email', 'role']);

        res.status(201).json(user);
    } catch (err) {
        logger.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
