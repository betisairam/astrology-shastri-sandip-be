const service = require('../services/consultationService');
const emailer = require('../utils/emailer');
const logger = require('../utils/logger');

exports.createConsultation = async (req, res) => {
    try {
        const data = {
            ...req.body,
            created_by: req.user?.id || null
        };
        const consultation = await service.create(data);

        await emailer.toCustomer(data.email, 'Thank you for your consultation!');
        await emailer.toAdmin('New Consultation Request', consultation);

        logger.info(`📨 New consultation submitted ${req.user ? `by user ${req.user.id}` : 'anonymously'}`);

        res.status(201).json(consultation);
    } catch (err) {
        logger.error('❌ Consultation creation failed', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getAllConsultations = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admins only' });
    }

    try {
        const consultations = await service.getAll();
        res.json(consultations);
    } catch (err) {
        logger.error('❌ Failed to fetch consultations', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteConsultation = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admins only' });
    }

    try {
        await service.softDelete(req.params.id, req.user.id);
        logger.info(`🗑️ Deleted consultation ${req.params.id}`);
        res.json({ message: 'Consultation soft-deleted' });
    } catch (err) {
        logger.error('❌ Failed to delete consultation', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
