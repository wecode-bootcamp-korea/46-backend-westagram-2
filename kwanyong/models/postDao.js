const { myDataSource } = require("./dataSource");

const createPosts = async ( title, content, userId, imageUrl ) => {
    try {
      return await myDataSource.query(
        `
          INSERT INTO posts (
            title,
            content,
            user_id,
            image_url
          ) VALUES
          (?, ?, ?, ?);
          `,
        [ title, content, userId, imageUrl ]
      );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};
module.exports = {
  createPosts,
};
