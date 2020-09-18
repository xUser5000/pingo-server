const { deletePostSchema } = require("./delete.post.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { ForbiddenError } = require("../../../error/ForbiddenError");
const { NotFoundError } = require("../../../error/NotFoundError");

const { validate } = require("../../../util/validator.util");

const userRepo = require("../../../database/repository/user.repo");
const postRepo = require("../../../database/repository/post.repo");

/**
 * Deletes a post
 * @async
 * @param {String} postId Id of the post to be deleted
 */
module.exports.deletePost = async postId => {
  // validation
  const result = await validate({ postId }, deletePostSchema);
  if (result) {
    throw new InvalidInputError(result);
  }

  const post = await postRepo.findPostById(postId);

  // check if the post exists
  if (!post) throw new NotFoundError("Post not found");

  // delete post
  await postRepo.removePost(postId);
  await userRepo.removePost(post.author, postId);
};
