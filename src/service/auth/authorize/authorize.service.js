const { authorizeSchema } = require('./authorize.schema')
const { validate } = require('../../../util/validator.util')

const { InvalidInputError } = require('../../error/InvalidInputError')
const { UnAuthorizedError } = require('../../error/UnAuthorizedError')

const { getDataFromToken } = require('../../../util/token.util')

/**
 * Authorize a given token
 * @async
 * @param {String} token The token to be authorized
 * @returns {any} 
 */
module.exports.authorize = async token => {

    // validation
    const result = await validate({token}, authorizeSchema)
    if (result) {
        throw new InvalidInputError('Token is malformed')
    }

    // get data
    const data = getDataFromToken(token)

    if (!data) {
        throw new UnAuthorizedError('Token is invalid')
    }

    return data
}