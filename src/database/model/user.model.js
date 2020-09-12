const { Schema, model } = require("mongoose");

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
});

userSchema.index(
  {
    username: "text",
    bio: "text"
  },
  {
    weights: {
      name: 3,
      bio: 1
    }
  }
);

const userModel = model("user", userSchema);

module.exports = { userModel };
