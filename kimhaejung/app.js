require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { DataSource } = require("typeorm");

const port = process.env.PORT || 3000;

const app = express();

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

app.post("/posts", async (req, res, next) => {
  const { title, content, userId, imageUrl } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
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

app.get("/posts/look", async (req, res, next) => {
  await appDataSource.query(
    `SELECT
      users.id as userId,
      users.profile_image as userProfileImage,
      posts.id as postingId,
      posts.image_url as postingImageUrl,
      posts.content as postingContent
      FROM users
      INNER JOIN posts ON users.id = posts.user_id`,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

app.get("/users/posts/look/:id", (req, res, next) => {
  const { id } = req.params;

  appDataSource.query(
    `SELECT
      users.id as userId,
      users.profile_image as userProfileImage,
      posts.id as postingId,
      posts.image_url as postingImageUrl,
      posts.content as postingContent
    FROM users
    INNER JOIN posts ON users.id = posts.user_id
    WHERE users.id = ${id}`,
    (err, rows) => {
      if (err) {
        return next(err);
      }

      const postings = rows.map((row) => ({
        postingId: row.postingId,
        postingImageUrl: row.postingImageUrl,
        postingContent: row.postingContent,
      }));

      const result = {
        userId: rows[0].userId,
        userProfileImage: rows[0].userProfileImage,
        postings: postings,
      };

      res.status(200).json({ data: result });
    }
  );
});

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
