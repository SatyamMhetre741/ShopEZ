// Assigned to: Satyam
const { validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendError(res, errors.array()[0].msg, 422);

    const result = await registerUser(req.body);
    sendSuccess(res, result, 201);
  } catch (err) {
    err.statusCode ? sendError(res, err.message, err.statusCode) : next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return sendError(res, errors.array()[0].msg, 422);

    const result = await loginUser(req.body);
    sendSuccess(res, result);
  } catch (err) {
    err.statusCode ? sendError(res, err.message, err.statusCode) : next(err);
  }
};

const logout = (req, res) => {
  sendSuccess(res, { message: 'Logged out successfully' });
};

const getMe = (req, res) => {
  sendSuccess(res, req.user);
};

module.exports = { register, login, logout, getMe };
