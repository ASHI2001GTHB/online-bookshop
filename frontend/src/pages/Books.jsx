// src/pages/Books.jsx
import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import '../index.css';

const Books = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendedBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setError('');
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
      );
      const data = await response.json();
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
        setError('No books found.');
      }
    } catch (err) {
      setError('Error fetching books. Please try again.');
    }
  };

  const fetchRecommendedBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=12`
      );
      const data = await response.json();
      setRecommended(data.items || []);
    } catch (err) {
      console.error('Error fetching recommended books:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchBooks();
    }
  };
  return (
    <div className="container">
      <h2>Search Books</h2>
      <form onSubmit={handleSearch} className="book-search-form">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {books.length > 0 && (
        <>
          <h3>Search Results</h3>
          <div className="book-grid">
            {books.map((book) => {
              if (!book?.volumeInfo) return null;
              const price = book.saleInfo?.retailPrice?.amount;
              const currency = book.saleInfo?.retailPrice?.currencyCode || 'USD';
              return (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.volumeInfo.title}
                  author={book.volumeInfo.authors?.[0] || 'Unknown'}
                  price={price ? `${currency} $${price}` : 'N/A'}
                  image={book.volumeInfo.imageLinks?.thumbnail}
                />
              );
            })}
          </div>
        </>
      )}

      <h3 style={{ marginTop: '2rem' }}>📚 Recommended Books</h3>
      <div className="book-grid">
        {recommended.map((book) => {
          if (!book?.volumeInfo) return null;

          const price = book.saleInfo?.retailPrice?.amount;
          const currency = book.saleInfo?.retailPrice?.currencyCode || 'USD';

          return (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors?.[0] || 'Unknown'}
              price={price ? `${currency} $${price}` : 'N/A'}
              image={book.volumeInfo.imageLinks?.thumbnail}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Books;
