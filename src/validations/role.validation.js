// src/validations/roleValidation.js
const Joi = require('joi');

const roleSchema = Joi.object({
  role: Joi.string()
    .valid('user', 'admin', 'seller')
    .required()
    .messages({
      'any.required': 'Role is required',
      'string.base': 'Role must be a string',
      'any.only': 'Role must be one of [user, admin, seller]',
    }),
});

module.exports = {
  roleSchema,
};
