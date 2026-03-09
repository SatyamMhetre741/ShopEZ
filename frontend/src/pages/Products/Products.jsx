// Assigned to: Rajiv
import React, { useState, useEffect } from 'react';
import * as productApi from '../../api/productApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    page: 1,
  });
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await productApi.getCategories();
        setCategories(data.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productApi.getProducts(filters);
        setProducts(data.data.products);
        setPagination({ pages: data.data.pages, total: data.data.total });
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="page-products">
      <aside className="filters-sidebar">
        <h3>Filters</h3>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.keyword}
            onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value, page: 1 }))}
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value, page: 1 }))}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </form>
      </aside>

      <main className="products-main">
        <h2>Products ({pagination.total})</h2>
        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="pagination">
              {Array.from({ length: pagination.pages }, (_, i) => (
                <button
                  key={i + 1}
                  className={filters.page === i + 1 ? 'active' : ''}
                  onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>No products found.</p>
        )}
      </main>
    </div>
  );
}

export default Products;
