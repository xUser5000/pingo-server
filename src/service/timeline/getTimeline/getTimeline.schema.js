const joi = require("joi");
const { buildSchema, idExpression } = require("../../../util/validator.util");

module.exports.getTimelineSchema = buildSchema({
  uid: joi
    .string()
    .trim()
    .regex(idExpression)
    .required()
});
