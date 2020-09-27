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

/**
 * Add a user id to the likers of a post
 * @param {String} userId Id of the user making the request
 * @param {String} postId Id of post
 */
const addLike = (userId, postId) =>
  postModel.findByIdAndUpdate(postId, { $push: { likes: userId } });

/**
 * Add a user id to the likers of a post
 * @param {String} userId Id of the user making the request
 * @param {String} postId Id of post
 */
const removeLike = (userId, postId) =>
  postModel.findByIdAndUpdate(postId, { $pull: { likes: userId } });

/**
 * Add a comment id to the comments of a post
 * @param {String} postId Id of post
 * @param {String} commentId Id of comment
 */
const addComment = (postId, commentId) =>
  postModel.findByIdAndUpdate(postId, { $push: { comments: commentId } });

/**
 * Delete a single post given its id
 * @param {String} postId Id of the post being deleted
 */
const removePost = postId => postModel.findByIdAndDelete(postId);

module.exports = {
  createIndexes,
  findPostById,
  savePost,
  search,
  addLike,
  removeLike,
  removePost,
  addComment
};
