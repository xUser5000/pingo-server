const { createPost } = require("./createPost/create.service");
const { getPost } = require("./getPost/get.service");
const { searchPosts } = require("./search/search.post.service");
const { deletePost } = require("./deletePost/delete.post.service");

module.exports = {
  createPost,
  getPost,
  searchPosts,
  deletePost
};
