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

    // mapping all ids to queries
    let queries =  ids.map(id => findUserById(id))

    // execute all the queries
    try {
        let result = await Promise.all(queries)

        result = result.map(promise => {
            let obj = new Map()
            obj.set(promise['_id'].toString(), promise)
            return obj
        })

        return result
    } catch (e) {
        throw new NotFoundError('Some users were not found')
    }
}