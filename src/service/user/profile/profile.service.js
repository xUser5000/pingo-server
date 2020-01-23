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
    const result = await validate({ids}, profileSchema)
    if (result) {
        throw new InvalidInputError('Invalid input')
    }

    try {
        
        // mapping all ids to queries
        let queries =  ids.map(id => () => findUserById(id))

        // execute all the queries
        let result = (await Promise.all(queries)).map(promise => {
            let obj
            obj[promise._id] = promise
            return obj
        })

        return result

    } catch (e) {
        throw new NotFoundError('Some Users not found')
    }

}