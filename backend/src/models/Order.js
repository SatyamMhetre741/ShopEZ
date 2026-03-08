// Assigned to: Saniya
const mongoose = require('mongoose');

// TODO: Define Order schema
// Fields: user, orderItems, shippingAddress, paymentMethod, paymentResult,
//         itemsPrice, shippingPrice, taxPrice, totalPrice, isPaid, isDelivered, status

const OrderSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
