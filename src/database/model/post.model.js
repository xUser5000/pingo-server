const { Schema, model } = require('mongoose')

// post schema
const postSchema = new Schema({
    time: Number,
    title: String,
    image: String,
    content: String,
    likes: [String],
    comments: [commentSchema]
})

// comment schema
const commentSchema = new Schema({
    time: String,
    author: String,
    content: String
})

const postModel = model('post', postSchema)

module.exports = { postModel }