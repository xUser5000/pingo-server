const { profileSchema } = require("./profile.schema");

const { NotFoundError } = require("../../../error/NotFoundError");
const { InvalidInputError } = require("../../../error/InvalidInputError");

const { findUserById } = require("../../../database/repository/user.repo");

const { validate } = require("../../../util/validator.util");

/**
 * @description Gets the user profile info
 * @async
 * @param {String []} ids The user ids
 * @returns {User []} List of the user objects
 */
module.exports.getProfile = async ids => {
  // validation
  const validationResult = await validate({ ids }, profileSchema);
  if (validationResult) {
    throw new InvalidInputError(validationResult);
  }

  // execute all the queries
  let queries = ids.map(id => findUserById(id, false));
  const users = await Promise.all(queries);

  // check if some users were not found
  users.forEach(user => {
    if (!user) throw new NotFoundError("Some users were not found");
  });

  return users;
};
