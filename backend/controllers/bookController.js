// bookController.js
const Book = require('../models/Book'); // Assuming you have a Book model

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, price, description, genre } = req.body;
    const newBook = new Book({ title, author, price, description, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: "Error adding book", error: err });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ message: "Error fetching books", error: err });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ message: "Error fetching book", error: err });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: "Error updating book", error: err });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting book", error: err });
  }
};
