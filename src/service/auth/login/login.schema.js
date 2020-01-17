const joi = require('joi')
const { buildSchema } = require('../../../util/validator.util')

module.exports.loginSchema = buildSchema({
    
    email: joi.string().email().required(),
    
    password: joi.string().required()

})