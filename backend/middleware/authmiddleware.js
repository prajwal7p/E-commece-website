const jwt = require("jsonwebtoken");

const jwtSecret = () => process.env.JWT_SECRET || process.env.SECRET || process.env.secret;

function requireLogin(req, res, next) {
  try {
    const token = req.cookies.user1;

    if (!token) {
      return res.status(401).json({
        status: "Please login",
      });
    }

    req.user = jwt.verify(token, jwtSecret());
    next();
  } catch {
    return res.status(401).json({
      status: "Invalid Token",
    });
  }
}

module.exports = requireLogin;
