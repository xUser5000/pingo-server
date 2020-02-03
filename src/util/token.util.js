const { sign, verify } = require("jsonwebtoken");

const PRIVATE_KEY = process.env["PRIVATE_KEY"] || "123456";

/**
 * @description Generates a new token using a specified payload
 * @param {any} data The payload to be encoded
 * @returns {String}
 */
const generateToken = data => sign(data, PRIVATE_KEY);

/**
 * @description Decode a given token to get the payload
 * @param {String} token The token to be decoded
 * @returns {any}
 */
const getDataFromToken = token => {
  try {
    return verify(token, PRIVATE_KEY);
  } catch (e) {
    return null;
  }
};

module.exports = { generateToken, getDataFromToken };
