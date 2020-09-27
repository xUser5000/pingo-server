const { createCommentSchema } = require("./create.schema");

const { InvalidInputError } = require("../../../error/InvalidInputError");
const { NotFoundError } = require("../../../error/NotFoundError");

const { findUserById } = require("../../../database/repository/user.repo");
const {
  findPostById,
  addComment
} = require("../../../database/repository/post.repo");
const { saveComment } = require("../../../database/repository/comment.repo");

const { validate } = require("../../../util/validator.util");

/**
 * Creates a new comment
 * @returns {Comment}
 */
module.exports.createComment = async ({ userId, postId, content }) => {
  // validation
  const result = await validate(
    { userId, postId, content },
    createCommentSchema
  );
  if (result) {
    throw new InvalidInputError(result);
  }

  // check for user existence
  const user = await findUserById(userId);
  if (!user) throw new NotFoundError("User not found");

  // check for post existence
  const post = await findPostById(postId);
  if (!post) throw new NotFoundError("Post not found");

  // save comment and add it to the post document
  const comment = await saveComment({
    time: new Date().getTime(),
    userId,
    postId,
    content
  });

  await addComment(post._id.toString(), comment._id.toString());

  return comment;
};
