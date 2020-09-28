const router = require("express").Router();
const { controller } = require("../controller");

const { createComment, getComment } = require("../../service/comment");

router.post("/create", (req, res) =>
  controller(res)(createComment)({
    userId: req.uid,
    postId: req.body.postId,
    content: req.body.content
  })
);

router.post("/get", (req, res) => controller(res)(getComment)(req.body["ids"]));

module.exports.commentController = () => router;
