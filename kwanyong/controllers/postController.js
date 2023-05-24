const postService = require("../services/postService");

const postsCreate = async (req, res) => {
  try {
    const { title, content, userId, imageUrl} = req.body;
    await postService.postsSignup(title, content, userId, imageUrl);
    return res.status(201).json({ message: "CREATE_POSTS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  postsCreate,
};
