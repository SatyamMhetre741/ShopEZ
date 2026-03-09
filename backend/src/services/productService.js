// Assigned to: Rajiv
const Product = require('../models/Product');

const searchProducts = async (filters) => {
  const { keyword, category, minPrice, maxPrice, page = 1, limit = 10 } = filters;
  
  const query = {};
  
  if (keyword) {
    query.name = { $regex: keyword, $options: 'i' };
  }
  if (category) {
    query.category = category;
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return {
    products,
    page: Number(page),
    pages: Math.ceil(total / limit),
    total,
  };
};

const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  product.stock -= quantity;
  await product.save();
  return product;
};

module.exports = { searchProducts, updateStock };
