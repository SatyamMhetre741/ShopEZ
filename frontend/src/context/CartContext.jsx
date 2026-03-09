// Assigned to: Tanvi
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as cartApi from '../api/cartApi';
import { AuthContext } from './AuthContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalPrice(0);
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await cartApi.getCart();
      setCartItems(data.data.items || []);
      setTotalPrice(data.data.totalPrice || 0);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product, quantity) => {
    try {
      const { data } = await cartApi.addToCart({ productId: product._id, quantity });
      setCartItems(data.data.items || []);
      setTotalPrice(data.data.totalPrice || 0);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const updateQty = async (itemId, quantity) => {
    try {
      const { data } = await cartApi.updateCartItem(itemId, { quantity });
      setCartItems(data.data.items || []);
      setTotalPrice(data.data.totalPrice || 0);
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await cartApi.removeFromCart(itemId);
      setCartItems(data.data.items || []);
      setTotalPrice(data.data.totalPrice || 0);
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCartItems([]);
      setTotalPrice(0);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, loading, addItem, updateQty, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
