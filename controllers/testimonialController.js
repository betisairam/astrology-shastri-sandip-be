const db = require('../db/knex');

const { safeLang } = require('../utils/lang');

exports.getAllPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Get total count
        const [{ count }] = await db('testimonials')
            .whereNull('deleted_at')
            .andWhere('is_active', true)
            .count('id as count');

        // Fetch paginated data
        // const testimonials = await db('testimonials')
        //     .whereNull('deleted_at')
        //     .andWhere('is_active', true)
        //     .orderBy('created_at', 'desc')
        //     .limit(limit)
        //     .offset(offset);

        const testimonials = await db('testimonials')
            .select('image', 'name', 'designation', 'message', 'is_active', 'featured')
            .whereNull('deleted_at')
            .andWhere('is_active', true)
            .orderBy('created_at', 'desc')
            .limit(limit)
            .offset(offset);

        res.json({
            page,
            limit,
            total: parseInt(count),
            testimonials
        });
    } catch (err) {
        console.error('Error fetching paginated testimonials:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

exports.getAllByLang = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const testimonials = await db('testimonials')
            .whereNull('deleted_at')
            .andWhere('is_active', true)
            .orderBy('created_at', 'desc');

        const data = testimonials.map(t => ({
            ...t,
            name: safeLang(t.name, lang),
            message: safeLang(t.message, lang),
            designation: safeLang(t.designation, lang),
        }));

        res.json(data);
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

exports.create = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Expected a single object, received an array.' });
        }

        const data = {
            ...req.body,
            image: req.body.image || null,
            is_active: req.body.is_active ?? true,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const [inserted] = await db('testimonials').insert(data).returning(['id']);
        res.status(201).json(inserted);
    } catch (err) {
        console.error('Error inserting testimonial:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to create testimonial.' });
        }
    }
};

// exports.getById = async (req, res) => {
//     try {
//         const t = await db('testimonials')
//             .where({ id: req.params.id })
//             .whereNull('deleted_at') // ✅ Correct method
//             .first();

//         if (!t) {
//             return res.status(404).json({ error: 'Not found' });
//         }

//         res.json(t);
//     } catch (err) {
//         console.error('Error fetching testimonial by ID:', err);
//         if (!res.headersSent) {
//             res.status(500).json({ error: 'Server error' });
//         }
//     }
// };

exports.getById = async (req, res) => {
    const { id } = req.params;

    // 🛑 Validate ID is a number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const t = await db('testimonials')
            .where({ id: parseInt(id), is_active: true })
            .whereNull('deleted_at')
            .first();

        if (!t) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(t);
    } catch (err) {
        console.error('Error fetching testimonial by ID:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await db('testimonials')
            .where({ id: req.params.id })
            .update({ ...req.body, updated_at: new Date() });

        if (!updated) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json({ message: 'Updated successfully' });
    } catch (err) {
        console.error('Error updating testimonial:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

exports.softDelete = async (req, res) => {
    try {
        const deleted = await db('testimonials')
            .where({ id: req.params.id })
            .update({ deleted_at: new Date(), is_active: false });

        if (!deleted) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json({ message: 'Soft deleted successfully' });
    } catch (err) {
        console.error('Error soft deleting testimonial:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};
