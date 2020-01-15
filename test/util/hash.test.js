const { expect } = require('chai')
const { hash, match } = require('../../src/util/hash.util')

describe('Hashing util test suite', () => {

    const password = '123456789'

    it('Hashing passwords', () => {
        const h = hash(password)
        expect(h).to.be.a('string').and.to.have.lengthOf(60)
    })

    it('Matching passwords with hashes', () => {
        const h = hash(password)
        expect(match(password, h)).to.equal(true)
    })

})