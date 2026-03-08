// Assigned to: Satyam
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordHash');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found', 404);
    sendSuccess(res, user);
  } catch (err) { next(err); }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    sendSuccess(res, user);
  } catch (err) { next(err); }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6)
      return sendError(res, 'New password must be at least 6 characters', 400);

    const user = await User.findById(req.user._id).select('+password');
    const match = await comparePassword(currentPassword, user.password);
    if (!match) return sendError(res, 'Current password is incorrect', 400);

    user.password = await hashPassword(newPassword);
    await user.save();
    sendSuccess(res, { message: 'Password updated successfully' });
  } catch (err) { next(err); }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    sendSuccess(res, users);
  } catch (err) { next(err); }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return sendError(res, 'User not found', 404);
    sendSuccess(res, { message: 'User deleted' });
  } catch (err) { next(err); }
};

module.exports = { getUserProfile, updateUserProfile, changePassword, getAllUsers, deleteUser };
