// Assigned to: Satyam
import React, { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate user from stored token on first load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }

    authApi.getMe()
      .then(({ data }) => setUser(data.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    localStorage.setItem('token', data.data.token);
    setUser(data.data.user);
  };

  const register = async (userData) => {
    const { data } = await authApi.register(userData);
    localStorage.setItem('token', data.data.token);
    setUser(data.data.user);
  };

  const logout = async () => {
    try { await authApi.logout(); } catch (_) { /* ignore network errors on logout */ }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
