// Assigned to: Saniya
import React, { useState, useEffect } from 'react';
import * as productApi from '../../api/productApi';
import { formatPrice } from '../../utils/formatPrice';
import Loader from '../../components/Loader';
import './Admin.css';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: '', images: '',
  });

  const fetchProducts = async () => {
    try {
      const { data } = await productApi.getProducts({ limit: 100 });
      setProducts(data.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images ? form.images.split(',').map((s) => s.trim()) : [],
    };
    try {
      if (editingId) {
        await productApi.updateProduct(editingId, productData);
      } else {
        await productApi.createProduct(productData);
      }
      setForm({ name: '', description: '', price: '', category: '', stock: '', images: '' });
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      images: product.images.join(', '),
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productApi.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-manage-products">
      <h2>Manage Products</h2>
      <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: '', description: '', price: '', category: '', stock: '', images: '' }); }}>
        {showForm ? 'Cancel' : 'Add Product'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="product-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
          <input name="images" placeholder="Image URLs (comma-separated)" value={form.images} onChange={handleChange} />
          <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Create'}</button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;
