const { registerSchema } = require('./register.schema')
const { validate } = require('../../../util/validator/validator.util')
const { hash } = require('../../../util/hash/hash.util')
const { InvalidInputError } = require('../../error/InvalidInputError')
const { ForbiddenError } = require('../../error/ForbiddenError')
const {
    findUserByEmail,
    findUserByUsername,
    saveUser
} = require('../../../database/repository/user.repo')

/**
 * @description Creates a new user account
 * @async
 * @param {User} req The request object
 * @returns {User} The new account
 */
module.exports.register = async req => {
    
    // validation
    const result = await validate(req, registerSchema);
    if (result) {
        throw new InvalidInputError(result)
    }

    // look for users with same email address
    if (await findUserByEmail(req['email'])) {
        throw new ForbiddenError('Email address is already in use');
    }

    // look for users with same username
    if (await findUserByUsername(req['username'])) {
        throw new ForbiddenError('Username is already in use');
    }

    // hash the password
    req['password'] = hash(req.password)

    // add a default bio
    req['bio'] = 'I am a new Pingo user'

    // save the user document
    return (await saveUser(req));

}