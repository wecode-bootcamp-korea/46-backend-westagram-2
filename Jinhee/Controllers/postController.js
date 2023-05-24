const postService = require('../services/postService')

const postUp = async (req, res) => {
  try {
    const { userId, title, content } = req.body

    if (!userId || !title || !content) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }

    await postService.postIn(userId, title, content)

    res.status(201).json({ message: 'POSTUP_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

// const postService = require('../services/postService')

const getAll = async (res) => {
  try {
    const postsData = await postService.getIn()
    return res.status(200).json({ data: postsData })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

// const postService = require('../services/postService')

const revisePost = async (req, res) => {
  try {
    const { title, content, userId, postId } = req.body

    if (!title || !content || !userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }
    await postService.updatePost(title, content, userId, postId)
    res.status(201).json({ message: 'POST_UPDATE_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
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
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

// app.post('/likes/:userId/:postId', async (req, res) => {
//   const { userId, postId } = req.params

//   await appDataSource.query(
//     `INSERT INTO likes(
//           user_id = ?
//           post_id = ?
//       ) VALUES (${userId}, ${postId});
//       `
//   )
//   res.status(200).json({ message: 'likeCreated' })
// })

// app.delete('/posts/:postId', async (req, res) => {
//   const { postId } = req.params

//   await appDataSource.query(`DELETE FROM posts WHERE posts.id = ${postId}`)

//   res.status(204).json({ message: 'successfully deleted' })
// })

module.exports = {
  postUp,
  getAll,
  revisePost,
  deletePost,
}
