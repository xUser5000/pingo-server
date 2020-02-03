const { HttpError } = require("./HttpError");

class NotFoundError extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = { NotFoundError };
