const request = require('supertest')
const { app } = require('../../../../src/app')

const { init } = require('../../../setup/user.setup.test')

require('../../../setup/database.setup.test')

describe('Profile route', async () => {

    const BASE_URL = '/api/private/user/profile'
    const {token, _id} = await init()

    it('Invalid input', async () => {

        await request(app)
            .post(BASE_URL)
            .set('x-auth-token', token)
            .expect(400)

        await request(app)
            .post(BASE_URL)
            .set('x-auth-token', token)
            .send({ids: []})
            .expect(400)

        await request(app)
            .post(BASE_URL)
            .set('x-auth-token', token)
            .send({ids: ['']})
            .expect(400)
    })

    it('User Not found', done => {
        request(app)
            .post(BASE_URL)
            .set('x-auth-token', token)
            .send({ids: ['sghehrtj']})
            .expect(404, done)
    })

    it('Get the user correctly', done => {
        request(app)
            .post(BASE_URL)
            .set('x-auth-token', token)
            .send({ ids: [_id] })
            .expect(200, done)
    })

})