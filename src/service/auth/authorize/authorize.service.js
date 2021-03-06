const { authorizeSchema } = require("./authorize.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { UnAuthorizedError } = require("../../../error/UnAuthorizedError");

const { validate } = require("../../../util/validator.util");
const { getDataFromToken } = require("../../../util/token.util");

/**
 * Authorize a given token
 * @async
 * @param {String} token The token to be authorized
 * @returns {any}
 */
module.exports.authorize = async (token) => {
  // validation
  const result = await validate({ token }, authorizeSchema);
  if (result) {
    throw new InvalidInputError("Please provide a well-formatted token");
  }

  // get data
  const data = getDataFromToken(token);

  if (!data) {
    throw new UnAuthorizedError("Token is invalid");
  }

  return data;
};
