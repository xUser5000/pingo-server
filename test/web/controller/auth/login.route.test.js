const request = require('supertest')
const { app } = require('../../../../src/app')

require('../../../setup/database.setup.test')

describe('Login route', () => {

    const LOGIN_BASE_URL = '/api/public/auth/login'
    const REGISTER_BASE_URL = '/api/public/auth/register'
    const VALID_REGISTER_USER = {
        username: 'xUser5000',
        email: 'abdallah@gmail.com',
        password: '123456789'
    }
    const VALID_LOGIN_USER = {
        email: 'abdallah@gmail.com',
        password: '123456789'
    }

    it('Invalid input', done => {
        request(app)
            .post(LOGIN_BASE_URL)
            .send({})
            .expect(400, done)
    })

    it('Email is incorrect', done => {
        request(app)
            .post(REGISTER_BASE_URL)
            .send(VALID_REGISTER_USER)
            .then(() => {
                request(app)
                    .post(LOGIN_BASE_URL)
                    .send({
                        email: 'ahmed@gmail.com',
                        password: VALID_LOGIN_USER.password
                    })
                    .expect(404, done)
            })
    })

    it('Password is incorrect', done => {
        request(app)
            .post(REGISTER_BASE_URL)
            .send(VALID_REGISTER_USER)
            .then(() => {
                request(app)
                    .post(LOGIN_BASE_URL)
                    .send({
                        email: VALID_LOGIN_USER.email,
                        password: '12345'
                    })
                    .expect(404, done)
            })
    })

    it('Correct login', done => {
        request(app)
            .post(REGISTER_BASE_URL)
            .send(VALID_REGISTER_USER)
            .then(() => {
                request(app)
                    .post(LOGIN_BASE_URL)
                    .send(VALID_LOGIN_USER)
                    .expect(200, done)
            })
    })

})