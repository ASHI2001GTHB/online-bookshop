import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../index.css';

// Function to generate random price between a given range
const generateRandomPrice = (min = 5, max = 50) => {
  return (Math.random() * (max - min) + min).toFixed(2); // Random price between min and max
};

const BookCard = ({ id, title, author, image }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const price = generateRandomPrice(); // Generate random price

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent navigation
    addToCart({ id, title, author, price, image });
    alert(`${title} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>
        Price: ${price} {/* Display random price */}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  );
};

export default BookCard;
