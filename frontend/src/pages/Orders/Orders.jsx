// Assigned to: Saniya
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as orderApi from '../../api/orderApi';
import { formatPrice } from '../../utils/formatPrice';
import Loader from '../../components/Loader';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderApi.getMyOrders();
        setOrders(data.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const classes = {
      pending: 'badge-pending',
      processing: 'badge-processing',
      shipped: 'badge-shipped',
      delivered: 'badge-delivered',
      cancelled: 'badge-cancelled',
    };
    return <span className={`badge ${classes[status]}`}>{status}</span>;
  };

  if (loading) return <Loader />;

  return (
    <div className="page-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span>Order #{order._id.slice(-8)}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                {getStatusBadge(order.status)}
              </div>
              <div className="order-items">
                {order.orderItems.slice(0, 3).map((item, idx) => (
                  <span key={idx}>{item.name} x{item.quantity}</span>
                ))}
                {order.orderItems.length > 3 && (
                  <span>+{order.orderItems.length - 3} more</span>
                )}
              </div>
              <div className="order-footer">
                <span className="order-total">Total: {formatPrice(order.totalPrice)}</span>
                <span>{order.isPaid ? '✓ Paid' : 'Not Paid'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
