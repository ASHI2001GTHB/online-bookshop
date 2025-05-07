import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import '../Home.css';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // for navigating to book details

  const categories = [
    { name: 'Fiction', color: '#8b0000' },  // dark maroon
    { name: 'Science', color: '#ff4d4d' },  // light red
    { name: 'History', color: '#e94e77' },
    { name: 'Fantasy', color: '#9b59b6' },
    { name: 'Biography', color: '#27ae60' },
    { name: 'Mystery', color: '#f39c12' },
  ];

  useEffect(() => {
    handleCategoryClick('Fiction');
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=12`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="home-container" style={{ backgroundColor: '#f8f9fa', color: '#4b0f12' }}>
      {/* Hero Section */}
      <div className="hero-box" style={{
        marginTop: '0',
        padding: '3rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(to right, #4b0f12, #8b0000)', /* dark maroon gradient */
        borderRadius: '10px',
        margin: '0rem auto',
        maxWidth: '1000px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <img src="/book.png" alt="book" style={{ width: '100px', height: '100px', marginBottom: '1rem', borderRadius: '50%'}}/>
        <h1 className="home-title" style={{ fontSize: '2.8rem', color: '#fff' }}>
          Welcome to <span style={{ color: '#ffb3b3' }}>BookNest</span>
        </h1>
        <p className="home-subtitle" style={{ fontSize: '1.2rem', color: '#f0eaea' }}>
          Your one-stop shop for amazing reads.
        </p>
      </div>

      {/* Category Navigation Bar */}
      <div className="category-navbar" style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        margin: '2rem auto'
      }}>
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === cat.name ? 'active' : ''}`}
            style={{
              backgroundColor: cat.color,
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              transform: selectedCategory === cat.name ? 'scale(1.05)' : 'scale(1)'
            }}
            onClick={() => handleCategoryClick(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Book Display Section */}
      {selectedCategory && (
        <div className="books-section" style={{ padding: '1rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="books-heading" style={{ marginBottom: '1rem', color: '#4b0f12' }}>
            Books in "{selectedCategory}"
          </h2>
          <div className="books-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1.5rem'
          }}>
            {books.length > 0 ? (
              books.map((book, index) => (
                <div
                  key={index}
                  className="book-card zoom-in"
                  onClick={() => handleBookClick(book.id)}
                  style={{
                    backgroundColor: '#fff',
                    padding: '1rem',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '0.5rem' }}
                  />
                  <h4 style={{ fontSize: '1rem', color: '#4b0f12' }}>{book.volumeInfo.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                  </p>
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="footer" style={{
        backgroundColor: '#4b0f12', /* dark maroon */
        color: '#fff',
        padding: '2rem 1rem',
        marginTop: '3rem',
        textAlign: 'center'
      }}>
        <div className="footer-content">
          <h4 style={{ fontSize: '1.4rem' }}>📚 BookNest</h4>
          <p style={{ margin: '0.5rem 0' }}>Your one-stop shop for amazing reads. Explore your next favorite book.</p>
          <p style={{ fontSize: '0.9rem' }}>© 2025 All rights reserved.</p>
          <p style={{ fontSize: '0.9rem' }}>Created by Ashini Manawasinghe</p>
        </div>
      </footer>
    </div>
  );
}
