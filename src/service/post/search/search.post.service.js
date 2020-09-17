const { searchPostSchema } = require("./search.post.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { NotFoundError } = require("../../../error/NotFoundError");

const { validate } = require("../../../util/validator.util");

const { search } = require("../../../database/repository/post.repo");

/**
 * Searches through the collection for posts containing the given keyword
 * @async
 * @param {String} query The search keyword
 * @returns {Array<Post>} Sorted list containing possible candidates for search
 */
module.exports.searchPosts = async query => {
  // validation
  const result = await validate({ query }, searchPostSchema);
  if (result) throw new InvalidInputError(result);

  const posts = await search(query);

  if (!posts || posts.length == 0) throw new NotFoundError("Posts not found");

  return { posts };
};
