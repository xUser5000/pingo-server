const { app } = require('./src/app')
const { config } = require('dotenv')
const { connect } = require('./src/database/mongo')

// setup env vars
config()

// setup the databse
connect()
    .then(() => console.log('MongoDB connected'))
    .catch(error => { throw new Error(error) })

// setup port
const PORT = process.env['PORT'] || 3000

// start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})