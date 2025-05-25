const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const logger = require('../utils/logger');
const db = require('../db/knex');

exports.getAll = async (req, res) => {
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Admins only' });
    }

    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const baseQuery = db('users')
            .leftJoin('roles', 'users.role_id', 'roles.id')
            .whereNull('users.deleted_at')
            .whereNot('roles.name', 'super_admin');

        if (search) {
            baseQuery.andWhere((builder) =>
                builder
                    .whereILike('users.name', `%${search}%`)
                    .orWhereILike('users.email', `%${search}%`)
            );
        }

        const [{ count }] = await baseQuery.clone().count('users.id');
        const total = parseInt(count, 10);

        const users = await baseQuery
            .select(
                'users.id',
                'users.name',
                'users.email',
                'users.profile_url',
                'users.created_at',
                'roles.name as role'
            )
            .orderBy('users.created_at', 'desc')
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
    const { email, name, password, role, profile_url } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ error: 'Missing required fields: email, name or password' });
    }

    try {
        // Check if email already exists
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Find role id; if not provided or invalid, fallback to default role 'customer'
        let roleRecord;
        if (role) {
            roleRecord = await db('roles').where({ name: role, is_active: true }).first();
        }
        if (!roleRecord) {
            roleRecord = await db('roles').where({ name: 'customer', is_active: true }).first();
        }
        if (!roleRecord) {
            return res.status(500).json({ error: 'Default role "customer" not found or inactive' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [user] = await db('users')
            .insert({
                email,
                name,
                password: hashedPassword,
                role_id: roleRecord.id,
                profile_url: profile_url || null,
            })
            .returning(['id', 'name', 'email', 'role_id', 'profile_url']);

        res.status(201).json(user);
    } catch (err) {
        logger.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
