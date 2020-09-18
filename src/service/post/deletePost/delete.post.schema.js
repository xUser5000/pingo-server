const joi = require("joi");
const { buildSchema } = require("../../../util/validator.util");

module.exports.deletePostSchema = buildSchema({
  postId: joi
    .string()
    .trim()
    .required()
});
