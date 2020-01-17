const router = require('express').Router()
const { controller } = require('./controller')

const { getProfile } = require('../../service/user/profile/profile.service')

router.get('/profile/:id', (req, res) => controller(getProfile, res, req.params['id']))

module.exports = () => router