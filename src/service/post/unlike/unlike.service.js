const { unlikeSchema } = require("./unlike.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { NotFoundError } = require("../../../error/NotFoundError");
const { ForbiddenError } = require("../../../error/ForbiddenError");

const { validate } = require("../../../util/validator.util");

const {
  findPostById,
  removeLike
} = require("../../../database/repository/post.repo");
const { findUserById } = require("../../../database/repository/user.repo");

/**
 * User unlikes a post
 * @async
 */
module.exports.unlike = async ({ userId, postId }) => {
  // validation
  const result = await validate({ userId, postId }, unlikeSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  // Assert user existence
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  // Assert post existence
  const post = await findPostById(postId);
  if (!post) throw new NotFoundError("Post not found");

  // Forbid unliking an already-unliked post
  if (!post.likes.includes(user._id.toString()))
    throw new ForbiddenError("You didn't like this post before");

  // Add userId to the likes array of the post document
  await removeLike(userId, postId);
};
