const mongoose = require('mongoose');

// TODO: Define Category schema
// Fields: name, slug, description, image

const CategorySchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
