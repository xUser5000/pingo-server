const { likeSchema } = require("./like.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { NotFoundError } = require("../../../error/NotFoundError");
const { ForbiddenError } = require("../../../error/ForbiddenError");

const { validate } = require("../../../util/validator.util");

const {
  findPostById,
  addLike
} = require("../../../database/repository/post.repo");
const { findUserById } = require("../../../database/repository/user.repo");

module.exports.like = async ({ userId, postId }) => {
  // validation
  const result = await validate({ userId, postId }, likeSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  // Assert user existence
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  // Assert post existence
  const post = await findPostById(postId);
  if (!post) throw new NotFoundError("Post not found");

  // Forbid liking the same post twice
  if (post.likes.includes(user._id.toString()))
    throw new ForbiddenError("You already like this post");

  // Add userId to the likes array of the post document
  await addLike(userId, postId);
};
