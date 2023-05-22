require("dotenv").config();     

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { DataSource } = require('typeorm');
const { error } = require("console");



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
app.use(logger('dev'));
app.use(express.json());


app.get('/ping', function (req, res, next) {   
  res.json({message: 'userCreated'})
})

//2.유저회원가입
app.post('/users/signup', async (req, res) => {
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

  //3.게시글등록하기
  app.post('/posts', async (req, res) => {
    const { title, content, userId, imageUrl } = req.body
    await appDataSource.query(
      `INSERT INTO posts(
          title,
          content,
          user_id,
          image_url
      ) VALUES (?, ?, ?, ?);
      `,
      [ title, content, userId, imageUrl ]
    ); 
      res.status(201).json({ message : "postCreated" });
    });

    //4.전체 게시글 조회하기
    app.get("/postsNusers", async(req, res) => {
    await appDataSource.query(
    `SELECT 
              u.id as userId,
              u.profile_image,
              p.id,
              p.image_url,
              p.content           
              from posts as p inner join users as u on u.id = p.user_id;
              `);
      res.status(200).json({data : rows});
  });

  //5. 유저의 게시글 조회하기
  app.get('/users/posts', async (req, res) => {
    const { userId } = req.query;
  
    const userInfo = await appDataSource.query(
      `
      SELECT 
        u.id,
        u.name,
        u.profile_image AS profileImage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postId", p.id,
            "title", p.title,
            "content", p.content
          )
        ) as postings
      FROM users u
      JOIN posts p ON u.id = p.user_id
      WHERE u.id = ?
    `,
      [userId]
    );
    res.status(200).json({ data: userInfo });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log('server listening on port',port)
  })
