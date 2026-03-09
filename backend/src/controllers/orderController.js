// Assigned to: Saniya
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// @desc    Create new order
// @route   POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return sendError(res, 'No order items provided', 400);
    }

    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    // Clear user's cart after order
    await Cart.findOneAndDelete({ user: req.user._id });

    sendSuccess(res, order, 201);
  } catch (err) {
    next(err);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name images');

    if (!order) {
      return sendError(res, 'Order not found', 404);
    }

    // Check if user owns order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 'Not authorized to view this order', 403);
    }

    sendSuccess(res, order);
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    sendSuccess(res, orders);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    sendSuccess(res, orders);
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return sendError(res, 'Order not found', 404);
    }

    order.status = status;

    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    sendSuccess(res, updatedOrder);
  } catch (err) {
    next(err);
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return sendError(res, 'Order not found', 404);
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    sendSuccess(res, updatedOrder);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderToPaid,
};
