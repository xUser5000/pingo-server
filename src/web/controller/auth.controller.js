const router = require('express').Router()
const { controller } = require('./controller')

const { register } = require('../../service/auth/register/register.service')

router.post('/register', (req, res) => controller(register, res, req.body))

module.exports.authController = () => router