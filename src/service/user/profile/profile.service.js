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
 * @param {String} id The user id
 * @returns {User}
 */
module.exports.getProfile = async id => {

    // validation
    const result = await validate({id}, profileSchema)
    if (result) {
        throw new InvalidInputError('Invalid input')
    }

    try {
        
        // find the user
        const user = await findUserById(id)

        // return the user
        return user

    } catch (e) {
        throw new NotFoundError('User not found')
    }

}