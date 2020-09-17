const { postModel } = require("../model/post.model");

/**
 * @description Creates the required indexes at runtime
 */
const createIndexes = () => postModel.createIndexes();

/**
 * @param {String} id The id of the post
 * @returns {post}
 */
const findPostById = id => postModel.findById(id).lean();

/**
 * @description Create a new post document
 * @param {Post} post The object to be saved
 * @returns {Post}
 */
const savePost = post => postModel.create(post);

/**
 * @description Searches for posts given a query string
 * @param {String} query
 * @returns {Array} List of users sorted according to their search score
 */
const search = query =>
  postModel
    .find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .lean();

module.exports = {
  createIndexes,
  findPostById,
  savePost,
  search
};
