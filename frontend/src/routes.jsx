import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home            from './pages/Home/Home';
import Login           from './pages/Login/Login';
import Register        from './pages/Register/Register';
import Products        from './pages/Products/Products';
import ProductDetail   from './pages/ProductDetail/ProductDetail';
import Cart            from './pages/Cart/Cart';
import Checkout        from './pages/Checkout/Checkout';
import Orders          from './pages/Orders/Orders';
import AdminDashboard  from './pages/Admin/AdminDashboard';
import ManageProducts  from './pages/Admin/ManageProducts';
import ManageOrders    from './pages/Admin/ManageOrders';
import ProtectedRoute  from './components/ProtectedRoute';
import Navbar          from './components/Navbar/Navbar';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/products"        element={<Products />} />
        <Route path="/products/:id"    element={<ProductDetail />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart"          element={<Cart />} />
          <Route path="/checkout"      element={<Checkout />} />
          <Route path="/orders"        element={<Orders />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin"                 element={<AdminDashboard />} />
          <Route path="/admin/products"        element={<ManageProducts />} />
          <Route path="/admin/orders"          element={<ManageOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
