const router = require("express").Router();
const { controller } = require("../controller");

const { createComment } = require("../../service/comment");

router.post("/create", (req, res) =>
  controller(res)(createComment)({
    userId: req.uid,
    postId: req.body.postId,
    content: req.body.content
  })
);

module.exports.commentController = () => router;
