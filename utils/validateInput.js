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
    description: Joi.string().required()
});

exports.consultationSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(8).max(20).required(),
    dateOfBirth: Joi.date().required(),
    timeOfBirth: Joi.string().required(),
    placeOfBirth: Joi.string().required(),
});
