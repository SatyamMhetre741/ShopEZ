// Assigned to: Tanvi
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import * as orderApi from '../../api/orderApi';
import { formatPrice } from '../../utils/formatPrice';
import './Checkout.css';

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleInputChange = (e) => {
    setShippingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images?.[0] || '',
      }));

      await orderApi.createOrder({
        orderItems,
        shippingAddress,
        paymentMethod,
      });

      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const shippingPrice = totalPrice > 500 ? 0 : 50;
  const taxPrice = Number((0.18 * totalPrice).toFixed(2));
  const grandTotal = totalPrice + shippingPrice + taxPrice;

  return (
    <div className="page-checkout">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Address</h3>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            required
          />

          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={paymentMethod === 'Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit/Debit Card
          </label>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="summary-item">
              <span>{item.product.name} x {item.quantity}</span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row"><span>Items:</span> <span>{formatPrice(totalPrice)}</span></div>
          <div className="summary-row"><span>Shipping:</span> <span>{formatPrice(shippingPrice)}</span></div>
          <div className="summary-row"><span>Tax (18%):</span> <span>{formatPrice(taxPrice)}</span></div>
          <div className="summary-row total"><span>Total:</span> <span>{formatPrice(grandTotal)}</span></div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
