const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleUserSignUp = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username length should be greater than 3" });
    }
    const existingUsername = await User.findOne({ userName: username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exist" });
    }
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exist" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "password's length should be greater than or equal to 8",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: username,
      email: email,
      password: hashPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "User successfully  created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUserSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ userName: username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials..." });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const authClaims = [
        {
          userName: user.userName,
          role: user.role,
          _id: user._id,
        },
      ];
      const token = jwt.sign({ authClaims }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "30d",
      });
      return res.status(200).json({ user: user, token: token });
    } else {
      return res.status(400).json({ message: "Invalid Credentials..." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address } = req.body;
    const user = await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserSignIn,
  handleGetUserById,
  handleUpdateUserAddress,
};
