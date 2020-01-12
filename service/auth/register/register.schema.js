const joi = require('joi')

module.exports.registerSchema = joi.object().keys({
    
    username: joi.string().required().min(6),
    
    email: joi.string().email().required(),

    password: joi.string().min(8).required()

})