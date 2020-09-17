const { createPost } = require("./createPost/create.service");
const { getPost } = require("./getPost/get.service");
const { searchPosts } = require("./search/search.post.service");

module.exports = {
  createPost,
  getPost,
  searchPosts
};
