const { HttpError } = require("./");

class ForbiddenError extends HttpError {
  constructor(message) {
    super(message, 403);
  }
}

module.exports = { ForbiddenError };
