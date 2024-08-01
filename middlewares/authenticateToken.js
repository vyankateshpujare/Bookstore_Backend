const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(400).json({ message: "Authorization token is required" });
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Token expired. Please signIn again" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
