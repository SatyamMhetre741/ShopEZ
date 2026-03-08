// Assigned to: Satyam
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const User = require('../models/User');
const { sendError } = require('../utils/responseFormatter');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Not authorized — no token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user    = await User.findById(decoded.id).select('-password');
    if (!user) return sendError(res, 'User belonging to this token no longer exists', 401);
    req.user = user;
    next();
  } catch {
    sendError(res, 'Not authorized — token invalid or expired', 401);
  }
};

module.exports = { protect };
