const userDao = require("../models/userDao");

const bcrypt = require("bcrypt");

const signUp = async (name, email, password, profileImage) => {
  const saltRounds = 12;
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const hashedPassword = await makeHash(password, saltRounds);
  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImage
  );
  return createUser;
};

module.exports = {
  signUp,
};
