const userDao = require("../models/userDao");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (name, email, password, profileImage) => {
  const saltRounds = 10;
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

const signIn = async (email, password) => {
  const user = await userDao.findUser(email);
  console.log(user.password);

  if (!user) {
    const err = new Error("INVALID_EMAIL");
    err.statusCode = 400;
    throw err;
  }
  console.log(password, user.password);
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const err = new Error("WRONG_PASSWORD");
    err.statusCode = 400;
    throw err;
  }

  const token = jwt.sign({ userId: user.id }, process.env.SECRETKEY);
  console.log(token);
  return token;
};

module.exports = {
  signUp,
  signIn,
};
