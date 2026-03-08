// Assigned to: Satyam
const express = require('express');
const router  = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../validators/authValidator');

router.post('/register', validateRegister, register);   // POST /api/auth/register
router.post('/login',    validateLogin,    login);      // POST /api/auth/login
router.post('/logout',   protect,          logout);     // POST /api/auth/logout
router.get('/me',        protect,          getMe);      // GET  /api/auth/me

module.exports = router;
