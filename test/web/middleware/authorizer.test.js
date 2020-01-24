const request = require('supertest')
const { app } = require('../../../src/app')
const { generateToken } = require('../../../src/util/token.util')

describe('Token Authorizer Middleware', () => {

    it('Invalid token', done => {
        request(app)
            .get('/api/user/anything')
            .expect(400, done)
    })

    it('Valid token', done => {
        request(app)
            .get('/api/user/anything')
            .set('x-auth-token', generateToken('123'))
            .expect(404, done)
    })
})