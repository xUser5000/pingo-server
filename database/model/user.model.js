const { Schema, model } = require('mongoose')

// user schema
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    joined: Number,
    bio: String,
    avatar: String,
    posts: [String],
    followers: [String],
    following: [String]
})

module.exports = model('user', userSchema)