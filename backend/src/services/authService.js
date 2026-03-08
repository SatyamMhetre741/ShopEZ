// Assigned to: Satyam
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordHash');
const generateToken = require('../utils/generateToken');

const registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error('Email already registered');
    err.statusCode = 409;
    throw err;
  }

  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed });
  const token = generateToken({ id: user._id, role: user.role });

  return {
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken({ id: user._id, role: user.role });

  return {
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  };
};

module.exports = { registerUser, loginUser };
