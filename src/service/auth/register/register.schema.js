const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.registerSchema = buildSchema({
  username: joi
    .string()
    .required()
    .min(6),

  email: joi
    .string()
    .email()
    .required(),

  password: joi
    .string()
    .min(8)
    .required()
});
