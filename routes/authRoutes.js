const express = require('express');
const { authController } = require('../controller/AuthController');

const authRoutes = express.Router();

authRoutes.post('/signup', authController.signup);
authRoutes.post('/verify', authController.verify);
authRoutes.post('/login', authController.login);
authRoutes.post('/refresh-token', authController.refreshToken);
authRoutes.post('/logout', authController.logout);
authRoutes.post('/reset-password', authController.resetPassword);
authRoutes.post('/forgot-password', authController.forgotPassword);

module.exports = authRoutes;
