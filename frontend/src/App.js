import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Figures from './Figures';
import Main from './Main';
import Wishlist from './FiguresWishlist';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import './style.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <div className="title text-center">
            <Link to="/localhost:3000" className="text-decoration-none">
              <h1 className="mx-auto d-block custom-font">welcome to your figure collection!</h1>
            </Link>
          </div>
          <div className="subtitle text-center mb-4 mt-4">
            <h3 className="mx-auto d-block custom-font">─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───</h3>
          </div>
        </header>
        <div className="gif-container text-center">
            <img
              src="https://media.giphy.com/media/sDgup7orXBokTNYlbB/giphy.gif"
              alt="Animated GIF"
              style={{ width: '50%', maxWidth: '300px', margin: 'auto' }}
            />
          </div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/home" element={<Main />} />
            <Route path="/my-figures" element={<Figures />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
