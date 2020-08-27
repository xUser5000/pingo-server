const { loginSchema } = require("./login.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { NotFoundError } = require("../../../error/NotFoundError");

const { findUserByEmail } = require("../../../database/repository/user.repo");

const { validate } = require("../../../util/validator.util");
const { match } = require("../../../util/hash.util");
const { generateToken } = require("../../../util/token.util");

/**
 * @description Generates a token based on the user id, returns the user info
 * @async
 * @param {loginSchema} req The request object
 * @returns {User}
 */
module.exports.login = async (req) => {
  // prevents further modification of the object
  req = Object.freeze(req);

  // validation
  const result = await validate(req, loginSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  // look for the user in the database
  const user = await findUserByEmail(req["email"]);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  // compare the password with the hash
  if (!match(req["password"], user["password"])) {
    throw new NotFoundError("User not found");
  }

  // generate the token
  const token = generateToken(user._id.toString());

  // return the response
  return { user, token };
};
