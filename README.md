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

| Area              | Directory                              | Owner |
|-------------------|----------------------------------------|-------|
| Auth APIs         | `backend/src/controllers/authController.js` | TBD |
| User APIs         | `backend/src/controllers/userController.js` | TBD |
| Product APIs      | `backend/src/controllers/productController.js` | TBD |
| Order APIs        | `backend/src/controllers/orderController.js` | TBD |
| Cart APIs         | `backend/src/controllers/cartController.js` | TBD |
| Payment APIs      | `backend/src/controllers/paymentController.js` | TBD |
| Admin APIs        | `backend/src/controllers/adminController.js` | TBD |
| DB Models         | `backend/src/models/`                  | TBD |
| Frontend - Auth   | `frontend/src/pages/Login/`, `Register/` | TBD |
| Frontend - Products | `frontend/src/pages/Products/`, `ProductDetail/` | TBD |
| Frontend - Cart   | `frontend/src/pages/Cart/`, `Checkout/` | TBD |
| Frontend - Admin  | `frontend/src/pages/Admin/`            | TBD |
| Frontend - Orders | `frontend/src/pages/Orders/`           | TBD |

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
