const joi = require('joi')
const { buildSchema } = require('../../../util/validator.util')

module.exports.profileSchema = buildSchema({

    id: joi.string().required()

})