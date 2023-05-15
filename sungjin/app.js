require("dotenv").config(); //환경변수

const express = require("express");
const cors = require("cors");
const logger = require("morgan"); // morgan 모듈 추가하기
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
//미들웨어
app.use(cors());
app.use(logger("combined"));
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});
const port = process.env.PORT;
app.get("/books", async (req, res) => {
  await myDataSource.query(
    `SELECT
            books.id,
            books.title,
            books.description,
            books.cover_image,
            authors.first_name,
            authors.last_name,
            authors.age
        FROM books_authors ba
        INNER JOIN authors ON ba.author_id = authors.id
        INNER JOIN books ON ba.book_id = books.id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});
app.post("/books", async (req, res) => {
  const { title, description, coverImage } = req.body;
  await myDataSource.query(
    `INSERT INTO books(
            title,
            description,
            cover_image
        ) VALUES (?, ?, ?);
        `,
    [title, description, coverImage]
  );
  res.status(201).json({ message: "successfully created" });
});
app.put("/books", async (req, res) => {
  const { title, description, coverImage, bookId } = req.body;
  await myDataSource.query(
    `UPDATE books
                SET
                    title = ?,
                    description = ?,
                cover_image = ?,
                WHERE id = ?
            `,
    [title, description, coverImage, bookId]
  );
  res.status(201).json({ message: "successfully updated" });
});
app.delete("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  await myDataSource.query(
    `DELETE FROM books
                WHERE books.id = ${bookId}
                `
  );
  res.status(204).json({ message: "successfully deleted" });
});
app.listen(port, function () {
  console.log("server listening on port ${PORT}");
});
