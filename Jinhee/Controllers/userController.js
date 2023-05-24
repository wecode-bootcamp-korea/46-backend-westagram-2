const userService = require('../services/userService')

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }

    await userService.signIn(name, email, password, profileImage)

    res.status(201).json({ message: 'SIGNUP_SUCCESS' })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId
    const usersData = await userService.getUserData(userId)
    return res.status(200).json({ data: usersData })
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

module.exports = {
  signUp,
  getUserInfo,
}
