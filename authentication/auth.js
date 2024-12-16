const jwt = require("jsonwebtoken");
const SECRET_KEY = "interview_test";
const authentication = (req, res, next) => {
  const token = req.header["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "Access token is missing or invalid",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authentication;
