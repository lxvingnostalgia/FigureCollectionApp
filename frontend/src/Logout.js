import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication information from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');

    // Notify the parent component about the logout
    if (onLogout && typeof onLogout === 'function') {
      onLogout();
    }

    // Redirect to the home page or any other page after logout
    navigate('/home');
  };

  return (
    <button onClick={handleLogout} className="nav-link mx-3 fs-4 menu-font">Logout</button>
  );
}

export default Logout;
