const express = require("express");
const postController = require("../controllers/postController");
const validateToken = require("../utils/auth");

const router = express.Router();

router.post("", validateToken, postController.posting);
router.get("", postController.getAllPosts);
router.get("/users/:userId", postController.getIdPosts);
router.patch("", postController.updatedPost);
router.delete("", postController.deletedPost);

module.exports = {
  router,
};
