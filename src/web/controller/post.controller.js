const router = require("express").Router();
const { controller } = require("../controller");

const {
  createPost,
  getPost,
  searchPosts,
  deletePost,
  like,
  unlike
} = require("../../service/post/index");

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

router.get("/search/:query", (req, res) =>
  controller(res)(searchPosts)(req.params["query"])
);

router.delete("/delete/:postId", (req, res) =>
  controller(res)(deletePost)(req.params.postId)
);

router.post("/like/:postId", (req, res) =>
  controller(res)(like)({ userId: req.uid, postId: req.params.postId })
);

router.delete("/unlike/:postId", (req, res) =>
  controller(res)(unlike)({ userId: req.uid, postId: req.params.postId })
);

module.exports.postController = () => router;
