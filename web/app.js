const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const {monitor} = require('./middleware/monitor')

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use the logger when in development only
if (process.env['NODE_ENV'] !== 'production') app.use(require('morgan')('dev'))

app.use('/status', monitor())

module.exports = { app }