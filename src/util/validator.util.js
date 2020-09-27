const joi = require("joi");

/**
 * @description Validates an object against a certain schema
 * @async
 * @param {any} obj The object to be validated
 * @param {any} schema The validation schema
 * @returns {Array<{field: error}>} List of errors
 */
const validate = async (obj, schema) => {
  try {
    await joi.validate(obj, schema);
    return null;
  } catch (e) {
    if (!e.details) console.log(e);
    return (errors = e.details.map(detail => {
      return {
        field: detail.context.label,
        error: detail.message
      };
    }));
  }
};

/**
 * @description builds a schema object
 * @param {any} schema The schema
 * @returns {joi.Schema}
 */
const buildSchema = schema => joi.object(schema).options({ abortEarly: false });

/**
 * A regular expression for matching mongodb objectid (AKA a string of 24 hex characters)
 */
const idExpression = new RegExp("^[0-9a-fA-F]{24}$");

/* Exports */
module.exports = { validate, buildSchema, idExpression };
