const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/knex');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user along with role name
        const user = await db('users')
            .select('users.*', 'roles.name as role_name')
            .leftJoin('roles', 'users.role_id', 'roles.id')
            .where('users.email', email)
            .first();

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Sign JWT with user id and role name
        const token = jwt.sign(
            { id: user.id, role: user.role_name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // 1 day expiration
        );

        res.json({ token, role: user.role_name });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
