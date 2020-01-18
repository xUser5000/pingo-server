const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
const expect = chai.expect

const { authorize } = require('../../../src/service/auth/authorize/authorize.service')

const { InvalidInputError } = require('../../../src/service/error/InvalidInputError')
const { UnAuthorizedError } = require('../../../src/service/error/UnAuthorizedError')

const { generateToken } = require('../../../src/util/token.util')

describe('Authorization test', () => {

    it('Malformed Token', () => {
        expect(authorize('123')).to.be.rejectedWith(InvalidInputError)
        expect(authorize('3445y.rwteyewy')).to.be.rejectedWith(InvalidInputError)
        expect(authorize('123egoung9u355i3uby')).to.be.rejectedWith(InvalidInputError)
    })

    it('Invalid token', () => {

        const data = '1234'
        let token = generateToken(data)
        token = token.replace('g', 'a')

        expect(authorize(token)).to.be.rejectedWith(UnAuthorizedError)

    })

    it('Authorize a token', async () => {
        const data = '1234'
        const token = generateToken(data)

        const result = await authorize(token)

        expect(result).to.equal(data)
    })
})