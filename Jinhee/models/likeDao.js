const appDataSource = require('./dataSource.js')

const like = async (userId, postId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO likes(
          user_id,
          post_id
      ) VALUES (?, ?);
      `,
      [userId, postId]
    )
  } catch (err) {
    const error = new Error('INVALID_LIKE UPLOADING')
    error.statusCode = 500
    throw error
  }
}

module.exports = {
  like,
}
