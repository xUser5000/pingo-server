const router = require('express').Router()
const { controller } = require('../controller')

const { register, login } = require('../../service/auth')

router.post('/register', (req, res) => controller(res)(register)(req.body))

router.post('/login', (req, res) => controller(res)(login)(req.body))

module.exports.authController = () => router