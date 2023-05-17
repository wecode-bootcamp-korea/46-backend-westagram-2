require("dotenv").config();     

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
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

const app = express()
 
app.use(cors());                  
app.use(logger('combined'));
app.use(express.json());

const port = process.env.PORT

app.get('/ping', function (req, res, next) {   
  res.json({message: 'userCreated'})
})

app.post('/users', async (req, res) => {
	const { name, email, profileImage, password} = req.body
    
	await appDataSource.query(
		`INSERT INTO users(
		    name,
		    email,
		    profile_image,
        password
		) VALUES (?, ?, ?, ?);
		`,
		[ name, email, profileImage, password ]
	); 
     res.status(201).json({ message : "successfully created" });
	})
 
app.listen(port, function () {
  console.log('server listening on port 8000')
})
