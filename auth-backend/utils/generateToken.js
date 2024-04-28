const jwt = require("jsonwebtoken");

const generateJWTTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //miliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

module.exports = generateJWTTokenAndSetCookie;
