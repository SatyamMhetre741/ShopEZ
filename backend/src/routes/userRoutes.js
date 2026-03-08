// Assigned to: Satyam
const express = require('express');
const router  = express.Router();
const {
  getUserProfile, updateUserProfile, changePassword, getAllUsers, deleteUser,
} = require('../controllers/userController');
const { protect }        = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const ROLES              = require('../constants/roles');

// Current logged-in user
router.get('/me',          protect, getUserProfile);
router.put('/me',          protect, updateUserProfile);
router.put('/me/password', protect, changePassword);

// Admin only
router.get('/',       protect, authorizeRoles(ROLES.ADMIN), getAllUsers);
router.delete('/:id', protect, authorizeRoles(ROLES.ADMIN), deleteUser);

module.exports = router;
