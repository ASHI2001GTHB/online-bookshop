const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController'); // Import controller functions

// Route to add a new book
router.post('/add', addBook);

// Route to get all books
router.get('/', getBooks);

// Route to get a book by its ID
router.get('/:id', getBookById);

// Route to update book information by ID
router.put('/:id', updateBook);

// Route to delete a book by ID
router.delete('/:id', deleteBook);

module.exports = router;
