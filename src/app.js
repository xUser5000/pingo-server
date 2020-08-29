const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// controllers
const { authController } = require("./web/controller/auth.controller");
const { userController } = require("./web/controller/user.controller");

// middlewares
const { tokenAuthorizer } = require("./web/middleware/tokenAuthorizer.middle");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

// use the logger when in development only
/* istanbul ignore if */
if (process.env["NODE_ENV"] === "development")
  app.use(require("morgan")("dev"));

// Authentication controller
app.use("/api/public/auth", authController());

// setup the token filter only for private controllers
app.use("/api/private/*", tokenAuthorizer());

// private controllers
app.use("/api/private/user", userController());

module.exports = { app };
