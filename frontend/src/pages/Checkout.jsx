import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { jsPDF } from 'jspdf'; // Import jsPDF
import '../index.css';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    paymentMethod: 'creditCard',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + (item.price !== 'N/A' ? item.price * item.quantity : 0),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }
    setOrderPlaced(true);

    // Generate PDF invoice after placing order
    generateInvoicePDF();

    localStorage.removeItem('cart');
  };

  const generateInvoicePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Invoice', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 10, 40);
    doc.text(`Address: ${formData.address}`, 10, 50);
    doc.text(`Email: ${formData.email}`, 10, 60);
    doc.text(`Payment Method: ${formData.paymentMethod}`, 10, 70);
    
    let yOffset = 80;
    doc.text('Items:', 10, yOffset);
    
    cart.forEach((item, index) => {
      yOffset += 10;
      doc.text(`${item.title} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`, 10, yOffset);
    });

    yOffset += 10;
    doc.text(`Total Paid: $${total.toFixed(2)}`, 10, yOffset);
    
    // Download PDF
    doc.save(`Invoice_${formData.name}_${new Date().toISOString()}.pdf`);
  };

  return (
    <div className="checkout-container" style={{ background: '#f0f8ff', padding: '30px' }}>
      <h2 style={{ color: '#004080', marginBottom: '20px' }}>Checkout</h2>

      {orderPlaced ? (
        <div style={{
          background: '#ffffff',padding: '20px',borderRadius: '8px',boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: 'green' }}>Order Placed Successfully!</h3>
          <p>
            Thank you, <strong>{formData.name}</strong>. A confirmation has been sent to{' '}
            <strong>{formData.email}</strong>.
          </p>
          <hr />
          <h4>Invoice</h4>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.title} × {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total Paid: ${total.toFixed(2)}</h4>
        </div>
      ) : (
        <form onSubmit={handleOrder}
          style={{
            background: '#ffffff',padding: '25px',borderRadius: '10px',boxShadow: '0 0 12px rgba(0,0,0,0.08)',maxWidth: '600px',margin: 'auto'
          }}
        >
          <h3 style={{ color: '#004080' }}>Shipping Information</h3>
          <label>Full Name</label>
          <input
            type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input"
          />

          <label>Address</label>
          <textarea
            name="address"  value={formData.address} onChange={handleChange} required className="form-input"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />

          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="form-input"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>

          <h3 style={{ marginTop: '20px' }}>Total: <span style={{ color: '#004080' }}>${total.toFixed(2)}</span></h3>

          <button
            type="submit"
            style={{
              marginTop: '20px', padding: '10px 25px', backgroundColor: '#007bff', color: '#fff',
              border: 'none',  borderRadius: '6px', cursor: 'pointer'
            }}
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
