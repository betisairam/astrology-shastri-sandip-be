const shareholderService = require('../services/shareholdersService');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
    try {
        const data = await shareholderService.getAll();
        res.json(data);
    } catch (err) {
        logger.error('❌ Failed to fetch shareholders', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await shareholderService.getById(req.params.id);
        if (!data) return res.status(404).json({ error: 'Not found' });
        res.json(data);
    } catch (err) {
        logger.error('❌ Failed to fetch shareholder', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await shareholderService.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        logger.error('❌ Shareholder creation failed', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await shareholderService.update(req.params.id, req.body);
        res.json(data);
    } catch (err) {
        logger.error('❌ Shareholder update failed', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.remove = async (req, res) => {
    try {
        await shareholderService.remove(req.params.id);
        res.status(204).send();
    } catch (err) {
        logger.error('❌ Shareholder deletion failed', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
