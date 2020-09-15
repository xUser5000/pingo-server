const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.registerSchema = buildSchema({
  username: joi
    .string()
    .trim()
    .required()
    .min(6),

  email: joi
    .string()
    .trim()
    .email()
    .required(),

  password: joi
    .string()
    .trim()
    .min(8)
    .required()
});
