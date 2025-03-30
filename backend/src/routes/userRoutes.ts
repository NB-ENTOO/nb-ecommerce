import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserStatus,
} from '../controllers/userController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Get all users (Admin only)
router.get('/', authorize('Administrator'), getUsers);

// Get single user (Admin only)
router.get('/:id', authorize('Administrator'), getUser);

// Update user (Admin only)
router.put('/:id', authorize('Administrator'), updateUser);

// Delete user (Admin only)
router.delete('/:id', authorize('Administrator'), deleteUser);

// Update user status (Admin only)
router.patch('/:id/status', authorize('Administrator'), updateUserStatus);

export default router; 