const likeDao = require('../models/likeDao')

const updateLike = async (userId, postId) => {
  const updatedLike = await likeDao.like(userId, postId)
  return updatedLike
}

module.exports = {
  updateLike,
}
