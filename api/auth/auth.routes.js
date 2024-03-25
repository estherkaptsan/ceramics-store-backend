const express = require('express');
const { login, signup, logout, sendPasswordResetEmail, resetPassword } = require('./auth.controller');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/sreset-password', sendPasswordResetEmail);
router.put('/reset-password', resetPassword);

module.exports = router;
