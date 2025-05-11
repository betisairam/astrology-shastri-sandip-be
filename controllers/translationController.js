const translationService = require('../services/translationService');

exports.getAll = async (req, res) => {
    const data = await translationService.getAll(req.query);
    res.json(data);
};

exports.createBulk = async (req, res) => {
    const data = req.body;
    await translationService.bulkInsert(data);
    res.status(201).json({ message: 'Bulk insert successful' });
};

exports.softDelete = async (req, res) => {
    const { id } = req.params;
    await translationService.softDelete(id);
    res.json({ message: `Soft deleted id ${id}` });
};
