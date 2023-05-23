const { appDataSource } = require("./dataSource");

const likePosts = async (userId, postId) => {
  try {
    console.log(333);
    return await appDataSource.query(
      `
      INSERT INTO likes(
        user_id,
        post_id
        ) VALUES ( ?, ? );
      `,
      [userId, postId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { likePosts };
