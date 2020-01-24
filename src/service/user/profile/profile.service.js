const { profileSchema } = require('./profile.schema')
const { validate } = require('../../../util/validator.util')

const { NotFoundError } = require('../../error/NotFoundError')
const { InvalidInputError } = require('../../error/InvalidInputError')

const {
    findUserById
} = require('../../../database/repository/user.repo')

/**
 * @description Gets the user profile info
 * @async
 * @param {String []} ids The user ids
 * @returns {User []}
 */
module.exports.getProfile = async ids => {

    // validation
    const validationResult = await validate({ids}, profileSchema)
    if (validationResult) {
        throw new InvalidInputError('Invalid input')
    }

    // execute all the queries
    let queries =  ids.map(id => findUserById(id))

    try {

        // wait for the execution and get the results
        let result = await Promise.all(queries)

        // reduce the results array into one object
        result = result.reduce((acc, item) => {
            acc[item._id.toString()] = item
            return acc
        }, {})

        return result
    } catch (e) {
        throw new NotFoundError('Some users were not found')
    }
}