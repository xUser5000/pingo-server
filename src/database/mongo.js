const mongoose = require('mongoose')

// config mongoose promises
mongoose.Promise = global.Promise

// DB config
const URI = process.env['DB_URI'] || 'mongodb://localhost/pingo'

const connect = () =>
    mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })

module.exports = { connect }