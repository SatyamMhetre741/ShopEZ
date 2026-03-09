// Assigned to: Saniya
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function AdminDashboard() {
  return (
    <div className="page-admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-cards">
        <Link to="/admin/products" className="admin-card">
          <h3>Manage Products</h3>
          <p>Add, edit, or remove products</p>
        </Link>
        <Link to="/admin/orders" className="admin-card">
          <h3>Manage Orders</h3>
          <p>View and update order statuses</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
