const postService = require("../services/postService");

const posting = async (req, res) => {
  try {
    const { title, content, userId, imageUrl } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

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

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPost = await postService.getUserPosts(userId);
    return res.status(200).json({ data: userPost });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    await postService.updatePost(content, userId, postId);
    return res.status(200).json({ message: "Post Updated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    await postService.deletePost(userId, postId);
    return res.status(204).json({ message: "Posting Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  posting,
  getAllPosts,
  getUserPosts,
  updatePost,
  deletePost,
};
