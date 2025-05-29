const service = require('../services/salarySettingsService');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
    const data = await service.getAll();
    res.json(data);
};

exports.create = async (req, res) => {
    const setting = await service.create(req.body);
    res.status(201).json(setting);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const updated = await service.update(id, req.body);
    res.json(updated);
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await service.remove(id);
    res.status(204).send();
};
