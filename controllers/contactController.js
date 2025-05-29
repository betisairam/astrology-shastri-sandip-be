const contactService = require('../services/contactService');
const emailer = require('../utils/emailer');
const db = require('../db/knex');
const logger = require('../utils/logger');
const { replyToContact } = require('../utils/emailer');

exports.createContact = async (req, res) => {
    try {
        const { name, email, mobileNumber, message, subject, website } = req.body;

        // 🛡️ Spam honeypot
        if (website) {
            logger.warn('⚠️ Spam detected from contact form submission:', req.body);
            return res.status(400).json({ error: 'Spam detected. Submission rejected.' });
        }

        // 1. Check for existing user
        let user = await db('users').where({ email }).whereNull('deleted_at').first();

        if (!user) {
            // 2. Fetch role_id for 'customer'
            const role = await db('roles').select('id').where({ name: 'customer' }).first();
            if (!role) return res.status(500).json({ error: 'Customer role not found' });

            const [userId] = await db('users').insert({
                name,
                email,
                role_id: role.id,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            }).returning('id');

            user = { id: userId };
        }

        // 3. Save contact entry
        const contactData = {
            name,
            email,
            mobileNumber,
            message,
            subject,
            created_by: user.id
        };

        const contact = await contactService.create(contactData);

        logger.info('📨 New contact created and linked to user ID', user.id);
        res.status(201).json(contact);

    } catch (err) {
        logger.error('❌ Contact creation failed', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getAllContacts = async (req, res) => {
    if (req.user.role !== 'super_admin') {
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
        if (req.user.role !== 'super_admin') {
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

        if (req.user.role !== 'super_admin') {
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

exports.replyToContact = async (req, res) => {
    const { id } = req.params;
    const { subject, message } = req.body;

    try {
        const contact = await db('contacts').where({ id }).first();
        if (!contact) return res.status(404).json({ error: 'Contact not found' });

        await replyToContact({
            to: contact.email,
            name: contact.name,
            subject,
            message
        });

        // ✅ Store the reply as JSON in the `reply` column
        await db('contacts')
            .where({ id })
            .update({
                reply: { subject, message },
                updated_by: req.user.id,
                updated_at: new Date(),
                status: 'responded'
            });

        res.json({ message: 'Reply sent and saved successfully' });
    } catch (err) {
        logger.error('❌ Failed to reply to contact', err);
        res.status(500).json({ error: 'Failed to send reply' });
    }
};