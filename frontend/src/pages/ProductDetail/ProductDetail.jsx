// Assigned to: Rajiv
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as productApi from '../../api/productApi';
import { CartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Loader from '../../components/Loader';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productApi.getProduct(id);
        setProduct(data.data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  if (loading) return <Loader />;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return null;

  return (
    <div className="page-product-detail">
      <div className="product-images">
        <img
          src={product.images?.[0] || '/placeholder.png'}
          alt={product.name}
        />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <div className="product-rating">
          {'★'.repeat(Math.round(product.ratings || 0))}
          {'☆'.repeat(5 - Math.round(product.ratings || 0))}
          <span>({product.numReviews || 0} reviews)</span>
        </div>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-stock">
          Status: {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </p>
        <p className="product-category">Category: {product.category}</p>

        {product.stock > 0 && (
          <div className="add-to-cart-section">
            <label>
              Qty:
              <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
