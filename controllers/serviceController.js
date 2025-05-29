const serviceService = require('../services/serviceService');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
    try {
        const country = req.query.country || 'IN';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await serviceService.getPaginated(country, page, limit);
        res.json({ data: result });
    } catch (err) {
        logger.error('❌ Failed to fetch services', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllGlobal = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Only super admins can access all services' });
        }

        const result = await serviceService.getAllGlobal();
        res.json({ data: result });
    } catch (err) {
        logger.error('❌ Failed to fetch all services globally', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const service = await serviceService.getById(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        res.json({ data: service });
    } catch (err) {
        logger.error('❌ Failed to fetch service', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.create = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Only super admins can create services' });
        }

        const id = await serviceService.create(req.body);
        res.status(201).json({ message: 'Service created', id });
    } catch (err) {
        logger.error('❌ Failed to create service', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.update = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Only super admins can update services' });
        }

        const updated = await serviceService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Service not found' });

        res.json({ message: 'Service updated successfully' });
    } catch (err) {
        logger.error('❌ Failed to update service', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.remove = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Only super admins can remove services' });
        }

        const updated = await serviceService.softDelete(req.params.id);
        if (!updated) return res.status(404).json({ error: 'Service not found' });

        res.json({ message: 'Service soft deleted' });
    } catch (err) {
        logger.error('❌ Failed to soft delete service', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.restore = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Only super admins can restore services' });
        }

        const updated = await serviceService.restore(req.params.id);
        if (!updated) return res.status(404).json({ error: 'Service not found' });

        res.json({ message: 'Service restored successfully' });
    } catch (err) {
        logger.error('❌ Failed to restore service', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
