const countryService = require('../services/countryService');

exports.getAll = async (req, res) => {
    const countries = await countryService.getAll();
    res.json(countries);
};

exports.getById = async (req, res) => {
    const country = await countryService.getById(req.params.id);
    if (!country) return res.status(404).json({ error: 'Not found' });
    res.json(country);
};

exports.create = async (req, res) => {
    if (req.user.role !== 'super_admin') return res.status(403).json({ error: 'Forbidden' });
    const [country] = await countryService.create(req.body);
    res.status(201).json(country);
};

exports.update = async (req, res) => {
    if (req.user.role !== 'super_admin') return res.status(403).json({ error: 'Forbidden' });
    const [updated] = await countryService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
};

exports.remove = async (req, res) => {
    if (req.user.role !== 'super_admin') return res.status(403).json({ error: 'Forbidden' });
    const deleted = await countryService.softDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Soft deleted' });
};

exports.restore = async (req, res) => {
    if (req.user.role !== 'super_admin') return res.status(403).json({ error: 'Forbidden' });
    const restored = await countryService.restore(req.params.id);
    if (!restored) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Restored' });
};
