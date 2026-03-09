// Assigned to: Saniya
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">ShopEZ</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/cart" className="cart-link">
            Cart
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>
        )}
      </div>
      <div className="nav-auth">
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
