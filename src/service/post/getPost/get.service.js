const { getPostSchema } = require("./get.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { NotFoundError } = require("../../../error/NotFoundError");

const { validate } = require("../../../util/validator.util");

const { findPostById } = require("../../../database/repository/post.repo");

/**
 * Get posts data given their IDs
 * @async
 * @param {Array<String>} ids ID array of posts
 * @returns {Array<Post>}
 */
module.exports.getPost = async ids => {
  // validation
  const result = await validate({ ids }, getPostSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  // execute all the queries
  const queries = ids.map(id => findPostById(id));
  const posts = await Promise.all(queries);

  // check if some posts were not found
  posts.forEach(post => {
    if (!post) throw new NotFoundError("Some users were not found");
  });

  return posts;
};
