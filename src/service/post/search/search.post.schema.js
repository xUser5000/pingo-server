const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.searchPostSchema = buildSchema({
  query: joi
    .string()
    .trim()
    .required()
});
