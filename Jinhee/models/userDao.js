const appDataSource = require('./dataSource.js')

const signUser = async (email) => {
  try {
    const userInfo = await appDataSource.query(
      `SELECT
       id,
       email, 
       password 
       FROM users 
       WHERE email = ?`,
      [email]
    )
    return userInfo
  } catch (err) {
    const error = new Error(err)
    error.statusCode = 400
    throw error
  }
}

const createUser = async (name, email, password, profileImage) => {
  try {
    const existingUser = await appDataSource.query(
      `SELECT email FROM users WHERE email = ?`,
      [email]
    )

    if (existingUser.length > 0) {
      const error = new Error('이미 존재하는 이메일입니다')
      error.statusCode = 400
      throw error
    }

    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        profile_image
      ) VALUES (?, ?, ?, ?);`,

      [name, email, password, profileImage]
    )
  } catch (err) {
    if (err.message === '이미 존재하는 이메일입니다') {
      throw err
    } else {
      const error = new Error('INVALID_DATA_INPUT')
      error.statusCode = 400
      throw error
    }
  }
}

const getUser = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
        users.id AS userId,
        users.profile_image AS userProfileImage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
              "postingId", posts.id,
              "postingImageUrl", posts.image_url,
              "postingContent", posts.content
              )
        ) AS postings
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      WHERE user_id = ?
      GROUP BY users.id`,
      [userId]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_SHOW')
    error.statusCode = 400
    throw error
  }
}

module.exports = {
  createUser,
  getUser,
  signUser,
}
