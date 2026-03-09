// Assigned to: Tanvi
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import { formatPrice } from '../../utils/formatPrice';
import { useAuth } from '../../hooks/useAuth';
import './Cart.css';

function Cart() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-cart empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-cart">
      <h2>Shopping Cart ({cartItems.length} items)</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.product._id || item.product} item={item} />
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button className="btn-primary" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className="btn-secondary" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
