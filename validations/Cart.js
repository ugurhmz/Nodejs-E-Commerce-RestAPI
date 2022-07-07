const Joi = require("joi");

const createCartValidation = Joi.object({
  owner: Joi.string().required().min(8),
  itemId: Joi.string().required().min(8),
  quantity: Joi.number().positive(),
});

module.exports = { createCartValidation };
