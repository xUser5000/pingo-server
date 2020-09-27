const { commentModel } = require("../model/comment.model");

const findCommentById = commentId => commentModel.findById(commentId);

const saveComment = comment => commentModel.create(comment);

const removeComment = commentId => commentModel.findByIdAndDelete(commentId);

module.exports = {
  findCommentById,
  saveComment,
  removeComment
};
