const express = require('express')
const likeController = require('../Controllers/likeController')
const router = express.Router()

router.post('/post/:userId/:postId', likeController.postLike)

module.exports = {
  router,
}
