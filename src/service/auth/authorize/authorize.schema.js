const joi = require('joi')
const { buildSchema } = require('../../../util/validator.util')

module.exports.authorizeSchema = buildSchema({
    token: joi
            .string()
            .regex(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/)
            .required()
})