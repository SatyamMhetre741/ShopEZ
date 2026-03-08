// Assigned to: Satyam
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

// TODO: Verify JWT and attach req.user
const protect = (req, res, next) => {
  // 1. Extract token from Authorization header
  // 2. Verify token
  // 3. Attach decoded user to req.user
  // 4. Call next()
  next(); // placeholder
};

module.exports = { protect };
