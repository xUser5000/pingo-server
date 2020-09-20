const joi = require("joi");
const { buildSchema, idExpression } = require("../../../util/validator.util");

module.exports.unfollowSchema = buildSchema({
  userA: joi
    .string()
    .trim()
    .regex(idExpression)
    .required(),

  userB: joi
    .string()
    .trim()
    .regex(idExpression)
    .required()
});
