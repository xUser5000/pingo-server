const router = require('express').Router()
const { controller } = require('../controller')

const { register } = require('../../service/auth/register/register.service')
const { login } = require('../../service/auth/login/login.service')

router.post('/register', (req, res) => controller(res)(register)(req.body))

router.post('/login', (req, res) => controller(res)(login)(req.body))

module.exports.authController = () => router