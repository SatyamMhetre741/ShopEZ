// Assigned to: Tanvi
const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// GET    /api/cart
router.get('/', protect, getCart);

// POST   /api/cart
router.post('/', protect, addToCart);

// PUT    /api/cart/:itemId
router.put('/:itemId', protect, updateCartItem);

// DELETE /api/cart/:itemId
router.delete('/:itemId', protect, removeFromCart);

// DELETE /api/cart
router.delete('/', protect, clearCart);

module.exports = router;
