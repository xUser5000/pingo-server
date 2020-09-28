const { getCommentSchema } = require("./getComment.schema");

const { NotFoundError } = require("../../../error/NotFoundError");
const { InvalidInputError } = require("../../../error/InvalidInputError");

const {
  findCommentById
} = require("../../../database/repository/comment.repo");

const { validate } = require("../../../util/validator.util");

/**
 * Fetch comment data about Comments
 * @async
 * @param {Array<String>} ids Id array of comments to be fetched
 * @returns {Array<Comment>} array of comments data
 */
module.exports.getComment = async ids => {
  // validation
  const validationResult = await validate({ ids }, getCommentSchema);
  if (validationResult) {
    throw new InvalidInputError(validationResult);
  }

  // execute all the queries
  let queries = ids.map(id => findCommentById(id));
  const comments = await Promise.all(queries);

  // check if some comments were not found
  comments.forEach(comment => {
    if (!comment) throw new NotFoundError("Some Comments were not found");
  });

  return comments;
};
