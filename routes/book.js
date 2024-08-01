const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const isAdmin = require("../middlewares/isAdmin");
const {
  handleAddBook,
  handleUpdateBook,
  handleDeleteBook,
  handleGetAllBooks,
  handleGetBookById,
  handleGetRecentBooks,
} = require("../controllers/book");

router.get("/", handleGetAllBooks);

router.get("/get-recent-books", handleGetRecentBooks);

router.get("/:bookid", handleGetBookById);

router.post("/add-book", authenticateToken, isAdmin, handleAddBook);

router.put(
  "/update-book/:bookid",
  authenticateToken,
  isAdmin,
  handleUpdateBook
);

router.delete(
  "/delete-book/:bookid",
  authenticateToken,
  isAdmin,
  handleDeleteBook
);

module.exports = router;
