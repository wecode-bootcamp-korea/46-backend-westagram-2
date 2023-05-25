const postDao = require("../models/postDao");

const posting = async (title, content, userId, imageUrl) => {
  const createPost = await postDao.createPost(title, content, userId, imageUrl);
  return createPost;
};

const getAllPosts = () => {
  return postDao.getAllPosts();
};

const getUserPosts = async (userId) => {
  try {
    return postDao.getUserPosts(userId);
  } catch (err) {
    const error = new Error("COULD_NOT_GET_POST");
    error.statusCode = 404;
    throw error;
  }
};

const updatePost = async (content, userId, postId) => {
  const postUpdate = await postDao.updatePost(content, userId, postId);
  return postUpdate;
};

const deletePost = async (userId, postId) => {
  const postDelete = await postDao.deletePost(userId, postId);
  return postDelete;
};

module.exports = {
  posting,
  getAllPosts,
  getUserPosts,
  updatePost,
  deletePost,
};
