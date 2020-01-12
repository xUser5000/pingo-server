const { HttpError } = require('./HttpError')

class InvalidInputError extends HttpError {

    constructor (message) {
        super(message, 400)
    }

}

module.exports = { InvalidInputError }