const likeService = require("../services/likeService");

const createLikes = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await likeService.createLikes(userId, postId);
    return res.status(200).json({ message: "LIKE_CREATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { createLikes };
