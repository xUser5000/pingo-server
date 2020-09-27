const joi = require("joi");
const { buildSchema, idExpression } = require("../../../util/validator.util");

module.exports.createCommentSchema = buildSchema({
  userId: joi
    .string()
    .trim()
    .regex(idExpression)
    .required(),

  postId: joi
    .string()
    .trim()
    .regex(idExpression)
    .required(),

  content: joi
    .string()
    .trim()
    .required()
});
