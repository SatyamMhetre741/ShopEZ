// Assigned to: Tanvi
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import './CartItem.css';

function CartItem({ item }) {
  const { updateQty, removeItem } = useContext(CartContext);
  const product = item.product;

  const handleQuantityChange = (e) => {
    updateQty(item._id, Number(e.target.value));
  };

  const handleRemove = () => {
    removeItem(item._id);
  };

  return (
    <div className="cart-item">
      <img
        src={product.images?.[0] || '/placeholder.png'}
        alt={product.name}
        className="cart-item-image"
      />
      <div className="cart-item-info">
        <Link to={`/products/${product._id}`}>
          <h4>{product.name}</h4>
        </Link>
        <p className="item-price">{formatPrice(product.price)}</p>
      </div>
      <div className="cart-item-qty">
        <select value={item.quantity} onChange={handleQuantityChange}>
          {[...Array(10).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="cart-item-subtotal">
        {formatPrice(product.price * item.quantity)}
      </div>
      <button className="btn-remove" onClick={handleRemove}>
        ✕
      </button>
    </div>
  );
}

export default CartItem;
