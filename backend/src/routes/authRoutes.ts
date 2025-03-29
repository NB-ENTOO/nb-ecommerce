import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// Login route
router.post('/login', authController.login);

// Current user route (will need auth middleware later)
router.get('/me', authController.getCurrentUser);

export default router; 