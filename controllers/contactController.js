const contactService = require('../services/contactService');
const emailer = require('../utils/emailer');
const db = require('../db/knex');
const logger = require('../utils/logger');

exports.createContact = async (req, res) => {
    try {
        // Extract form data
        const { name, email, mobileNumber, description, website } = req.body;


        // Honeypot validation - check if the hidden 'website' field is filled
        if (website) {
            // If the honeypot field has any value, treat it as a spam submission
            logger.warn('⚠️ Spam detected from contact form submission:', req.body);
            return res.status(400).json({ error: 'Spam detected. Submission rejected.' });
        }

        // If no spam detected, proceed with the normal submission process
        const data = {
            name,
            email,
            mobileNumber,
            description,
            created_by: req.user?.id || null
        };

        // Store the valid form submission in the database
        const contact = await contactService.create(data);

        // Send email notifications
        // await emailer.toCustomer(data.email, 'Thank you for contacting us!');
        // await emailer.toAdmin('New Contact Form Submitted', contact);

        // Log the successful submission
        logger.info('📨 New contact submission', contact);

        // Respond with success
        res.status(201).json(contact);
    } catch (err) {
        // Log error and respond with failure
        logger.error('❌ Contact submission failed', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.getAllContacts = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admins only' });
    }

    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        // Base query
        const baseQuery = db('contacts').whereNull('deleted_at');

        // Apply search filter
        if (search) {
            baseQuery.where((builder) =>
                builder
                    .whereILike('name', `%${search}%`)
                    .orWhereILike('email', `%${search}%`)
                    .orWhereILike('mobileNumber', `%${search}%`)
            );
        }

        // Get total count
        const [{ count }] = await baseQuery.clone().count('id');
        const total = parseInt(count, 10);

        // Get paginated records
        const contacts = await baseQuery
            .select('*')
            .orderBy('created_at', 'desc')
            .offset(offset)
            .limit(limit);

        // Send response
        res.json({
            data: contacts,
            meta: {
                total,
                page,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        logger.error('❌ Failed to fetch contacts', err);
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