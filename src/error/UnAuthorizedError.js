const { HttpError } = require("./HttpError");

class UnAuthorizedError extends HttpError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = { UnAuthorizedError };
