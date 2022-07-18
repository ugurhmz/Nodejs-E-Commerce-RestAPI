const Joi = require("joi");

// create validation
const createValidation = Joi.object({
  username: Joi.string().required().min(3).max(50),
  name: Joi.string().required(),
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(6),
  userImg: Joi.string(),
});

// login validation
const loginValidation = Joi.object({
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(6),
});

// reset-password validation
const resetPasswordValidation = Joi.object({
  email: Joi.string().trim().email().required(),
});

const updateValidation = Joi.object({
  username: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required().min(8),
  name: Joi.string(),
  password: Joi.string().required().min(6),
  userImg: Joi.string(),
});

module.exports = {
  createValidation,
  loginValidation,
  resetPasswordValidation,
  updateValidation,
};
