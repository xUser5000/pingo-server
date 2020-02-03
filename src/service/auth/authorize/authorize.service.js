const { authorizeSchema } = require('./authorize.schema')

const { InvalidInputError } = require('../../../error/InvalidInputError')
const { UnAuthorizedError } = require('../../../error/UnAuthorizedError')

module.exports.authorizeFactory =
    ({ validate, getDataFromToken }) =>
    async token => {

        // validation
        const result = await validate({token}, authorizeSchema)
        if (result) {
            throw new InvalidInputError('Please provide a well-formatted token')
        }

        // get data
        const data = getDataFromToken(token)

        if (!data) {
            throw new UnAuthorizedError('Token is invalid')
        }

        return data
}