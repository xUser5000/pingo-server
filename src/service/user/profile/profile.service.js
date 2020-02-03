const { profileSchema } = require('./profile.schema')

const { NotFoundError } = require('../../../error/NotFoundError')
const { InvalidInputError } = require('../../../error/InvalidInputError')

module.exports.getProfileFactory =
    ({ validate, findUserById }) =>
    async ids => {

        // validation
        const validationResult = await validate({ids}, profileSchema)
        if (validationResult) {
            throw new InvalidInputError('Invalid input')
        }

        // execute all the queries
        let queries =  ids.map(id => findUserById(id))

        try {

            // wait for the execution and return the results
            return await Promise.all(queries)

        } catch (e) {
            throw new NotFoundError('Some users were not found')
        }
}