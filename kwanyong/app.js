require("dotenv").config();   //.env 내용을 가져온다

const http = require("http");         //사용할 모듈을 변수에 담는다
const express = require('express');   //express라는 모듈을 express변수에 정의한다
const cors = require('cors');         //웹 통신에 대한 규약을 변수로 정의
const logger = require('morgan');     //morgan log히스토리등을 나오게끔 해주는 모듈


const routes = require("./routes");   //./routes를 불러오는 메서드를 변수에 담는다

const app = express();    //익스프레스메서드를 앱변수에 담는다

app.use(cors());
app.use(logger('dev'));
app.use(express.json());    //json이란 자바스크립트오브젝트노테이션 데이터를 저장하고 전송하기 위한 경량의 데이터 교환 형식
app.use(routes);            //라우터를 사용한다

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const server = http.createServer(app);    //서버를 제어하고 사용
const PORT = process.env.PORT;            //포트

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));   //서버가 정상작동시 콘솔로그로 포트번호와함께 출력
  } catch (err) {
    console.error(err);         //에러시 에러
  }
};

start();            //시작메서드