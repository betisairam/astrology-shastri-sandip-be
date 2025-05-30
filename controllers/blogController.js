const blogService = require('../services/blogService');
const slugify = require('slugify');
const { marked } = require('marked');

exports.getAll = async (req, res) => {
    const result = await blogService.getAll(req.query);
    res.json(result);
};

exports.getBySlug = async (req, res) => {
    const blog = await blogService.getBySlug(req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Not found' });

    blog.html = marked.parse(blog.content || '');
    res.json(blog);
};

exports.create = async (req, res) => {
    try {
        const data = { ...req.body };

        // Fallback for slug
        if (!data.slug) {
            data.slug = slugify(data.title, { lower: true, strict: true });
        }

        // Ensure unique slug
        const existing = await blogService.getBySlug(data.slug);
        if (existing) {
            return res.status(400).json({ error: 'Slug already exists. Please choose another or override.' });
        }

        // SEO fallback
        data.seo_title = data.seo_title || data.title;
        data.seo_description = data.seo_description || data.summary;

        // Authenticated user ID
        data.created_by = req.user?.id || 1;

        if (data.tags && Array.isArray(data.tags)) {
            data.tags = JSON.stringify(data.tags);
        }
        if (data.status === 'published' && !data.published_at) {
            data.published_at = new Date();
        }

        const id = await blogService.create(data);
        res.status(201).json({ id });
    } catch (err) {
        console.error('❌ Failed to create blog:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = { ...req.body };

        // Optional slug change — check uniqueness
        if (updates.slug) {
            const exists = await blogService.getBySlug(updates.slug);
            if (exists && exists.id != id) {
                return res.status(400).json({ error: 'Slug already in use by another blog.' });
            }
        }

        updates.updated_at = new Date();
        const updated = await blogService.update(id, updates);
        if (!updated) return res.status(404).json({ error: 'Not found' });

        res.json({ message: 'Updated successfully' });
    } catch (err) {
        console.error('❌ Blog update error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.remove = async (req, res) => {
    await blogService.softDelete(req.params.id);
    res.json({ message: 'Blog soft deleted' });
};
