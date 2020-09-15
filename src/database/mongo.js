const mongoose = require("mongoose");

// config mongoose
mongoose.Promise = global.Promise;

// DB config
const URI = process.env["DB_URI"];

const connect = () =>
  mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });

module.exports = { connect };
