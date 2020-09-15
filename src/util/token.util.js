const { sign, verify } = require("jsonwebtoken");

const TOKEN_SECRET = process.env["TOKEN_SECRET"];

/**
 * @description Generates a new token using a specified payload
 * @param {any} data The payload to be encoded
 * @returns {String}
 */
const generateToken = data => sign(data, TOKEN_SECRET);

/**
 * @description Decode a given token to get the payload
 * @param {String} token The token to be decoded
 * @returns {any}
 */
const getDataFromToken = token => {
  try {
    return verify(token.trim(), TOKEN_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = { generateToken, getDataFromToken };
