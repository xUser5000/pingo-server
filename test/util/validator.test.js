const { expect } = require('chai')
const joi = require('joi')

const { buildSchema, validate } = require('../../src/util/validator/validator.util')

describe('Validation test suite', () => {

    const schema = buildSchema({
        name: joi.string().required(),
        age: joi.number().required()
    })

    it('Correct validation', async () => {
        const obj = { name: 'Abdallah', age: 15 }
        expect(await validate(obj, schema)).to.equal(null)
    })

    it('Report validation errors', async () => {
        const obj1 = { name: '', age: 15 }
        const obj2 = { name: 'Abdallah' }
        const obj3 = { age: 15 }
        const obj4 = {}

        expect(await validate(obj1, schema)).to.be.an('array').of.length(1)
        expect(await validate(obj2, schema)).to.be.an('array').of.length(1)
        expect(await validate(obj3, schema)).to.be.an('array').of.length(1)
        expect(await validate(obj4, schema)).to.be.an('array').of.length(2)
    })

})