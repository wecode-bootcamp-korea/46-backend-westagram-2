const express = require('express')
const postController = require('../Controllers/postController')
const router = express.Router()

router.post('/post', postController.postUp)
router.get('/post', postController.getAll)
router.patch('/post/:postId', postController.revisePost)
router.delete('/post/:postId', postController.deletePost)

module.exports = {
  router,
}
