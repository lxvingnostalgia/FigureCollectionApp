import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useAuth } from './AuthContext';
import './style.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-md justify-content-center mb-4 mt-4">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="home" className="nav-link mx-3 fs-4 menu-font">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="my-figures" className="nav-link mx-3 fs-4 menu-font">Collection</Link>
        </li>
        <li className="nav-item">
          <Link to="wishlist" className="nav-link mx-3 fs-4 menu-font">Wishlist</Link>
        </li>
        {isAuthenticated ? (
          <li className="nav-item">
            <Logout onLogout={logout} />
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link to="login" className="nav-link mx-3 fs-4 menu-font">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="register" className="nav-link mx-3 fs-4 menu-font">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
