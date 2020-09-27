const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  time: String,
  author: String,
  content: String
});

const commentModel = model("comment", commentSchema);

module.exports = { commentModel };
