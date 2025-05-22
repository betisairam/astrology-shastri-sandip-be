const db = require('../db/knex');

exports.getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [{ count }] = await db('services').count('id');
    const total = parseInt(count);

    const data = await db('services')
        .select('*')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset);

    res.json({ data, meta: { total, page, pageSize: limit, totalPages: Math.ceil(total / limit) } });
};

exports.getById = async (req, res) => {
    const service = await db('services').where({ id: req.params.id }).first();
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json(service);
};

exports.create = async (req, res) => {
    const [id] = await db('services').insert({ ...req.body, created_at: new Date(), updated_at: new Date() });
    res.status(201).json({ id });
};

exports.update = async (req, res) => {
    const updated = await db('services').where({ id: req.params.id }).update({ ...req.body, updated_at: new Date() });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated successfully' });
};

exports.remove = async (req, res) => {
    const deleted = await db('services').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
};
