// Assigned to: Saniya
import api from './axiosConfig';

export const createOrder = (orderData) => api.post('/orders', orderData);
export const getMyOrders = () => api.get('/orders/myorders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getAllOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });
export const updateOrderToPaid = (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult);
