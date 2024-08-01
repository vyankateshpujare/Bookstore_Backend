const router = require("express").Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  handleAddBookToFavourite,
  handleDeleteBookFromFavourite,
  handleGetFavouriteBooksForUser,
} = require("../controllers/favourite");

router.get(
  "/get-favourite-books/:userid",
  authenticateToken,
  handleGetFavouriteBooksForUser
);

router.put(
  "/add-book-to-favourite/:userid/:bookid",
  authenticateToken,
  handleAddBookToFavourite
);

router.put(
  "/remove-book-from-favourite/:userid/:bookid",
  authenticateToken,
  handleDeleteBookFromFavourite
);

module.exports = router;
