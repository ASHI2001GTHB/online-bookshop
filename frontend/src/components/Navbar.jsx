import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [location]); // Update on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const getInitial = () => {
    return username ? username.charAt(0).toUpperCase() : '';
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    marginRight: '1rem',
    color: isActive(path) ? 'maroon' : 'black',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    textDecoration: 'none',
  });

  return (
    <nav style={{ background: '#fff', padding: '0rem 2rem', borderBottom: '1px solid #ddd' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>📚 BookNest</Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={linkStyle('/')}> <b>Home</b>  </Link>
          <Link to="/books" style={linkStyle('/books')}> <b>Books</b> </Link>
          <Link to="/cart" style={linkStyle('/cart')}> <b>Cart</b> </Link>

          {isLoggedIn ? (
            <>
              <div
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginRight: '1rem',
                }}
                title={username}
              >
                {getInitial()}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle('/login')}><b>Login</b></Link>
              <Link to="/Signup" style={linkStyle('/Signup')}><b>Register</b></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
