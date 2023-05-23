require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const http = require("http");
const routes = require("./routes");
const { appDataSource } = require("./models/dataSource");
const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    appDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error occurred during Data Source initialization", err);
        myDataSource.destroy();
      });

    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
