const service = require('../services/salaryService');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
    try {
        const salaries = await service.getAll();
        res.json(salaries);
    } catch (err) {
        logger.error('❌ Failed to fetch salaries', err);
        res.status(500).json({ error: 'Internal error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const salary = await service.getById(req.params.id);
        if (!salary) return res.status(404).json({ error: 'Not found' });
        res.json(salary);
    } catch (err) {
        logger.error('❌ Error fetching salary', err);
        res.status(500).json({ error: 'Internal error' });
    }
};

exports.create = async (req, res) => {
    try {
        const created = await service.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        logger.error('❌ Salary creation failed', err);
        res.status(500).json({ error: 'Creation error' });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        logger.error('❌ Salary update failed', err);
        res.status(500).json({ error: 'Update error' });
    }
};

exports.remove = async (req, res) => {
    try {
        await service.remove(req.params.id);
        res.status(204).send();
    } catch (err) {
        logger.error('❌ Salary delete failed', err);
        res.status(500).json({ error: 'Delete error' });
    }
};
