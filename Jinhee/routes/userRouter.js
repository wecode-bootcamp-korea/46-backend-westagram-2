const express = require('express')
const userController = require('../Controllers/userController')
const router = express.Router()
const { loginRequired } = require('../middleware/auth')

router.post('/signup', userController.signUp)
router.get('/:userId', loginRequired, userController.getUserInfo)
router.post('/signin', loginRequired, userController.signIn)

module.exports = {
  router,
}
