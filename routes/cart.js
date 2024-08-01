const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  handleAddToCart,
  handleRemoveFromCart,
  handleGetUserCart,
} = require("../controllers/cart");

router.get("/get-user-cart/:userid", authenticateToken, handleGetUserCart);

router.put("/add-to-cart/:userid/:bookid", authenticateToken, handleAddToCart);

router.put(
  "/remove-from-cart/:userid/:bookid",
  authenticateToken,
  handleRemoveFromCart
);

module.exports = router;
