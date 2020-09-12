const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.searchUserSchema = buildSchema({
  query: joi
    .string()
    .trim()
    .required()
});
