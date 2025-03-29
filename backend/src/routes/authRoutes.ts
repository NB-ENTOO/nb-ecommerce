import { Router } from 'express';
import * as authController from '../controllers/authController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/me', protect, authController.getCurrentUser);
router.post('/register', protect, restrictTo('Administrator'), authController.register);

export default router; 