const jwt = require("jsonwebtoken");

function requireLogin(req, res, next) {
  try {
    const token = req.cookies.user1;

    if (!token) {
      return res.status(401).json({
        status: "Please login",
      });
    }

    req.user = jwt.verify(token, process.env.secret);
    next();
  } catch {
    return res.status(401).json({
      status: "Invalid Token",
    });
  }
}

module.exports = requireLogin;
