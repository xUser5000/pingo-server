const router = require("express").Router();

const { controller } = require("../controller");

const { getProfile } = require("../../service/user/profile/profile.service");

router.post("/profile", (req, res) =>
  controller(res)(getProfile)(req.body["ids"])
);

module.exports.userController = () => router;
