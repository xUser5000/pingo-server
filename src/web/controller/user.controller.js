const router = require("express").Router();

const { controller } = require("../controller");

const {
  getProfile,
  searchUsers,
  follow,
  unfollow
} = require("../../service/user");

router.post("/profile", (req, res) =>
  controller(res)(getProfile)(req.body["ids"])
);

router.get("/search/:query", (req, res) =>
  controller(res)(searchUsers)(req.params["query"])
);

router.post("/follow/:userB", (req, res) =>
  controller(res)(follow)({
    userA: req.uid,
    userB: req.params["userB"]
  })
);

router.post("/unfollow/:userB", (req, res) =>
  controller(res)(unfollow)({
    userA: req.uid,
    userB: req.params["userB"]
  })
);

module.exports.userController = () => router;
