const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const {monitor} = require('./middleware/monitor')

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/status', monitor())

// use the logger when in development only
if (process.env['NODE_ENV'] !== 'production') app.use(require('morgan')('dev'))

module.exports = { app }