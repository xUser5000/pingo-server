const { createComment } = require("./createComment/create.service");
const { getComment } = require("./getComment/getComment.service");

module.exports = {
  createComment,
  getComment
};
