const { userModel } = require("../model/user.model");

const createIndexes = () => userModel.createIndexes();

/**
 * @param {String} id The id of the user
 * @returns {User}
 */
const findUserById = async (id, sensitive = true) => {
  if (sensitive) return await userModel.findById(id).lean();
  else
    return await userModel
      .findById(id)
      .select("-password")
      .select("-email")
      .lean();
};

/**
 * @param {String} email The email of the user
 * @returns {User}
 */
const findUserByEmail = email => userModel.findOne({ email }).lean();

/**
 * @param {String} username The username of the user
 * @returns {User}
 */
const findUserByUsername = username => userModel.findOne({ username }).lean();

/**
 * @description Create a new user document
 * @param {User} user The object to be saved
 * @returns {User}
 */
const saveUser = user => userModel.create(user);

/**
 * @description Searches for users given a query string
 * @param {String} query
 * @returns {Array} List of users sorted according to their text score
 */
const search = query =>
  userModel
    .find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .lean();

/**
 * @param {String} id Id of the user
 * @param {String} post Id of the post document
 */
const addPost = (userId, postId) =>
  userModel.findByIdAndUpdate(userId, { $push: { posts: postId } });

/**
 * Removes a postId from the posts array
 * @param {String} userId Id of user that has the post
 * @param {String} postId Id ot the post to be deleted
 */
const removePost = (userId, postId) =>
  userModel.findByIdAndUpdate(userId, { $pull: { posts: postId } });

const addFollower = (userA, userB) =>
  userModel.findByIdAndUpdate(userA, { $push: { followers: userB } });

const addFollowing = (userA, userB) =>
  userModel.findByIdAndUpdate(userA, { $push: { following: userB } });

const removeFollower = (userA, userB) =>
  userModel.findByIdAndUpdate(userA, { $pull: { followers: userB } });

const removeFollowing = (userA, userB) =>
  userModel.findByIdAndUpdate(userA, { $pull: { following: userB } });

/**
 * @description Deletes all users in the database
 */
const deleteAllUsers = () => userModel.deleteMany({});

/* Exports */
module.exports = {
  createIndexes,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  saveUser,
  search,
  addPost,
  removePost,
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
  deleteAllUsers
};
