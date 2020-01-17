const chai = require('chai')
const chaiAsPromised = require("chai-as-promised");

const { NotFoundError } = require('../../../src/service/error/NotFoundError')
const { InvalidInputError } = require('../../../src/service/error/InvalidInputError')
const { login } = require('../../../src/service/auth/login/login.service')
const { register } = require('../../../src/service/auth/register/register.service')

chai.use(chaiAsPromised);
const expect = chai.expect;

require('../../database/mongo.test')

describe('Login test', async () => {

    it('Validation testing', () => {
        const user1 = { email: '', password: '' }
        const user3 = { email: 'abdallah@gmail.com', password: '' }
        const user4 = { email: 'abdallah@gmail.com' }
        const user6 = { email: 'abdallah@.com', password: '123456789' }
        const user7 = { email: 'abdallah', password: '123456789' }
        const user8 = { email: '', password: '123456789' }
        const user9 = { password: '123456789' }
        const user10 = {}

        expect(login(user1)).to.be.rejectedWith(InvalidInputError)
        expect(login(user3)).to.be.rejectedWith(InvalidInputError)
        expect(login(user4)).to.be.rejectedWith(InvalidInputError)
        expect(login(user6)).to.be.rejectedWith(InvalidInputError)
        expect(login(user7)).to.be.rejectedWith(InvalidInputError)
        expect(login(user8)).to.be.rejectedWith(InvalidInputError)
        expect(login(user9)).to.be.rejectedWith(InvalidInputError)
        expect(login(user10)).to.be.rejectedWith(InvalidInputError)
    })

    it('Did not find the user', async () => {
        const user = { email: 'abdallah@gmail.com', password: '1234567890' }
        expect(login(user)).to.be.rejectedWith(NotFoundError)
    })

    it('Password is not correct', async () => {
        const user = { email: 'abdallah@gmail.com', password: '123456789' }
        await register({...user, username: '3by9nv9nbv'})

        expect(login({ email: 'abdallah@gmail.com', password: '123' }))
            .to.be.rejectedWith(NotFoundError)
    })

    it('Login correctly', async () => {
        const user = {
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        const document = await register({
            ...user,
            username: 'abdallah500'
        })

        const result = await login(user)

        expect(result).to.have.property('user')
        expect(result).to.have.property('token')
        expect(result.token).to.be.a('string')
    })

})