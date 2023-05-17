require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
appDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.json());
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

app.listen(3000, () => {
  console.log("Example app listening on 3000");
});
