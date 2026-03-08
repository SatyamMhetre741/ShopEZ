// Assigned to: Tanvi
const mongoose = require('mongoose');

// TODO: Define Cart schema
// Fields: user, items (array of { product, quantity }), totalPrice

const CartSchema = new mongoose.Schema({
// user ObjectId reference User
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// items array with product ObjectId reference Product and quantity number
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
// totalPrice number
    totalPrice: { type: Number, required: true, min: 0 }
    
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
