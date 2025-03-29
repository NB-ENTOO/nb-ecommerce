import { Router } from 'express';
import * as authController from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Login route (public)
router.post('/login', authController.login);

// Current user route (protected)
router.get('/me', protect, authController.getCurrentUser);

export default router; 