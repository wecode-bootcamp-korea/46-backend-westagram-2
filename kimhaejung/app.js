require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { DataSource } = require("typeorm");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(logger("combined"));

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

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
