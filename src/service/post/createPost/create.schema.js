const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.createPostSchema = buildSchema({
  uid: joi
    .string()
    .trim()
    .required(),

  content: joi.string().trim(),

  image: joi
    .string()
    .trim()
    .base64()
});
