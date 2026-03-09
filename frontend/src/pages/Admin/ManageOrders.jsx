// Assigned to: Saniya
import React, { useState, useEffect } from 'react';
import * as orderApi from '../../api/orderApi';
import { formatPrice } from '../../utils/formatPrice';
import Loader from '../../components/Loader';
import './Admin.css';

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await orderApi.getAllOrders();
      setOrders(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await orderApi.updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-manage-orders">
      <h2>Manage Orders</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-8)}</td>
              <td>{order.user?.name || 'N/A'}</td>
              <td>{formatPrice(order.totalPrice)}</td>
              <td>{order.isPaid ? '✓ Yes' : 'No'}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleStatusChange(order._id, 'delivered')}>Mark Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrders;
