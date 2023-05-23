const likeDao = require("../models/likeDao");

const createLikes = async (userId, postId) => {
  console.log(222);
  const likePosts = await likeDao.likePosts(userId, postId);
  return likePosts;
};

module.exports = { createLikes };
