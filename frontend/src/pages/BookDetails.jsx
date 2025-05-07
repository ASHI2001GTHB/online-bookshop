import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../index.css';

// Generate a random price between $10 and $100
const generateRandomPrice = () => {
  const min = 10;
  const max = 100;
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

const BookDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await res.json();
        setBook(data);

        const saleInfo = data.saleInfo;
        const isForSale = saleInfo?.saleability === 'FOR_SALE';
        const price = isForSale
          ? saleInfo.retailPrice?.amount
          : generateRandomPrice();
        setFinalPrice(price);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching book:', err);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="container">Loading book details...</p>;
  if (!book || !book.volumeInfo) return <p className="container">Book not found.</p>;

  const { volumeInfo, saleInfo } = book;
  const currency = saleInfo?.retailPrice?.currencyCode || 'USD';

  const handleAddToCart = () => {
    const item = {
      id,
      title: volumeInfo.title,
      author: volumeInfo.authors?.[0] || 'Unknown',
      price: finalPrice,
      image: volumeInfo.imageLinks?.thumbnail || '',
    };

    addToCart(item);
    alert(`${volumeInfo.title} added to cart!`);
  };

  return (
    <div className="container">
      <h2>{volumeInfo.title}</h2>
      <img
        src={volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/200'}
        alt={volumeInfo.title}
        style={{ marginBottom: '20px' }}
      />
      <p><strong>Authors:</strong> {volumeInfo.authors?.join(', ') || 'Unknown'}</p>
      <p><strong>Publisher:</strong> {volumeInfo.publisher || 'Unknown'}</p>
      <p><strong>Published Date:</strong> {volumeInfo.publishedDate || 'N/A'}</p>
      <p><strong>Categories:</strong> {volumeInfo.categories?.join(', ') || 'N/A'}</p>
      <p><strong>Description:</strong></p>
      <p>{volumeInfo.description || 'No description available.'}</p>

      <p><strong>Price:</strong> {`${currency} $${finalPrice.toFixed(2)}`}</p>
      <p><strong>Availability:</strong> {
        saleInfo?.saleability === 'FOR_SALE' ? 'Available for Sale' :
        saleInfo?.saleability === 'FREE' ? 'Free' :
        saleInfo?.saleability === 'NOT_FOR_SALE' ? 'Not Available' :
        'Unknown'
      }</p>

      <a
        href={volumeInfo.previewLink}
        target="_blank"
        rel="noreferrer"
        style={{ display: 'inline-block', marginTop: '10px' }}
      >
        Preview on Google Books
      </a>

      <div style={{ marginTop: '20px' }}>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
