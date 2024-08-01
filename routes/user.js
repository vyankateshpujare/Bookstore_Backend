const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  handleUserSignUp,
  handleUserSignIn,
  handleGetUserById,
  handleUpdateUserAddress,
} = require("../controllers/user");

router.get("/:id", authenticateToken, handleGetUserById);
router.post("/sign-up", handleUserSignUp);
router.post("/sign-in", handleUserSignIn);
router.put("/update-address/:id", authenticateToken, handleUpdateUserAddress);

module.exports = router;
