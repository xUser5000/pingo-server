const { expect } = require('chai')
const { generateToken, getDataFromToken } = require('../../src/util/token.util')

describe('Token util', () => {

    it('Verify correct encoding and decoding', () => {

        const uid = '123456789';
        expect(getDataFromToken(generateToken(uid))).to.equal(uid);
        expect(getDataFromToken('sjkbguerbue')).to.equal(null)
    })

})