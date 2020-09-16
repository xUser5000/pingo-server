const { userModel } = require("../model/user.model");

const createIndexes = () => userModel.createIndexes();

/**
 * @param {String} id The id of the user
 * @returns {User}
 */
const findUserById = id => userModel.findById(id).lean();

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
  deleteAllUsers,
  search
};
