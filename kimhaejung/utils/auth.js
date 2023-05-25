const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).send("Invalid_Access_Token");
    }

    const decoded = await jwt.verify(token, process.env.SECRETKEY);
    console.log(decoded);
    req.user = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Checked_Token" });
  }
};

module.exports = validateToken;
