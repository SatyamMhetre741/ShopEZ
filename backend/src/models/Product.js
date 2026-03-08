// Assigned to: Rajiv
const mongoose = require('mongoose');

// TODO: Define Product schema
// Fields: name, description, price, category, stock, images, ratings, numReviews

const ProductSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
