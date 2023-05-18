require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { DataSource } = require("typeorm");

const port = process.env.PORT || 3000;

const app = express();

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});

app.use(cors());
app.use(logger("combined"));
app.use(express.json());

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

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

app.post("/users/signup", async (req, res, next) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
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

//
app.patch("/posts/:userId/:postId", async (req, res, next) => {
  const { userId, postId } = req.params;
  const { content } = req.body;
  await appDataSource.query(
    ` UPDATE 
    posts 
    SET content=? 
    WHERE user_id=${userId} AND id=${postId};
    `,
    [content]
  );

  const updatedPosts = await appDataSource.query(
    `SELECT
        users.id AS userId,
        users.name AS userName,
        posts.id AS postingId,
        posts.title AS postingTitle,
        posts.content AS postingContent
        FROM users 
        INNER JOIN posts 
        ON posts.user_id = users.id
        WHERE users.id=${userId} AND posts.id=${postId};
      `
  );

  console.log(updatedPosts);
  res.status(200).json({ data: updatedPosts });
});

app.delete("/posts/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await appDataSource.query(
    `DELETE
    FROM posts
    WHERE id = ${id}
    `
  );
  console.log(result);
  res.status(200).json({ message: "PostingDeleted" });
});

app.post("/likes/:userId/:postId", async (req, res, next) => {
  const { userId, postId } = req.params;

  const likesCreated = await appDataSource.query(
    `INSERT INTO likes(
            user_id, 
            post_id
        ) VALUES (${userId}, ${postId});
        `
  );
  console.log(likesCreated);
  res.status(200).json({ message: "likeCreated" });
});
