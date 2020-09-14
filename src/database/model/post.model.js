const { Schema, model } = require("mongoose");

// post schema
const postSchema = new Schema({
  time: Number,
  content: String,
  image: String,
  likes: [String],
  comments: [commentSchema]
});

// comment schema
const commentSchema = new Schema({
  time: String,
  author: String,
  content: String
});

// index the content of the post
postSchema.index({ content: "text" });

const postModel = model("post", postSchema);

module.exports = { postModel };
