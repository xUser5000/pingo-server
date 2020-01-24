const request = require('supertest')
const { app } = require('../../../../src/app')

require('../../../setup.test')

describe('Register Route', () => {

    const BASE_URL = '/api/auth/register'
    const VALID_USER = {
        username: 'xUser5000',
        email: 'abdallah@gmail.com',
        password: '123456789'
    }

    it('Invalid input', done => {
        request(app)
            .post(BASE_URL)
            .send({})
            .expect(400, done)
    })

    it('Email is already in use', done => {
        request(app)
            .post(BASE_URL)
            .send(VALID_USER)
            .then(() => {
                request(app)
                    .post(BASE_URL)
                    .send(VALID_USER)
                    .expect(403, done)
            })
    })

    it('Username is already in use', done => {
        request(app)
            .post(BASE_URL)
            .send(VALID_USER)
            .then(() => {
                request(app)
                    .post(BASE_URL)
                    .send({
                        ...VALID_USER,
                        email: 'ahmed@gmail.com'
                    })
                    .expect(403, done)
            })
    })

    it('Sign up correctly', done => {
        request(app)
            .post(BASE_URL)
            .send(VALID_USER)
            .expect(200, done)
    })

})