const router = require("express").Router();

const { controller } = require("../controller");

const { getProfile, searchUsers } = require("../../service/user");

router.post("/profile", (req, res) =>
  controller(res)(getProfile)(req.body["ids"])
);

router.get("/search/:query", (req, res) =>
  controller(res)(searchUsers)(req.params["query"])
);

module.exports.userController = () => router;
