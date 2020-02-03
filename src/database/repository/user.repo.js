const { userModel } = require("../model/user.model");

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
 * @description Deletes all users in the database
 */
const deleteAllUsers = () => userModel.deleteMany({});

/* Exports */
module.exports = {
  findUserById,
  findUserByEmail,
  findUserByUsername,
  saveUser,
  deleteAllUsers
};
