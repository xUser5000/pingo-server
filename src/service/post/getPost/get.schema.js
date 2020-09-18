const joi = require("joi");
const { buildSchema, idExpression } = require("../../../util/validator.util");

module.exports.getPostSchema = buildSchema({
  ids: joi
    .array()
    .items(
      joi
        .string()
        .trim()
        .regex(idExpression)
        .required()
    )
    .required()
});
