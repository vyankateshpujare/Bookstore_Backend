const User = require("../models/user");

const handleGetUserCart = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid).populate("cart");
    const cart = user.cart.reverse();
    return res.status(200).json({ message: "Success", data: cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleAddToCart = async (req, res) => {
  try {
    const { bookid, userid } = req.params;
    const user = await User.findById(userid);
    const isAlreadyInCart = user.cart.includes(bookid);
    if (isAlreadyInCart) {
      return res.status(200).json({ message: "Book is already in cart" });
    }
    await User.findByIdAndUpdate(userid, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleRemoveFromCart = async (req, res) => {
  try {
    const { bookid, userid } = req.params;
    const user = await User.findById(userid);
    const isBookInCart = user.cart.includes(bookid);
    if (isBookInCart) {
      await User.findByIdAndUpdate(userid, { $pull: { cart: bookid } });
      return res
        .status(200)
        .json({ bookid: bookid, message: "Book removed from cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleAddToCart,
  handleRemoveFromCart,
  handleGetUserCart,
};
