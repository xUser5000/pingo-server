const { getProfileFactory } = require("./profile/profile.service");

const { validate } = require("../../util/validator.util");

const userRepo = require("../../database/repository/user.repo");

/**
 * @description Gets the user profile info
 * @async
 * @param {String []} ids The user ids
 * @returns {User []}
 */
module.exports.getProfile = getProfileFactory({ validate, ...userRepo });
