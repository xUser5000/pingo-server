const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// controllers
const { authController } = require("./web/controller/auth.controller");
const { userController } = require("./web/controller/user.controller");
const { postController } = require("./web/controller/post.controller");
const { commentController } = require("./web/controller/comment.controller");
const { timelineController } = require("./web/controller/timeline.controller");

// middlewares
const { tokenAuthorizer } = require("./web/middleware/tokenAuthorizer.middle");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(compression());

// Authentication controller
app.use("/api/public/auth", authController());

// setup the token filter only for private controllers
app.use("/api/private/*", tokenAuthorizer());

// private controllers
app.use("/api/private/user", userController());
app.use("/api/private/post", postController());
app.use("/api/private/comment", commentController());
app.use("/api/private/timeline", timelineController());

module.exports = { app };
