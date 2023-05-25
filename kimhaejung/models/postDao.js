const { appDataSource } = require("./dataSource");

const createPost = async (title, content, userId, imageUrl) => {
  try {
    return await appDataSource.query(
      `
      INSERT INTO posts (
        title, 
        content,  
        user_id,
        image_url
      ) VALUES (
        ?, ?, ?, ?);
      `,
      [title, content, userId, imageUrl]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    return await appDataSource.query(`
      SELECT 
        users.id as userId, 
        users.name, 
        posts.id as postId, 
        posts.content 
        FROM posts
        INNER JOIN users ON users.id = posts.user_id `);
  } catch (err) {
    console.log(`err: ${err}`);
  }
};

const getIdPosts = async (userId) => {
  try {
    return await appDataSource.query(
      `
    SELECT
    users.id AS userId,
    users.profile_image AS userProfileImage,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        "postingId", posts.id,
        "postingImageUrl", posts.image_url,
        "postingContent", posts.content
        )
    ) AS postings
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    WHERE user_id = ?
    GROUP BY users.id
    `,
      [userId, userId]
    );
  } catch (err) {
    console.log(`err: ${err}`);
  }
};

const updatedPost = async (content, userId, postId) => {
  try {
    return await appDataSource.query(
      `
      UPDATE posts SET content= ?
      WHERE user_id= ? AND id= ?;
      `,
      [content, userId, postId]
    );
  } catch (err) {
    console.log(`err: ${err}`);
  }
};

const deletedPost = async (postId, userId) => {
  try {
    return await appDataSource.query(
      `
      DELETE FROM posts 
      WHERE posts.user_id= ? AND posts.id = ?
      `,
      [postId, userId]
    );
  } catch (err) {
    console.log(`err: ${err}`);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getIdPosts,
  updatedPost,
  deletedPost,
};
