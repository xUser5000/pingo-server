const router = require("express").Router();
const { controller } = require("../controller");

const { getTimeline } = require("../../service/timeline");

router.get("/get", (req, res) => controller(res)(getTimeline)(req.uid));

module.exports.timelineController = () => router;
