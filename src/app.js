const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const { monitor } = require('./web/middleware/monitor.middle')
const { authController } = require('./web/controller/auth.controller')

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/status', monitor())

// use the logger when in development only
if (process.env['NODE_ENV'] !== 'production') app.use(require('morgan')('dev'))

// API controllers
app.use(authController())

module.exports = { app }