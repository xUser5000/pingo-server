const joi = require("joi");
const { buildSchema, idExpression } = require("../../../util/validator.util");

module.exports.deletePostSchema = buildSchema({
  postId: joi
    .string()
    .trim()
    .regex(idExpression)
    .required()
});
