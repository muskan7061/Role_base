// src/validations/registerValidation.js

const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
  }),
  username: Joi.string().trim().required().messages({
    'string.empty': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'string.empty': 'Email is required',
  }),
  age: Joi.number().integer().min(1).required().messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age must be at least 1',
    'any.required': 'Age is required',
  }),
  countryCode: Joi.string().required().messages({
    'string.empty': 'Country code is required',
  }),
  phone: Joi.string().pattern(/^[0-9]+$/).required().messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone must contain only digits',
  }),
//   image: Joi.string().required().messages({
//     // 'string.uri': 'Image must be a valid URL',
//     // 'string.empty': 'Image is required',
//   }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
  }),
  state: Joi.string().required().messages({
    'string.empty': 'State is required',
  }),
  city: Joi.string().required().messages({
    'string.empty': 'City is required',
  }),
//   slug: Joi.string().required().messages({
//     'string.empty': 'Slug is required',
//   }),
  roleID: Joi.number().integer().required().messages({
    'number.base': 'Role ID must be a number',
    'any.required': 'Role ID is required',
  }),
}).unknown(true);

module.exports = { registerSchema };
