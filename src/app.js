const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

// controllers
const { authController } = require('./web/controller/auth.controller')
const { userController } = require('./web/controller/user.controller')

// middlewares
const { monitor } = require('./web/middleware/monitor.middle')
const { tokenAuthorizer } = require('./web/middleware/tokenAuthorizer.middle')

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/status', monitor())

// use the logger when in development only
/* istanbul ignore if */
if (process.env['NODE_ENV'] === 'development') app.use(require('morgan')('dev'))

// Authentication controller
app.use('/api/auth', authController())

// Protected controllers
app.use('/api/user', tokenAuthorizer(), userController())

module.exports = { app }