const { Schema, model } = require("mongoose");

// post schema
const postSchema = new Schema({
  time: Number,
  author: String,
  content: String,
  image: String,
  likes: [String],
  comments: [String]
});

// index the content of the post
postSchema.index({ content: "text", author: "text" });

const postModel = model("post", postSchema);

module.exports = { postModel };
