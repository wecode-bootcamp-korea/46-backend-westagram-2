const likeService = require('../services/likeService')

const createLike = async (req, res) => {
  try {
    const { userId, postId } = req.params
    await likeService.updateLike(userId, postId)

    res.status(201).json({ message: 'POSTUP_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

module.exports = {
  createLike,
}
