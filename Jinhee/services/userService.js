const userDao = require('../models/userDao')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { catchAsync } = require('../middleware/error')

const signIn = catchAsync(async (email, password) => {
  const user = await userDao.signUser(email)
  if (!user || user.length === 0) {
    throw new Error('INVALID EMAIL')
  }
  const match = await bcrypt.compare(password, user[0].password)

  if (!match) {
    throw new Error('INVALID_PASSWORD')
  }
  const accessToken = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  return accessToken
})

const signUp = catchAsync(async (name, email, password, profileImage) => {
  const emailValidation = new RegExp('^.{6,}@(?:(?:naver).com)$')
  if (!emailValidation.test(email)) {
    const err = new Error('이메일 양식이 올바르지 않습니다')
    err.statusCode = 400
    throw err
  }

  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  )
  if (!pwValidation.test(password)) {
    const err = new Error('비밀번호 양식이 올바르지 않습니다')
    err.statusCode = 400
    throw err
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const user = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImage
  )

  return user
})

const getUserData = catchAsync(async (userId) => {
  const userPost = await userDao.getUser(userId)
  return userPost
})

module.exports = {
  signUp,
  getUserData,
  signIn,
}
