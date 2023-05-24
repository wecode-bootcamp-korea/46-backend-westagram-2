const express = require('express')
const userController = require('../Controllers/userController')
const router = express.Router()

router.post('/signup', userController.signUp)
router.get('/:userId', userController.getUserInfo) // 왜 :id를 :userId로 바꾸니까 되는지

module.exports = {
  router,
}
