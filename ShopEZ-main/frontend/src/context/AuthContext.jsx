// Assigned to: Satyam
import React, { createContext, useState, useContext } from 'react';

// TODO: Implement full auth context — login, logout, register, persist token

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // TODO: On mount, load user from localStorage / verify token

  const login  = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
