const User = require("../models/user");

const isAdmin = async (req, res, next) => {
  const { id } = req.headers;
  const user = await User.findById(id);
  if (user.role !== "admin") {
    return res
      .status(400)
      .json({ message: "You are unauthorized to perform admin work" });
  }
  next();
};

module.exports = isAdmin;
