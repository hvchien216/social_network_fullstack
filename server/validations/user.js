//Valiation
const Joi = require('@hapi/joi');
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi
      .string()
  });
  return schema.validate(data);
}

const loginValidation = (data) => {
  const schema = Joi.object({

    email: Joi.string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
    typeLogin: Joi
      .string()
      .required()
  });
  return schema.validate(data);
}

const createTodoValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(2)
      .required(),
    description: Joi.string(),
  });
  return schema.validate(data);
}

module.exports = {
  registerValidation,
  loginValidation,
  createTodoValidation
};