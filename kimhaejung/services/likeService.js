const likeDao = require("../models/likeDao");

const jwt = require("jsonwebtoken");

const createLikes = async (token, postId) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const userId = decoded.userId;

    const likePosts = await likeDao.likePosts(userId, postId);
    return likePosts;
  } catch (err) {
    const error = new Error("FAIL_CREATE_LIKE");
    error.statusCode = 404;
    throw error;
  }
};

module.exports = { createLikes };
