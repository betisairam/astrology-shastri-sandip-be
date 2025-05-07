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
    description: Joi.string().required(),
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
