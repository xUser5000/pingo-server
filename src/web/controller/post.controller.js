const router = require("express").Router();
const { controller } = require("../controller");

const { createPost, getPost } = require("../../service/post/index");

router.post("/create", (req, res) => {
  controller(res)(createPost)({
    uid: req.uid,
    content: req.body.content,
    image: req.body.image
  });
});

router.post("/get_posts", (req, res) =>
  controller(res)(getPost)(req.body["ids"])
);

module.exports.postController = () => router;
