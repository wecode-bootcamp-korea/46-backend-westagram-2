const appDataSource = require('./dataSource.js')

const createUser = async (name, email, password, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
      [name, email, password, profileImage]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT')
    error.statusCode = 500
    throw error
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
    error.statusCode = 500
    throw error
  }
}

module.exports = {
  createUser,
  getUser,
}
