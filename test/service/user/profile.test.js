const chai = require('chai')
const chaiAsPromised = require("chai-as-promised");

const { NotFoundError } = require('../../../src/service/error/NotFoundError')
const { InvalidInputError } = require('../../../src/service/error/InvalidInputError')

const { getProfile } = require('../../../src/service/user/profile/profile.service')

const {
    saveUser
} = require('../../../src/database/repository/user.repo')

chai.use(chaiAsPromised);
const expect = chai.expect;

require('../../database/mongo.test')

describe('Profile test', () => {

    it('Validation test', () => {
        const id1 = null
        const id2 = ''
        const id3 = '123456789'

        expect(getProfile(id1)).to.be.rejectedWith(InvalidInputError)
        expect(getProfile(id2)).to.be.rejectedWith(InvalidInputError)
        expect(getProfile(id3)).to.be.not.rejectedWith(InvalidInputError)
    })

    it('User not found test', async () => {
        let user = {
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        user = await saveUser(user)

        expect(getProfile('123')).to.be.rejectedWith(NotFoundError)
    })

    it('Get profile test', async () => {
        let user = {
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        user = await saveUser(user)

        expect(getProfile(user.id)).to.not.be.rejectedWith(NotFoundError)
        expect(getProfile(user.id)).to.eventually.have.property('email', user.email)
        expect(getProfile(user.id)).to.eventually.have.property('password', user.password)
        expect(getProfile(user.id)).to.eventually.have.property('email', user.email)
    })

})