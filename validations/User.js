const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(6),
  userImg: Joi.string(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(6),
});

const updateValidation = Joi.object({
  username: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(6),
  userImg: Joi.string(),
});

module.exports = { registerValidation, loginValidation, updateValidation };
