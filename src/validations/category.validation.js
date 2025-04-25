// src/validations/registerValidation.js

const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than or equal to 100 characters",
  }),

  status: Joi.string().required().messages({
    "string.empty": "Status is required",
    "any.only":
      "Status must be one of the following: available, unavailable, discontinued",
  }),

  digital: Joi.string()
    // .valid('available', 'unavailable', 'discontinued')
    .required()
    .messages({
      "string.empty": "digital is required",
      "any.only":
        "Status must be one of the following: available, unavailable, discontinued",
    }),
  productID: Joi.number().integer().required().messages({
    "number.base": "productID must be a number",
    "any.required": "productID is required",
  }),
}).unknown(true);

module.exports = { categorySchema };
