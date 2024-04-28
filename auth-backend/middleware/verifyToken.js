const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token not provided !!",
    });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid Token !!",
        });
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid Token !!",
    });
  }
};

module.exports = verifyToken;
