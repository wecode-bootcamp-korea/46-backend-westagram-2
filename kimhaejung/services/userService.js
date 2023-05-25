const userDao = require("../models/userDao");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (name, email, password, profileImage) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImage
  );
  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.findUser(email);

  if (!user) {
    const err = new Error("INVALID_USER");
    err.statusCode = 401;
    throw err;
  }
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const err = new Error("INVALID_USE");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign({ userId: user.id }, process.env.SECRETKEY);
  return token;
};

module.exports = {
  signUp,
  signIn,
};
