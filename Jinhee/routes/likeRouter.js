const express = require('express')
const likeController = require('../Controllers/likeController')
const router = express.Router()
const { loginRequired } = require('../middleware/auth')

router.post('/post/:userId/:postId', loginRequired, likeController.createLike)

module.exports = {
  router,
}
