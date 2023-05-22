require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { DataSource } = require("typeorm");

const port = process.env.PORT || 3000;
const app = express();

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(cors());
app.use(logger("combined"));
app.use(express.json());

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});
//2. 
app.post("/users/signup", async (req, res, next) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `
    INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "userCreated" });
});
//3.
app.post("/posts", async (req, res, next) => {
  const { title, content, userId, imageUrl } = req.body;

  await appDataSource.query(
    `
    INSERT INTO posts(
      title,
      content,
      user_id,
      image_url
    ) VALUES (?, ?, ?, ?);
    `,
    [title, content, userId, imageUrl]
  );
  res.status(201).json({ message: "postCreated" });
});
//4.
app.get("/posts", async (req, res, next) => {
  const result = await appDataSource.query(`
    SELECT
      users.id AS userId,
      users.profile_image AS userProfileImage,
      posts.id AS postingId,
      posts.image_url AS postingImageUrl,
      posts.content AS postingContent
    FROM users
    INNER JOIN posts ON users.id = posts.user_id`);

  console.log(result);
  return res.status(200).json({ data: result });
});
//5.
app.get("/users/posts/:id", async (req, res, next) => {
  const { id } = req.params;

  const usersResult = await appDataSource.query(
    `
    SELECT
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
    GROUP BY users.id
    `,
    [id]
  );
  console.log(usersResult);
  return res.status(200).json({ data: usersResult });
});
//6.
app.patch("/posts/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { content, userId } = req.body;
  await appDataSource.query(
    `
    UPDATE 
      posts 
    SET content=? 
    WHERE user_id=? AND id=?;
    `,
    [content, userId, postId]
  );

  const updatedPosts = await appDataSource.query(`
    SELECT
      users.id AS userId,
      users.name AS userName,
      posts.id AS postingId,
      posts.title AS postingTitle,
      posts.content AS postingContent
    FROM users 
    INNER JOIN posts ON posts.user_id = users.id
    WHERE users.id=${userId} AND posts.id=${postId};
      `);

  console.log(updatedPosts);
  res.status(200).json({ data: updatedPosts });
});
//7.
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const result = await appDataSource.query(`
    DELETE
    FROM posts
    WHERE id = ${id}
    `);
  console.log(result);
  res.status(200).json({ message: "PostingDeleted" });
});
//8.
app.post("/likes/users/:userId/posts/:postId", async (req, res, next) => {
  const { userId, postId } = req.params;

  const likesCreated = await appDataSource.query(`
    INSERT INTO likes(
      user_id, 
      post_id
      ) VALUES (${userId}, ${postId});
        `);
  console.log(likesCreated);
  res.status(204).json({ message: "likeCreated" });
});