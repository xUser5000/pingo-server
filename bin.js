const { app } = require('./web/app')
const { config } = require('dotenv')

// setup env vars
config()

// setup port
const PORT = process.env['PORT'] || 3000

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})