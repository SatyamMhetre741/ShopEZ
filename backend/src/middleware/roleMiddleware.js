// TODO: Check req.user.role against allowed roles
const authorizeRoles = (...roles) => (req, res, next) => {
  // if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next(); // placeholder
};

module.exports = { authorizeRoles };
