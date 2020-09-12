const { searchUserSchema } = require("./search.user.schema");

const { NotFoundError } = require("../../../error/NotFoundError");
const { InvalidInputError } = require("../../../error/InvalidInputError");

const { validate } = require("../../../util/validator.util");

const { search } = require("../../../database/repository/user.repo");

/**
 * @description Searches for users given a keyword
 * @async
 * @param {String} query The keyword to be used for searching
 * @returns {Array} Sorted list containing possible candidates for search
 */
module.exports.searchUsers = async query => {
  // validation
  const result = await validate({ query }, searchUserSchema);
  if (result) throw new InvalidInputError(result);

  const users = await search(query);

  if (!users || users.length == 0) throw new NotFoundError("User not found");

  return { users };
};
