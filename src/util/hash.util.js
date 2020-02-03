const { hashSync, compareSync } = require("bcryptjs");

/**
 * @description Hash a given password
 * @param {String} passwrod The password to be hashed
 * @returns {String} The hash result
 */
const hash = password => hashSync(password, 10);

/**
 * @description Given a password and a string, it compares the two
 * @param {String} password The password
 * @param {String} hash The hash
 * @returns {Boolean}
 */
const match = (password, hash) => compareSync(password, hash);

module.exports = { hash, match };
