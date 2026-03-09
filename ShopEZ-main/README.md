# ShopEZ – E-Commerce Platform

ShopEZ is a **full-stack e-commerce web application** built using **Node.js, Express, MongoDB, and React**.  
It allows users to browse products, manage a cart, checkout orders, and enables admins to manage products and orders.

---

# Project Structure

```
ShopEZ
│
├── backend
│   └── src
│       ├── controllers
│       ├── db
│       ├── middlewares
│       ├── models
│       ├── routes
│       ├── utils
│       ├── app.js
│       └── index.js
│
├── frontend
│   └── src
│       ├── components
│       ├── pages
│       └── api
│
└── docs
```

---

# Getting Started

## Prerequisites

Make sure you have the following installed:

- Node.js >= 18.x  
- npm >= 9.x  
- MongoDB (Local installation or MongoDB Atlas)

---

# Installation

## 1 Clone the Repository

```bash
git clone <repo-url>
cd ShopEZ
```

---

## 2 Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3 Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

# Running the Application

## Start Backend Server

```bash
cd backend
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd frontend
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# Tech Stack

| Layer | Technology |
|------|-------------|
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT |
| Frontend | React, React Router |
| API Calls | Axios |

---

# Team Assignment Guide

The project work is divided by **feature modules**.  
Each team member is responsible for **both backend and frontend** implementation of their feature.

---

# Satyam – Authentication & User Management

### Backend Files

```
backend/src/controllers/user.controller.js
backend/src/controllers/otp.controller.js
backend/src/models/user.model.js
backend/src/routes/user.routes.js
backend/src/routes/sendOtp.routes.js
backend/src/middlewares/auth.middleware.js
```

### Responsibilities

- User registration
- Login authentication
- OTP verification
- Authentication middleware
- User profile management

### Frontend Components

```
Auth.jsx
Authentication.jsx
otpverification.jsx
alertSuccess.jsx
alertFailure.jsx
```

### Frontend Pages

```
Authpage.jsx
```

---

# Rajiv – Products & Catalog

### Backend Files

```
backend/src/models/product.model.js
backend/src/controllers/admin.controller.js
backend/src/routes/admin.routes.js
backend/src/middlewares/multer.middleware.js
```

### Responsibilities

- Product schema design
- Product listing
- Product creation
- Product update
- Product deletion

### Frontend Components

```
Productcard.jsx
ProductDetail.jsx
Product.createform.jsx
Editproductdetails.jsx
adminDeleteProduct.jsx
Slider.jsx
MorphingLoader.jsx
```

### Frontend Pages

```
Productpage.jsx
Productlist.jsx
admin.createProduct.jsx
```

---

# Tanvi – Cart & Checkout

### Backend Files

```
backend/src/models/billingdetails.model.js
backend/src/controllers/payment.controller.js
backend/src/routes/payment.routes.js
backend/src/utils/datasave.js
```

### Responsibilities

- Cart management
- Billing information storage
- Checkout process
- Payment processing

### Frontend Components

```
Cart.jsx
BillCart.jsx
BillingDetails.jsx
Checkout.jsx
```

### Frontend Pages

```
Checkoutpage.jsx
```

---

# Saniya – Orders & Admin Management

### Backend Files

```
backend/src/models/admin.model.js
backend/src/controllers/admin.controller.js
backend/src/routes/admin.routes.js
```

### Responsibilities

- Admin management
- Order monitoring
- Admin dashboard logic
- Product management APIs

### Frontend Components

```
Adminmyorder.jsx
Order.Component.jsx
TodayOrderDetail.jsx
```

### Frontend Pages

```
Orders.jsx
adminTodayorder.jsx
AdminTodayOrderDetail.jsx
```

---

# Core UI Components

Reusable UI components used throughout the application:

```
Header.jsx
Navbar.jsx
Footer.jsx
Slider.jsx
MorphingLoader.jsx
```

These components handle navigation, layout structure, and loading animations.

---

# API Overview

### Authentication

```
POST /api/user/login
POST /api/user/register
POST /api/sendOtp
```

### Products

```
GET /api/products
POST /api/admin/create-product
PUT /api/admin/update-product
DELETE /api/admin/delete-product
```

### Checkout & Payment

```
POST /api/payment/checkout
```

---

# Repository Update Guide

If the team decides to **replace the existing repository files with a new project version**, follow one of the methods below.

⚠️ These steps will affect all collaborators.

---

## Method 1 — Replace Files (Recommended)

Clone the repository:

```bash
git clone <repo-url>
cd ShopEZ
```

Replace the existing project files with the updated version  
(keep the `.git` folder).

Stage changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Updated project implementation"
```

Push to repository:

```bash
git push origin main
```

---

## Method 2 — Force Replace Repository

⚠️ Use only if the entire repository needs to be reset.

```bash
cd ShopEZ
git init
git remote add origin <repo-url>
git add .
git commit -m "Initial project upload"
git push -f origin main
```

The `-f` option forcefully replaces the existing repository content.

---

# Contributors

- **Satyam** – Authentication & User Management  
- **Rajiv** – Products & Catalog  
- **Tanvi** – Cart & Checkout / Payment  
- **Saniya** – Orders & Admin Management  

---
