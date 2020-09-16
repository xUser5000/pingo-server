const router = require("express").Router();
const { controller } = require("../controller");

const { createPost } = require("../../service/post/index");

router.post("/create", (req, res) => {
  controller(res)(createPost)({
    uid: req.uid,
    content: req.body.content,
    image: req.body.image
  });
});

module.exports.postController = () => router;
