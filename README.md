# ShopEZ - E-Commerce Platform

A full-stack e-commerce application built with **Node.js + Express + MongoDB** (backend) and **React** (frontend).

---

## Project Structure

```
shopez-ecommerce/
├── backend/    # Node.js + Express + MongoDB REST API
├── frontend/   # React SPA
└── docs/       # ER diagram, API docs
```

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- MongoDB (local or Atlas)
- npm >= 9.x

### Installation

#### 1. Clone the repo
```bash
git clone <repo-url>
cd shopez-ecommerce
```

#### 2. Install backend dependencies
```bash
cd backend
npm install
```

#### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

#### 4. Configure environment variables

Copy the example env files and fill in the values:

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### Running the App

#### Backend (development)
```bash
cd backend
npm run dev
```

#### Frontend (development)
```bash
cd frontend
npm start
```

---

## Team Assignment Guide

Work is split by **feature domain** — each member owns their feature end-to-end (model → service → controller → routes → frontend page → API call).

---

### Satyam — Auth & User Management

**Backend**
| File | Task |
|------|------|
| `backend/src/models/User.js` | Define User schema (name, email, password, role, timestamps) |
| `backend/src/controllers/authController.js` | register, login, logout, getMe |
| `backend/src/controllers/userController.js` | getUserProfile, updateUserProfile, changePassword |
| `backend/src/services/authService.js` | registerUser, loginUser, token validation logic |
| `backend/src/routes/authRoutes.js` | POST /api/auth/register, /login, /logout, /me |
| `backend/src/routes/userRoutes.js` | GET/PUT /api/users/profile |
| `backend/src/middleware/authMiddleware.js` | verify JWT, attach user to req |
| `backend/src/middleware/roleMiddleware.js` | restrict routes by role |
| `backend/src/validators/authValidator.js` | validate register/login request body |
| `backend/tests/auth.test.js` | Unit + integration tests for auth flows |

**Frontend**
| File | Task |
|------|------|
| `frontend/src/pages/Login/Login.jsx` | Login form, call authApi.login, store token |
| `frontend/src/pages/Register/Register.jsx` | Register form, call authApi.register |
| `frontend/src/context/AuthContext.jsx` | Global auth state (user, login, logout) |
| `frontend/src/hooks/useAuth.js` | Expose AuthContext via hook |
| `frontend/src/api/authApi.js` | login(), register(), logout(), getMe() API calls |

---

### Rajiv — Products & Catalog

**Backend**
| File | Task |
|------|------|
| `backend/src/models/Product.js` | Define Product schema (name, price, category, stock, images, reviews) |
| `backend/src/models/Category.js` | Define Category schema (name, slug, description) |
| `backend/src/models/Review.js` | Define Review schema (user, product, rating, comment) |
| `backend/src/controllers/productController.js` | getAllProducts, getProductById, createProduct, updateProduct, deleteProduct |
| `backend/src/services/productService.js` | Product CRUD + search/filter logic |
| `backend/src/routes/productRoutes.js` | GET /api/products, POST/PUT/DELETE /api/products/:id |
| `backend/src/routes/reviewRoutes.js` | POST /api/products/:id/reviews |
| `backend/src/middleware/uploadMiddleware.js` | multer config for product image uploads |
| `backend/src/validators/productValidator.js` | validate product create/update body |
| `backend/tests/product.test.js` | Unit + integration tests for product APIs |

**Frontend**
| File | Task |
|------|------|
| `frontend/src/pages/Products/Products.jsx` | Product listing page with search/filter |
| `frontend/src/pages/ProductDetail/ProductDetail.jsx` | Single product detail + Add to Cart button |
| `frontend/src/components/ProductCard/ProductCard.jsx` | Reusable product card component |
| `frontend/src/components/ProductList/ProductList.jsx` | Grid/list of ProductCards |
| `frontend/src/components/Loader.jsx` | Loading spinner component |
| `frontend/src/api/productApi.js` | getProducts(), getProductById(), createProduct() etc. |

---

### Tanvi — Cart & Checkout / Payment

**Backend**
| File | Task |
|------|------|
| `backend/src/models/Cart.js` | Define Cart schema (user, items: [{product, quantity}]) |
| `backend/src/controllers/cartController.js` | getCart, addToCart, updateCartItem, removeFromCart, clearCart |
| `backend/src/controllers/paymentController.js` | initiatePayment, verifyPayment, webhook handler |
| `backend/src/services/cartService.js` | Cart business logic |
| `backend/src/services/paymentService.js` | Stripe/Razorpay integration |
| `backend/src/routes/cartRoutes.js` | GET/POST/PUT/DELETE /api/cart |

**Frontend**
| File | Task |
|------|------|
| `frontend/src/pages/Cart/Cart.jsx` | Cart page (list items, update qty, remove, show total) |
| `frontend/src/pages/Checkout/Checkout.jsx` | Checkout form + payment integration |
| `frontend/src/components/CartItem/CartItem.jsx` | Single cart item row component |
| `frontend/src/context/CartContext.jsx` | Global cart state (items, add, remove, clear) |
| `frontend/src/api/cartApi.js` | getCart(), addToCart(), updateCartItem(), removeFromCart() |

---

### Saniya — Orders & Admin

**Backend**
| File | Task |
|------|------|
| `backend/src/models/Order.js` | Define Order schema (user, items, shippingAddress, paymentInfo, status) |
| `backend/src/controllers/orderController.js` | createOrder, getMyOrders, getOrderById, updateOrderStatus |
| `backend/src/controllers/adminController.js` | getDashboardStats, listAllUsers, listAllOrders, listAllProducts |
| `backend/src/services/orderService.js` | Order creation, stock deduction, status transitions |
| `backend/src/routes/orderRoutes.js` | POST /api/orders, GET /api/orders/mine, GET/PUT /api/orders/:id |
| `backend/src/routes/adminRoutes.js` | All /api/admin/* routes (admin role protected) |
| `backend/src/validators/orderValidator.js` | validate order creation body |
| `backend/tests/order.test.js` | Unit + integration tests for order APIs |

**Frontend**
| File | Task |
|------|------|
| `frontend/src/pages/Orders/Orders.jsx` | My orders list with status badges |
| `frontend/src/pages/Admin/AdminDashboard.jsx` | Stats overview (total orders, revenue, users, products) |
| `frontend/src/pages/Admin/ManageProducts.jsx` | Admin CRUD interface for products |
| `frontend/src/pages/Admin/ManageOrders.jsx` | Admin table to view and update order statuses |
| `frontend/src/components/Navbar/Navbar.jsx` | Top nav with links, cart icon, user menu |
| `frontend/src/api/orderApi.js` | createOrder(), getMyOrders(), getOrderById(), updateOrderStatus() |

---

## Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Backend   | Node.js, Express.js        |
| Database  | MongoDB + Mongoose         |
| Auth      | JWT                        |
| Frontend  | React, React Router, Axios |
| Payments  | Stripe / Razorpay (TBD)   |

---

## API Docs
See [`docs/API-docs.md`](docs/API-docs.md) — to be filled in by the backend team.
