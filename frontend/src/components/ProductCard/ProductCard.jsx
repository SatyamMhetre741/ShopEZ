// Assigned to: Rajiv
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.images?.[0] || '/placeholder.png'}
          alt={product.name}
          className="product-image"
        />
      </Link>
      <div className="product-info">
        <Link to={`/products/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-rating">
          {'★'.repeat(Math.round(product.ratings || 0))}
          {'☆'.repeat(5 - Math.round(product.ratings || 0))}
          <span>({product.numReviews || 0})</span>
        </div>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button
          className="btn-add-cart"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
