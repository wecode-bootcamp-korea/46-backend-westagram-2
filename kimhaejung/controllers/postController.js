const postService = require("../services/postService");

const posting = async (req, res) => {
  try {
    const { title, content, userId, imageUrl } = req.body;

    await postService.posting(title, content, userId, imageUrl);
    return res.status(201).json({
      message: "POST_CREATED",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getIdPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPost = await postService.getIdPosts(userId);
    return res.status(200).json({ data: userPost });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatedPost = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    await postService.updatedPost(content, userId, postId);
    return res.status(200).json({ message: "Post Updated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletedPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    await postService.deletedPost(userId, postId);
    return res.status(204).json({ message: "Posting Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  posting,
  getAllPosts,
  getIdPosts,
  updatedPost,
  deletedPost,
};
