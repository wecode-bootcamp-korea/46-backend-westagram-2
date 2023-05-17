require("dotenv").config();

const express = require('express')
const cors = require('cors')
const logger = require('morgan'); // morgan 모듈 추가하기
const app = express()

 
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

// const port = process.env.PORT

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

app.get('/ping', function (req, res, next) {
  res.status(200).json({message: 'rewe'}) // res.json({message: 'pong'}) ==> res.status(200)으로 바꾸니까 morgan 작동함
})

app.post('/users/signup', async (req, res) => {
	const {name, email, profileImage, password} = req.body
    
	await myDataSource.query(
		`INSERT INTO users(
	
		    name,
        email,
		    profile_image,
        password

		) VALUES (?, ?, ?, ?);
		`,
		[name, email, profileImage, password]
	); 
     res.status(200).json({ message : "user created" });
	})


  // const start = async () => {
  //   try {
  //     app.listen(port, () => console.log(`Server is listening on $(port)`));
      
  //     }catch (err){
  //       console.error(err)
  //   }
  // }


app.listen(8000, function () {
  console.log('server listening on port 8000')
})