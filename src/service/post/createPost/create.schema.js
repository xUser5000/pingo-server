const joi = require("joi");
const { buildSchema, idExpression } = require("../../../util/validator.util");

module.exports.createPostSchema = buildSchema({
  uid: joi
    .string()
    .trim()
    .regex(idExpression)
    .required(),

  content: joi.string().trim(),

  image: joi
    .string()
    .trim()
    .base64()
});
