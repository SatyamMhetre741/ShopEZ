# ShopEZ - E-Commerce Platform

A full-stack e-commerce application built with **Node.js/Express** backend and **React/Vite** frontend. ShopEZ provides a seamless shopping experience with user authentication, product management, order processing, and secure payment integration.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Project Authors](#project-authors)
- [License](#license)

---

## ✨ Features

### User Features
- **User Authentication**
  - User registration and login
  - OTP verification via email/SMS
  - JWT-based authentication with refresh tokens
  - Secure password hashing with bcrypt

- **Shopping Experience**
  - Browse products by category
  - Search products by name
  - View detailed product information
  - Add products to cart
  - Proceed to checkout

- **Order Management**
  - Create orders with billing details
  - View order history
  - Track order status

### Admin Features
- **Product Management**
  - Create new products with image upload
  - Update product details
  - Delete products
  - View all products
  - Filter products by category

- **Order Management**
  - View all orders (today's orders)
  - View detailed order information
  - Update order status

### Payment & Integration
- **Payment Processing**
  - Razorpay payment gateway integration
  - Payment verification
  - Order confirmation after payment

- **File Management**
  - Cloudinary integration for image uploads
  - Multer middleware for form-data handling

- **Authentication Services**
  - Firebase authentication integration
  - OTP verification with Twilio/Nodemailer

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer, Cloudinary
- **Email/SMS**: Nodemailer, Twilio
- **Payments**: Razorpay
- **Development**: Nodemon
- **Date Utils**: date-fns
- **Utilities**: cookie-parser, CORS

### Frontend
- **Framework**: React 18.3
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Authentication**: Firebase
- **State Management**: Cookie-based (js-cookie)
- **Icons**: Lucide React
- **Date Utils**: date-fns
- **Styling**: CSS Modules

---

## 📁 Project Structure

```
ShopEZ/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── index.js               # Server entry point
│   │   ├── constants.js           # Project constants
│   │   ├── datasave.js            # Data saving utilities
│   │   ├── controllers/           # Route controllers
│   │   │   ├── admin.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── payment.controller.js
│   │   │   └── otp.controller.js
│   │   ├── routes/                # API routes
│   │   │   ├── admin.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── payment.routes.js
│   │   │   └── sendOtp.routes.js
│   │   ├── models/                # MongoDB schemas
│   │   │   ├── product.model.js
│   │   │   ├── user.model.js
│   │   │   ├── admin.model.js
│   │   │   └── billingdetails.model.js
│   │   ├── middlewares/           # Custom middlewares
│   │   │   ├── auth.middleware.js
│   │   │   └── multer.middleware.js
│   │   ├── db/
│   │   │   └── index.js           # Database connection
│   │   └── utils/                 # Helper utilities
│   │       ├── ApiError.js
│   │       ├── ApiResponse.js
│   │       ├── asyncHandler.js
│   │       └── cloudinary.js
│   ├── public/
│   │   └── temp/                  # Temporary file storage
│   ├── package.json
│   └── .env (create this)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   ├── firebase.js            # Firebase configuration
│   │   ├── index.css              # Global styles
│   │   ├── App.css
│   │   ├── components/            # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Productcard.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── BillingDetails.jsx
│   │   │   ├── otpverification.jsx
│   │   │   ├── alertSuccess.jsx
│   │   │   ├── alertFailure.jsx
│   │   │   ├── adminDeleteProduct.jsx
│   │   │   ├── Adminmyorder.jsx
│   │   │   ├── TodayOrderDetail.jsx
│   │   │   └── MorphingLoader.jsx
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Authpage.jsx
│   │   │   ├── Productpage.jsx
│   │   │   ├── Productlist.jsx
│   │   │   ├── Checkoutpage.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── admin.createProduct.jsx
│   │   │   ├── adminTodayorder.jsx
│   │   │   └── AdminTodayOrderDetail.jsx
│   │   └── assets/
│   │       └── images/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.local (create this)
│   └── index.html
│
├── README.md
├── SECURITY.md
└── README_COMPREHENSIVE.md (this file)
```

---

## 📦 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (Local or MongoDB Atlas cloud)
- **Git**

### External Services Required
- Firebase account (for authentication)
- Cloudinary account (for image hosting)
- Razorpay account (for payments)
- Twilio account (for SMS/OTP)
- Nodemailer configured email (for email OTP)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ShopEZ.git
cd ShopEZ
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration (.env)

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=8000
CORS_ORIGIN=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/shopez
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopez?retryWrites=true&w=majority

# JWT Tokens
ACCESS_TOKEN_SECRET=your_access_token_secret_key_here
ACCESS_TOKEN_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary (Image Upload)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay (Payment Gateway)
RAZORPAY_API_KEY=your_razorpay_api_key
RAZORPAY_API_SECRET=your_razorpay_api_secret

# Twilio (SMS OTP)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_SERVICE=gmail

# Firebase (Optional)
FIREBASE_API_KEY=your_firebase_api_key
```

### Frontend Configuration (.env.local)

Create a `.env.local` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_FIREBASE_API_KEY=AIzaSyC_J5olcCerrPxyntWFcRDDt6zzSMlUU1Y
VITE_FIREBASE_AUTH_DOMAIN=ecommerce-website-19ecb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ecommerce-website-19ecb
VITE_FIREBASE_STORAGE_BUCKET=ecommerce-website-19ecb.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=179282251767
VITE_FIREBASE_APP_ID=1:179282251767:web:6a4cf6ea01eac5d24d28f2
```

---

## 🏃 Running the Project

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:8000`

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Build Frontend for Production

```bash
npm run build
npm run preview
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### User Routes (`/api`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/register` | Verify user details before registration | No |
| POST | `/login` | User login | No |
| POST | `/createuser` | Create new user account | No |
| POST | `/logout` | User logout | ✓ JWT |
| POST | `/billingdetails` | Save billing details | ✓ JWT |
| GET | `/orders` | Get user's orders | ✓ JWT |
| GET | `/products/search` | Search products by name | No |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/register` | Admin registration | No |
| POST | `/login` | Admin login | No |
| POST | `/verify` | Verify admin/user session | ✓ JWT |
| POST | `/createproduct/:imgStatus` | Create product | ✓ Admin |
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product by ID | No |
| GET | `/products/category/:category` | Get products by category | No |
| PUT | `/products/:id/:imgStatus` | Update product | ✓ Admin |
| DELETE | `/products/:id` | Delete product | ✓ Admin |
| GET | `/orders` | Get all orders | ✓ Admin |
| GET | `/orders/:id` | Get order details | ✓ Admin |
| PUT | `/orders/:id/status` | Update order status | ✓ Admin |

### Payment Routes (`/api/payment`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/createorder` | Create Razorpay order | ✓ JWT |
| POST | `/verify` | Verify payment | ✓ JWT |

### OTP Routes (`/api/checkotp`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/send` | Send OTP to email/phone |
| POST | `/verify` | Verify OTP |

---

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (unique, indexed),
  number: Number (unique),
  email: String (unique),
  password: String (hashed),
  refreshToken: String
}
```

### Product Model
```javascript
{
  image: String (required),
  productName: String (required, indexed),
  price: Array,
  characs: Array (characteristics),
  description: String,
  fixedqty: Number,
  category: String,
  availability: Boolean
}
```

### Admin Model
```javascript
{
  // Similar to User model with admin privileges
}
```

### Billing Details Model
```javascript
{
  userId: ObjectId (reference to User),
  fullName: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  phoneNumber: String
}
```

---

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **HTTP Only Cookies**: Refresh tokens stored in HTTP-only cookies
- **CORS Configuration**: Restricted origin access
- **Input Validation**: Data validation on both client and server
- **Error Handling**: Centralized async error handling

---

## 📝 Project Authors

- **Raj**
- **Vallabh**

---

## 📄 License

ISC License - See [LICENSE](./LICENSE) file for details

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support & Contact

- **Email**: support@shopez.com
- **Issues**: GitHub Issues
- **Documentation**: See respective READMEs in backend and frontend directories

---

## 🗺️ Roadmap

- [ ] Implement user reviews and ratings
- [ ] Add product recommendations
- [ ] Implement wishlist feature
- [ ] Add discount and coupon system
- [ ] Mobile app development
- [ ] Advanced order tracking
- [ ] Inventory management dashboard
- [ ] Analytics and reporting

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Razorpay Integration Guide](https://razorpay.com/docs/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

**Last Updated**: March 2026

For the most up-to-date information and latest features, please visit the [project repository](https://github.com/yourusername/ShopEZ).
