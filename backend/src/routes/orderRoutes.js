// Assigned to: Saniya
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderToPaid,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

// Protected routes
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin routes
router.get('/', protect, restrictTo('admin'), getAllOrders);
router.put('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

module.exports = router;
