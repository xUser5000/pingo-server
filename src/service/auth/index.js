const { registerFactory } = require("./register/register.service");
const { loginFactory } = require("./login/login.service");
const { authorizeFactory } = require("./authorize/authorize.service");

const userRepo = require("../../database/repository/user.repo");

const { validate } = require("../../util/validator.util");
const { hash, match } = require("../../util/hash.util");
const { generateToken, getDataFromToken } = require("../../util/token.util");

/**
 * @description Creates a new user account
 * @async
 * @param {User} req The request object
 * @returns {User} The new account
 */
module.exports.register = registerFactory({ validate, hash, ...userRepo });

/**
 * @description Generates a token based on the user id, returns the user info
 * @async
 * @param {loginSchema} req The request object
 * @returns {User}
 */
module.exports.login = loginFactory({
  validate,
  match,
  generateToken,
  ...userRepo
});

/**
 * Authorize a given token
 * @async
 * @param {String} token The token to be authorized
 * @returns {any}
 */
module.exports.authorize = authorizeFactory({ validate, getDataFromToken });
