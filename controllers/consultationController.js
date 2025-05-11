const moment = require('moment');

const service = require('../services/consultationService');
const emailer = require('../utils/emailer');
const logger = require('../utils/logger');
const db = require('../db/knex');

exports.createConsultation = async (req, res) => {
    try {
        const data = {
            ...req.body,
            created_by: req.user?.id || null
        };

        let timeRaw = req.body.timeOfBirth || '';

        if (timeRaw.includes('AM') || timeRaw.includes('PM')) {
            // 12-hour format → convert to 24-hour
            const time24 = moment(timeRaw, ['h:mm A', 'hh:mm A']).format('HH:mm:ss');
            req.body.timeOfBirth = time24;
        } else if (moment(timeRaw, 'HH:mm', true).isValid()) {
            req.body.timeOfBirth = moment(timeRaw, 'HH:mm').format('HH:mm:ss');
        } else {
            return res.status(400).json({ error: 'Invalid timeOfBirth format' });
        }

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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Get total count
        const [{ count }] = await db('consultations').count('id');
        const total = parseInt(count);

        // Get paginated data
        const consultations = await db('consultations')
            .select('*')
            .orderBy('created_at', 'desc')
            .offset(offset)
            .limit(limit);

        res.json({
            data: consultations,
            meta: {
                total,
                page,
                pageSize: limit,
                totalPages: Math.ceil(total / limit)
            }
        });
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

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admins only' });
        }

        // Validate status against allowed values (prevent junk writes)
        const validStatuses = [
            'pending',
            'responded',
            'not_picking_up',
            'meeting_scheduled',
            'scam_user',
            'rejected'
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updated = await db('consultations')
            .where({ id })
            .update({
                status,
                updated_by: req.user.id,
                updated_at: new Date()
            });

        if (!updated) {
            return res.status(404).json({ error: 'Consultation not found' });
        }

        logger.info(`✅ Consultation ${id} status updated to '${status}' by admin ${req.user.id}`);
        res.json({ message: 'Consultation status updated successfully' });

    } catch (err) {
        logger.error('❌ Failed to update consultation status', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
