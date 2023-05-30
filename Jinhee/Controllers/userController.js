const userService = require('../services/userService')

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }
    await userService.signIn(email, password)
    const accessToken = await userService.signIn(email, password)
    res.status(200).json({ message: accessToken })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 400).json({ message: err.message })
  }
}

const signUp = async (req, res) => {
  try {
    const {
      name = 'default',
      email,
      password,
      profileImage = 'default',
    } = req.body

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }
    await userService.signUp(name, email, password, profileImage)
    res.status(200).json({ message: 'SIGNUP_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 400).json({ message: err.message })
  }
}

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId
    const usersData = await userService.getUserData(userId)
    return res.status(200).json({ data: usersData })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 400).json({ message: err.message })
  }
}

module.exports = {
  signUp,
  getUserInfo,
  signIn,
}
