require("dotenv").config();     //환경변수를 설정해야하기때문에 제일 상단에 둔다

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { DataSource } = require('typeorm');


const appDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

const app = express()
 
app.use(cors());                  //미들웨어
app.use(logger('combined'));
app.use(express.json());

const port = process.env.PORT

app.get('/ping', function (req, res, next) {    //ping 엔드포인트
  res.json({message: 'userCreated'})
})
 
app.listen(port, function () {
  console.log('server listening on port 8000')
})
