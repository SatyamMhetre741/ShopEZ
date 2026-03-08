import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// TODO: Attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// TODO: Handle 401 responses globally (token expiry redirect)
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
