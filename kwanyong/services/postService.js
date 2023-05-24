const postDao = require("../models/postDao");

const postsSignup = async (title, content, imgUrl) => {
  try {
    const createPosts = await postDao.createPosts(title, content, imgUrl);
    return createPosts;
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = {
  postsSignup,
};
