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

require('../../setup/database.setup.test')

describe('Profile test', () => {

    it('Validation', async () => {
        const test0 = null
        const test1 = []
        const test2 = ['']
        const test3 = ['', '']

        await expect(getProfile(test0)).to.be.rejectedWith(InvalidInputError)
        await expect(getProfile(test1)).to.be.rejectedWith(InvalidInputError)
        await expect(getProfile(test2)).to.be.rejectedWith(InvalidInputError)
        await expect(getProfile(test3)).to.be.rejectedWith(InvalidInputError)
    })

    it('User not found', async () => {
        let user = {
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        user = await saveUser(user)

        await expect(getProfile(['5e2137ca9bt29c0ea652997b']))
            .to.be.rejectedWith(NotFoundError)
    })

    it('Get profile correctly', async () => {
        let user1 = {
            email: 'abdallah@gmail.com',
            password: '123456789'
        }
        let user2 = {
            email: 'ahmed@gmail.com',
            password: '123456789'
        }
        user1 = await saveUser(user1)
        user2 = await saveUser(user2)

        await expect(getProfile([user1.id, user2.id])).to.not.be.rejected
        await expect(getProfile([user1.id, user2.id])).to.eventually.have.lengthOf(2)
        await expect(getProfile([user1.id])).to.not.be.rejected
        await expect(getProfile([user1.id])).to.eventually.have.lengthOf(1)
    })

})