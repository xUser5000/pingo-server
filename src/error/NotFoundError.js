const { HttpError } = require("./");

class NotFoundError extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = { NotFoundError };
