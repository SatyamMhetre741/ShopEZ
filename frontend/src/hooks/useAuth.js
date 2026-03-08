// Assigned to: Satyam
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Custom hook to consume AuthContext — use this in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
