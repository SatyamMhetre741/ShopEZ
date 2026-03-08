// Assigned to: Tanvi
const mongoose = require('mongoose');

// TODO: Define Cart schema
// Fields: user, items (array of { product, quantity }), totalPrice

const CartSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
