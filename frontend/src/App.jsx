import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookDetails from './pages/BookDetails';
import Checkout from './pages/Checkout';
import CategoryBooks from './pages/CategoryBooks'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/category/:categoryName" element={<CategoryBooks />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
