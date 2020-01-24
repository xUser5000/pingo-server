const chai = require('chai')
const chaiAsPromised = require("chai-as-promised");
const { InvalidInputError } = require('../../../src/service/error/InvalidInputError')
const { ForbiddenError } = require('../../../src/service/error/ForbiddenError')
const { register } = require('../../../src/service/auth/register/register.service')
const { findUserByEmail } = require('../../../src/database/repository/user.repo')

chai.use(chaiAsPromised);
const expect = chai.expect;

require('../../setup.test')

describe('Create a new account', () => {

    it('Validation testing', async () => {
        const user1 = {
            username: '',
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        const user2 = {
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        const user3 = {
            username: 'xUser5000',
            password: '123456789'
        }
        const user4 = {
            username: 'xUser5000',
            email: 'abdallah@gmail.com',
        }
        const user5 = {
            username: '121',
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        const user6 = {
            username: 'xUser5000',
            email: 'abdallah.com',
            password: '123456789'
        }
        const user7 = {
            username: 'xUser5000',
            email: 'abdallah',
            password: '123456789'
        }
        const user8 = {
            username: 'xUser5000',
            email: 'abdallah@.com',
            password: '123456789'
        }
        const user9 = {
            username: 'xUser5000',
            email: 'abdallah@gmail.com',
            password: '123'
        }

        const user10 = {}

        expect(register(user1)).to.be.rejectedWith(InvalidInputError)
        expect(register(user2)).to.be.rejectedWith(InvalidInputError)
        expect(register(user3)).to.be.rejectedWith(InvalidInputError)
        expect(register(user4)).to.be.rejectedWith(InvalidInputError)
        expect(register(user5)).to.be.rejectedWith(InvalidInputError)
        expect(register(user6)).to.be.rejectedWith(InvalidInputError)
        expect(register(user7)).to.be.rejectedWith(InvalidInputError)
        expect(register(user8)).to.be.rejectedWith(InvalidInputError)
        expect(register(user9)).to.be.rejectedWith(InvalidInputError)
        expect(register(user9)).to.be.rejectedWith(InvalidInputError)
        expect(register(user10)).to.be.rejectedWith(InvalidInputError)
    })

    it('Email address is already in use', async () => {
        const user = {
            username: 'abdallah5000',
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        await register(user)

        expect((register(user))).to.be.rejectedWith(ForbiddenError)
    })


    it('Username address is already in use', async () => {
        const user = {
            username: 'abdallah5000',
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        await register(user)

        user.email = 'hehehe@mail.com'
        expect((register(user))).to.be.rejectedWith(ForbiddenError)
    })

    it('Create account correctly', async () => {
        const user = {
            username: 'abdallah5000',
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        const result = await register(user)
        expect(findUserByEmail(user.email)).to.eventually.not.equal(null)
        expect(result).to.has.property('username', user.username)
        expect(result).to.has.property('email', user.email)
        expect(result).to.has.property('password')
        expect(result).to.has.property('bio')
        expect(result).to.has.property('joined')
    })

})