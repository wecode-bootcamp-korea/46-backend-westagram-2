const express = require("express");

const likeController = require("../controllers/likeController");

const router = express.Router();

router.post("/postlike/:userId/:postId", likeController.postlike);
					//아이디와 포스트아이디
module.exports = {
  router,
};
