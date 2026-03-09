import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as productApi from '../../api/productApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader';
import './Home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await productApi.getProducts({ limit: 8 });
        setFeaturedProducts(data.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="page-home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopEZ</h1>
          <p>Discover amazing products at great prices</p>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        {loading ? (
          <Loader />
        ) : featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="no-products">No products available yet.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
