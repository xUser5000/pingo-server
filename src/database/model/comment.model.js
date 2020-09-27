const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  time: String,
  userId: String,
  postId: String,
  content: String
});

const commentModel = model("comment", commentSchema);

module.exports = { commentModel };
