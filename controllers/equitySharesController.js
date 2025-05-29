const equityService = require('../services/equitySharesService');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
    try {
        const data = await equityService.getAll();
        res.json(data);
    } catch (err) {
        logger.error('❌ Failed to fetch equity shares', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await equityService.getById(req.params.id);
        if (!data) return res.status(404).json({ error: 'Not found' });
        res.json(data);
    } catch (err) {
        logger.error('❌ Failed to fetch equity share', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await equityService.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        logger.error('❌ Equity share creation failed', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await equityService.update(req.params.id, req.body);
        res.json(data);
    } catch (err) {
        logger.error('❌ Equity share update failed', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.remove = async (req, res) => {
    try {
        await equityService.remove(req.params.id);
        res.status(204).send();
    } catch (err) {
        logger.error('❌ Equity share deletion failed', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
