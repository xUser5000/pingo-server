const { Schema, model } = require("mongoose");

// comment schema
const commentSchema = new Schema({
  time: String,
  author: String,
  content: String
});

// post schema
const postSchema = new Schema({
  time: Number,
  author: String,
  content: String,
  image: String,
  likes: [String],
  comments: [commentSchema]
});

// index the content of the post
postSchema.index({ content: "text", author: "text" });

const postModel = model("post", postSchema);

module.exports = { postModel };
