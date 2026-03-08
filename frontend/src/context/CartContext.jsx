import React, { createContext, useState, useContext } from 'react';

// TODO: Implement full cart context — addItem, removeItem, updateQty, clearCart, sync with backend

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // TODO: Implement cart operations

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
