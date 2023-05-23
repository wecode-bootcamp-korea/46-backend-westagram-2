const postDao = require("../models/postDao");

const posting = async (title, content, userId, imageUrl) => {
  const createPost = await postDao.createPost(title, content, userId, imageUrl);
  return createPost;
};

const getAllPosts = () => {
  return postDao.getAllPosts();
};

const getIdPosts = async (userId) => {
  try {
    return postDao.getIdPosts(userId);
  } catch (err) {
    const error = new Error("Could not get post");
    error.statusCode = 404;
    throw error;
  }
};

const updatedPost = async (content, userId, postId) => {
  const postUpdate = await postDao.updatedPost(content, userId, postId);
  return postUpdate;
};

const deletedPost = async (userId, postId) => {
  const postDelete = await postDao.deletedPost(userId, postId);
  return postDelete;
};

module.exports = {
  posting,
  getAllPosts,
  getIdPosts,
  updatedPost,
  deletedPost,
};
