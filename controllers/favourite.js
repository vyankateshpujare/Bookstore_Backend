const User = require("../models/user");

const handleGetFavouriteBooksForUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid).populate("favourites");
    const favouriteBooks = user.favourites;
    return res.status(200).json({ message: "success", data: favouriteBooks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleAddBookToFavourite = async (req, res) => {
  try {
    const { bookid, userid } = req.params;
    const user = await User.findById(userid);
    const isBookFavourite = user.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }
    await User.findByIdAndUpdate(userid, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleDeleteBookFromFavourite = async (req, res) => {
  try {
    const { bookid, userid } = req.params;
    const user = await User.findById(userid);
    const isBookFavourite = user.favourites.includes(bookid);
    if (isBookFavourite) {
      await User.findByIdAndUpdate(userid, { $pull: { favourites: bookid } });
      return res
        .status(200)
        .json({ bookid: bookid, message: "Book removed from favourites" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleAddBookToFavourite,
  handleDeleteBookFromFavourite,
  handleGetFavouriteBooksForUser,
};
