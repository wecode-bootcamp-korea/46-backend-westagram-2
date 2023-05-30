const postDao = require('../models/postDao')

const createPost = async (userId, title, content) => {
  const createPost = await postDao.createPost(userId, title, content)
  console.log(createPost)
  return createPost
}

const getPost = async () => {
  const getPost = await postDao.getPost()
  return getPost
}

const updatePost = async (title, content, userId, postId) => {
  const updatedData = await postDao.editPost(title, content, userId, postId)
  return updatedData
}

const erasePost = async (postId) => {
  const deletedData = await postDao.deletePost(postId)
  return deletedData
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  erasePost,
}
