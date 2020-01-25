const request = require('supertest')
const { app } = require('../../../../src/app')

const { init } = require('../../../setup/user.setup.test')

require('../../../setup/database.setup.test')

describe('Profile route', () => {

    const BASE_URL = '/api/private/user/profile'

    it('Invalid input', async () => {

        const {token} = await init()

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

})