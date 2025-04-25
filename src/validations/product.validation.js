// src/validations/registerValidation.js

const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must be less than or equal to 100 characters',
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description must be less than or equal to 500 characters',
    }),

  price: Joi.number()
    .greater(0)
    .required()
    .messages({
      'number.base': 'Price must be a valid number',
      'number.greater': 'Price must be greater than 0',
      'any.required': 'Price is required',
    }),

  status: Joi.string()
    // .valid('available', 'unavailable', 'discontinued')
    .required()
    .messages({
      'string.empty': 'Status is required',
      'any.only': 'Status must be one of the following: available, unavailable, discontinued',
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Stock must be a valid number',
      'number.integer': 'Stock must be an integer',
      'number.min': 'Stock cannot be negative',
      'any.required': 'Stock is required',
    }),

}).unknown(true);

module.exports = { productSchema };
