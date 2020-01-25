const { app } = require('../../src/app')
const request = require('supertest')

/**
 * This file contains the initial setup for testing
 * the user endpoints.
 * @async
 * @returns {USer} The user object
 */
async function init () {

    // create a default user account
    const user = {
        email: 'abdallah@gmail.com',
        username: 'xUser5000',
        password: '123456789'
    }

    await request(app)
        .post('/api/public/auth/register')
        .send(user)

    const res = (await request(app)
        .post('/api/public/auth/login')
        .send({
            email: 'abdallah@gmail.com',
            password: '123456789'
        })
    ).body

    return res
}

module.exports = { init }