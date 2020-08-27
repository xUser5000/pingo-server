class HttpError extends Error {
  /**
   * @param {String} message The erorr message
   * @param {Number} code The HTTP status code
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = { HttpError };
