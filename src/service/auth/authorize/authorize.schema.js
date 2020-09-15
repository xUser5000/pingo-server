const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.authorizeSchema = buildSchema({
  token: joi
    .string()
    .trim()
    .required()
});
