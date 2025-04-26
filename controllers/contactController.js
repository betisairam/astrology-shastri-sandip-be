const contactService = require('../services/contactService');
const emailer = require('../utils/emailer');
const db = require('../db/knex');
const logger = require('../utils/logger');

exports.createContact = async (req, res) => {
    try {
        const data = {
            ...req.body,
            created_by: req.user.id, // From JWT token
        };

        const contact = await contactService.create(data);

        // Email notifications
        await emailer.toCustomer(data.email, 'Thank you for contacting us!');
        await emailer.toAdmin('New Contact Form Submitted', contact);

        logger.info('📨 New contact submission', contact);

        res.status(201).json(contact);
    } catch (err) {
        logger.error('❌ Contact submission failed', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }

        const contacts = await contactService.getAll();
        res.json(contacts);
    } catch (err) {
        logger.error('❌ Failed to get contacts', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }

        const contactId = req.params.id;
        await contactService.softDelete(contactId, req.user.id);
        logger.info(`🗑️ Soft deleted contact ${contactId}`);
        res.json({ message: 'Contact soft-deleted successfully' });
    } catch (err) {
        logger.error('❌ Failed to delete contact', err);
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

        const updated = await db('contacts')
            .where({ id })
            .update({
                status,
                updated_by: req.user.id,
                updated_at: new Date()
            });

        if (!updated) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        logger.info(`✅ Contact ${id} status updated to '${status}' by admin ${req.user.id}`);
        res.json({ message: 'Contact status updated successfully' });

    } catch (err) {
        logger.error('❌ Failed to update contact status', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};