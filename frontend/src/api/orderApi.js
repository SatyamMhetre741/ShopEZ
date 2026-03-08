// Assigned to: Saniya
import axios from "axios";

export const createOrder = async (orderData) => {
  const { data } = await axios.post("/api/orders", orderData);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await axios.get("/api/orders/mine");
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await axios.get(`/api/orders/${id}`);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await axios.put(`/api/orders/${id}`, { status });
  return data;
};
