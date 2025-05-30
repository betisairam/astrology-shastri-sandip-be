// utils/validateInput.js
const Joi = require('joi');

exports.consultationSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    timeOfBirth: Joi.string().required(),
    placeOfBirth: Joi.string().required()
});

exports.contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(8).max(20).required(),
    subject: Joi.string().required(), // ✅ now required
    message: Joi.string().required(),
    website: Joi.string().valid('').required()
});

exports.consultationSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(8).max(20).required(),
    dateOfBirth: Joi.date().required(),
    timeOfBirth: Joi.string().required(),
    placeOfBirth: Joi.string().required(),
});

exports.contactStatusUpdateSchema = Joi.object({
    status: Joi.string()
        .valid(
            'pending',
            'responded',
            'not_picking_up',
            'meeting_scheduled',
            'scam_user',
            'rejected'
        )
        .required()
});

exports.consultationStatusUpdateSchema = Joi.object({
    status: Joi.string()
        .valid(
            'pending',
            'responded',
            'not_picking_up',
            'meeting_scheduled',
            'scam_user',
            'rejected'
        )
        .required()
});

exports.contactReplySchema = Joi.object({
    subject: Joi.string().required(),
    message: Joi.string().required(),
    sendEmail: Joi.boolean().optional().default(true)
});

exports.salarySettingsSchema = Joi.object({
    equity_salary_enabled: Joi.boolean().required(),
    profit_threshold: Joi.number().required(),
    base_multiplier: Joi.number().required()
});

exports.blogSchema = Joi.object({
    title: Joi.string().min(3).required(),
    slug: Joi.string().pattern(/^[a-z0-9-]+$/).min(3).optional(), // clean SEO-friendly slugs
    summary: Joi.string().max(300).allow(''),
    content: Joi.string().required(),
    featured_image: Joi.string().uri().optional(),
    tags: Joi.array().items(Joi.string()).default([]),
    status: Joi.string().valid('draft', 'published', 'scheduled').default('draft'),
    published_at: Joi.date()
        .allow(null)
        .when('status', {
            is: 'scheduled',
            then: Joi.date().required().messages({
                'any.required': '"published_at" is required when status is "scheduled"',
            }),
            otherwise: Joi.date().optional().allow(null),
        }),
    // 🆕 SEO Fields
    seo_title: Joi.string().max(60).allow('').optional(),       // Google recommends ≤ 60 characters
    seo_description: Joi.string().max(160).allow('').optional(),   // Google recommends ≤ 160 characters
});