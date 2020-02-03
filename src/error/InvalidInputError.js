const { HttpError } = require('./HttpError')

class InvalidInputError extends HttpError {

    constructor (errors) {
        super(JSON.stringify(errors), 400)
    }

}

module.exports = { InvalidInputError }