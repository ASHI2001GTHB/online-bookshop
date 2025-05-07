import React, { useEffect, useState } from 'react';

const CategoryBooks = ({ category }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!category) return;

    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/books/category/${category}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, [category]);

  if (!category) return null;

  return (
    <div className="books-grid">
      <h2>{category} Books</h2>
      <div className="grid">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img src={book.coverImage} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBooks;
