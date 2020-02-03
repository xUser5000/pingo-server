/**
 * @description Creates an error object based on given parameters
 * @param {String[]} errors - The error messages
 * @returns {any} Formatted response to be sent to the client
 */
module.exports.createError = (...errors) => ({errors})