const Book = require("../models/book");

const handleGetAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: books });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ data: books });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetBookById = async (req, res) => {
  try {
    const { bookid } = req.params;
    const book = await Book.findById(bookid);
    return res.status(200).json({ message: "success", data: book });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleAddBook = async (req, res) => {
  try {
    const { url, title, author, price, description, language } = req.body;
    const book = new Book({
      url: url,
      title: title,
      author: author,
      price: price,
      description: description,
      language: language,
    });
    await book.save();
    return res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateBook = async (req, res) => {
  try {
    const { url, title, author, price, description, language } = req.body;
    const { bookid } = req.params;
    const book = await Book.findByIdAndUpdate(bookid, {
      url: url,
      title: title,
      author: author,
      price: price,
      description: description,
      language: language,
    });
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleDeleteBook = async (req, res) => {
  try {
    const { bookid } = req.params;
    const book = await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleAddBook,
  handleUpdateBook,
  handleDeleteBook,
  handleGetAllBooks,
  handleGetBookById,
  handleGetRecentBooks,
};
