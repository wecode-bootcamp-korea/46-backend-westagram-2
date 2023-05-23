const { appDataSource } = require("./dataSource");

const createUser = async (name, email, password, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
      name,
      email,
      password,
      profile_image
  ) VALUES (?, ?, ?, ?);
  `,
      [name, email, password, profileImage]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
