const contactService = require('../services/contactService');
const emailer = require('../utils/emailer');
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

