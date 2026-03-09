// Assigned to: Tanvi
// TODO: Implement cart logic (getCart, addToCart, updateCartItem, removeFromCart, clearCart)
// Express controller for cart module
// functions:
// getCart
// addToCart
// updateCartItem
// removeFromCart
// clearCart
// use Cart mongoose model

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return sendSuccess(res, { items: [], totalPrice: 0 });
    }
    sendSuccess(res, cart);
  } catch (error) {
    sendError(res, 'Failed to get cart', 500);
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) {
  return sendError(res, 'Product ID and a valid quantity greater than 0 are required', 400);
}

    const product = await Product.findById(productId);
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate total price
    await cart.populate('items.product');
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    await cart.save();

    sendSuccess(res, cart, 201);
  } 
  catch (error) {
  console.error("Error fetching cart:", error);
  sendError(res, 'Failed to get cart', 500);
}
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return sendError(res, 'Valid quantity required');
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return sendError(res, 'Cart not found', 404);
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return sendError(res, 'Item not found in cart', 404);
    }

    item.quantity = quantity;

    // Recalculate total price
    await cart.populate('items.product');
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    await cart.save();

    sendSuccess(res, cart);
  } catch (error) {
    sendError(res, 'Failed to update cart item', 500);
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return sendError(res, 'Cart not found', 404);
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return sendError(res, 'Item not found in cart', 404);
    }

    cart.items.splice(itemIndex, 1);

    // Recalculate total price
    await cart.populate('items.product');
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    await cart.save();

    sendSuccess(res, cart);
  } catch (error) {
    sendError(res, 'Failed to remove item from cart', 500);
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user.id });
    if (!cart) {
      return sendError(res, 'Cart not found', 404);
    }
    sendSuccess(res, { message: 'Cart cleared' });
  } catch (error) {
    sendError(res, 'Failed to clear cart', 500);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
