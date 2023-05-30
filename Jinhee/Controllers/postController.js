const postService = require('../services/postService')

const createPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body

    if (!userId || !title || !content) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }

    await postService.postIn(userId, title, content)

    res.status(201).json({ message: 'POSTUP_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 400).json({ message: err.message })
  }
}

const getAllPost = async (res) => {
  try {
    const postsData = await postService.getPost()
    return res.status(200).json({ data: postsData })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 400).json({ message: err.message })
  }
}

const updatePost = async (req, res) => {
  try {
    const { title, content, userId, postId } = req.body

    if (!title || !content || !userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }
    await postService.updatePost(title, content, userId, postId)
    res.status(201).json({ message: 'POST_UPDATE_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 400).json({ message: err.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params
    console.log(postId)

    if (!postId) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }
    await postService.erasePost(postId)
    res.status(201).json({ message: 'POST_DELETE_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 400).json({ message: err.message })
  }
}

module.exports = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
}
