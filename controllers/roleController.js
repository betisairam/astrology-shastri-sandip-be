const db = require('../db/knex');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
    try {
        const roles = await db('roles')
            .where({ is_active: true })
            .whereNull('deleted_at');
        res.json(roles);
    } catch (err) {
        logger.error('❌ Failed to fetch roles', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        const [id] = await db('roles').insert({ name }).returning('id');
        res.status(201).json({ id, name });
    } catch (err) {
        logger.error('❌ Failed to create role', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updated = await db('roles').where({ id }).update({ name });
        if (!updated) return res.status(404).json({ error: 'Role not found' });
        res.json({ message: 'Role updated' });
    } catch (err) {
        logger.error('❌ Failed to update role', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await db('roles').where({ id }).first();
        if (!role) return res.status(404).json({ error: 'Role not found' });
        if (role.name === 'super_admin') {
            return res.status(400).json({ error: 'Cannot delete super_admin' });
        }

        await db('roles').where({ id }).update({
            is_active: false,
            deleted_at: new Date()
        });

        res.json({ message: 'Role soft deleted' });
    } catch (err) {
        logger.error('❌ Failed to soft delete role', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.restore = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await db('roles')
            .where({ id })
            .update({
                is_active: true,
                deleted_at: null
            });
        if (!updated) return res.status(404).json({ error: 'Role not found' });
        res.json({ message: 'Role restored' });
    } catch (err) {
        logger.error('❌ Failed to restore role', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
