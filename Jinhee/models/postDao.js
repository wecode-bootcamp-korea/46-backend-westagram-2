const appDataSource = require('./dataSource.js')

const createPost = async (userId, title, content) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
		    user_id,
		    title,
		    content
		) VALUES (?, ?, ?);
		`,
      [userId, title, content]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT')
    error.statusCode = 500
    throw error
  }
}

const getPost = async () => {
  try {
    return await appDataSource.query(
      `SELECT
      users.profile_image as userProfileImage,
      posts.user_id as userId,
      posts.id as postingId,
      posts.image_url as postingImageUrl,
      posts.content as postingContent
    FROM posts
      INNER JOIN users ON posts.user_id = users.id`
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_POSTS')
    error.statusCode = 500
    throw error
  }
}

const editPost = async (title, content, userId, postId) => {
  try {
    return await appDataSource.query(
      `UPDATE posts
         SET title = ?,
            content = ?
         WHERE user_id = ? AND id = ?`,
      [title, content, userId, postId]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_EDIT')
    error.statusCode = 500
    throw error
  }
}

const deletePost = async (postId) => {
  try {
    return await appDataSource.query(
      `DELETE FROM posts WHERE posts.id = ${postId}`,
      [postId]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_DELETE')
    error.statusCode = 500
    throw error
  }
}

module.exports = {
  createPost,
  getPost,
  editPost,
  deletePost,
}
