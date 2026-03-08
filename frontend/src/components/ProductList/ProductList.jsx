// Assigned to: Rajiv
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
// TODO: Render a grid of ProductCard components
// Props: products (array)

function ProductList({ products = [] }) {
  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;
