const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.getPostSchema = buildSchema({
  ids: joi
    .array()
    .items(
      joi
        .string()
        .trim()
        .required()
    )
    .required()
});
