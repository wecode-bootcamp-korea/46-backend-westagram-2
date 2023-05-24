require('dotenv').config()
const routes = require('./routes')
const http = require('http')

const cors = require('cors')
const logger = require('morgan')

const express = require('express')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(routes)

const server = http.createServer(app)
const PORT = process.env.PORT

app.get('/ping', function (req, res, next) {
  res.json({ message: 'rewe' })
})

// app.post('/users', async (req, res) => {
//   const { name, email, profileImage, password } = req.body

//   await appDataSource.query(
//     `INSERT INTO users(
// 		name,
//     email,
// 		profile_image,
//     password
// 	) VALUES (?, ?, ?, ?);
// 		`,
//     [name, email, profileImage, password]
//   )
//   res.status(200).json({ message: 'userCreated' })
// })

// app.post('/posts', async (req, res) => {
//   const { userId, title, content } = req.body

//   await appDataSource.query(
//     `INSERT INTO posts(
//       user_id,
//       title,
//       content
//     ) VALUES (?, ?, ?);
//       `,
//     [userId, title, content]
//   )
//   res.status(200).json({ message: 'postCreated' })
// })

// app.get('/posts', async (req, res) => {
//   const postsData = await appDataSource.manager.query(
//     `SELECT
//       users.profile_image as userProfileImage,
//       posts.user_id as userId,
//       posts.id as postingId,
//       posts.image_url as postingImageUrl,
//       posts.content as postingContent
//     FROM posts
//       INNER JOIN users ON posts.user_id = users.id`
//   )

//   res.status(200).json({ data: postsData })
// })

// app.get('/users/posts/:id', async (req, res) => {
//   const { id } = req.params

//   const usersResult = await appDataSource.query(
//     `SELECT
//       users.id AS userId,
//       users.profile_image AS userProfileImage,
//       JSON_ARRAYAGG(
//         JSON_OBJECT(
//             "postingId", posts.id,
//             "postingImageUrl", posts.image_url,
//             "postingContent", posts.content
//             )
//       ) AS postings
//     FROM posts
//     INNER JOIN users ON posts.user_id = users.id
//     WHERE user_id = ?
//     GROUP BY users.id
//     `,
//     [id]
//   )
//   return res.status(200).json({ data: usersResult })
// })

// app.patch(`/posts/11`, async (req, res) => {
//   const { postId, title, content, userId } = req.body

//   await appDataSource.query(
//     `UPDATE posts
//      SET title = ?,
//          content = ?
//      WHERE user_id = ? AND id = ?`,
//     [title, content, userId, postId]
//   )
//   res.status(200).json({ message: 'successfully updated' })
// })

// app.delete('/posts/:postId', async (req, res) => {
//   const { postId } = req.params

//   await appDataSource.query(`DELETE FROM posts WHERE posts.id = ${postId}`)

//   res.status(204).json({ message: 'successfully deleted' })
// })

// app.post('/likes/:userId/:postId', async (req, res) => {
//   const { userId, postId } = req.params

//   await appDataSource.query(
//     `INSERT INTO likes(
//           user_id,
//           post_id
//       ) VALUES (${userId}, ${postId});
//       `
//   )
//   res.status(200).json({ message: 'likeCreated' })
// })

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
  } catch (err) {
    console.error(err)
  }
}

start()

// app.listen(PORT, function () {
//   console.log(`server listening on port ${PORT}`)
// })
