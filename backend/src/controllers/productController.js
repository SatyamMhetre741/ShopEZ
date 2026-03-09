// Assigned to: Rajiv
const Product = require('../models/Product');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// @desc    Get all products with search, filter, pagination
// @route   GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { keyword, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
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

    sendSuccess(res, {
      products,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    sendSuccess(res, product);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a product (Admin)
// @route   POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images: images || [],
    });
    sendSuccess(res, product, 201);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    sendSuccess(res, product);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    sendSuccess(res, { message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    sendSuccess(res, categories);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
