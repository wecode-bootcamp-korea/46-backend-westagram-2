require("dotenv").config();

const express = require('express')
const cors = require('cors')
const logger = require('morgan'); 
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

const PORT = process.env.PORT

const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})



appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!") 
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
        appDataSource.destroy()
    })



app.get('/ping', function (req, res, next) {
  res.json({message: 'rewe'}) 
})

app.post('/users/signup', async (req, res) => {
	const { name, email, profileImage, password } = req.body
    
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
     res.status(200).json({ message : "userCreated" });
	})

app.post('/posts', async (req, res) => {
  const {userId, title, content} = req.body
      
    await appDataSource.query(
    `INSERT INTO posts(

      user_id,
      title,
      content
          
    ) VALUES (?, ?, ?);
      `,
      [userId, title, content]
    ); 
       res.status(200).json({ message : "postCreated" });
    });



  const start = async () => {
    try {
      app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
      
      }catch (err){
        console.error(err)
    }
  }

  start();


// app.listen(PORT, function () {
//   console.log('server listening on port 8000')
// })