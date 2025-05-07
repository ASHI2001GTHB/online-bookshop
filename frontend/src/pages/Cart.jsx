import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(cart.map(item => item.id));

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const total = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    return selectedItems.includes(item.id) && !isNaN(price)
      ? acc + price * item.quantity
      : acc;
  }, 0);

  return (
    <div style={{ backgroundColor: '#f0f6ff', minHeight: '100vh', padding: '2rem' }}>
      <div className="container" style={{ position: 'relative' }}>
        <h2 style={{ color: '#003366', marginBottom: '1rem' }}>🛒 Your Cart</h2>

        {selectedItems.length > 0 && (
          <button
            onClick={() => navigate('/checkout')}
            style={{
              position: 'absolute',right: '0',top: '0',backgroundColor: '#0066cc',color: '#fff',
              padding: '10px 20px',borderRadius: '8px',fontWeight: 'bold', cursor: 'pointer',zIndex: 10
            }}
          >Checkout</button>
        )}

        {cart.length === 0 ? (
          <p style={{ color: '#003366' }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => {
                const price = parseFloat(item.price);
                return (
                  <div
                    key={item.id} style={{display: 'flex',flexWrap: 'wrap',gap: '20px',backgroundColor: '#fff',borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',padding: '1rem',alignItems: 'center'}}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', minWidth: '40px' }}>
                      <input
                        type="checkbox" checked={selectedItems.includes(item.id)}onChange={() => handleCheckboxChange(item.id)}style={{transform: 'scale(1.4)',accentColor: '#0066cc',marginRight: '10px'}}
                      />
                    </div>
                    <img src={item.image} alt={item.title}
                      style={{ width: '100px',height: '100px', objectFit: 'cover',borderRadius: '8px' }}
                    />
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h3 style={{ color: '#003366', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: 0 }}>
                        <strong>Price:</strong>{' '}
                        {!isNaN(price) ? `$${price.toFixed(2)}` : 'Unavailable'}
                      </p>
                      <div
                        style={{display: 'flex',alignItems: 'center',gap: '10px',marginTop: '0.5rem',flexWrap: 'wrap'
                        }}
                      >
                        <label htmlFor={`qty-${item.id}`} style={{ color: '#003366' }}>Qty:</label>
                        <input id={`qty-${item.id}`} type="number" min="1" alue={item.quantity} onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          style={{width: '60px',padding: '5px',borderRadius: '6px',border: '1px solid #ccc'
                          }}
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{backgroundColor: '#ff4d4f',color: '#fff',padding: '6px 12px',border: 'none', borderRadius: '6px',cursor: 'pointer'
                          }}
                        >Remove</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-summary" style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#003366' }}>Total: ${total.toFixed(2)}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
