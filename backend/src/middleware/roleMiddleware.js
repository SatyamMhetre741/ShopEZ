// Assigned to: Satyam
const { sendError } = require('../utils/responseFormatter');

const restrictTo = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return sendError(res, `Access denied — requires role: ${roles.join(' or ')}`, 403);
  }
  next();
};

module.exports = { restrictTo };
