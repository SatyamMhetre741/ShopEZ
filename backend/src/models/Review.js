const mongoose = require('mongoose');

// TODO: Define Review schema
// Fields: user, product, rating, comment

const ReviewSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
