const { HttpError } = require("./");

class UnAuthorizedError extends HttpError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = { UnAuthorizedError };
