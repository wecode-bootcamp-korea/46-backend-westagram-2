const express = require('express')
const postController = require('../Controllers/postController')
const router = express.Router()
const { loginRequired } = require('../middleware/auth')

router.post('/post', loginRequired, postController.createPost)
router.get('/post', loginRequired, postController.getAllPost)
router.patch('/post/:postId', loginRequired, postController.updatePost)
router.delete('/post/:postId', loginRequired, postController.deletePost)

module.exports = {
  router,
}
