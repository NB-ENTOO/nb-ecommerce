import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Interface for decoded JWT token
interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

// Middleware to protect routes that require authentication
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_jwt_secret_key_here'
      ) as jwt.JwtPayload;

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user is active
      if (user.status !== 'Active') {
        return res.status(401).json({
          success: false,
          message: 'Your account is inactive'
        });
      }

      // Add user to request object
      (req as any).user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Middleware to restrict access based on user role
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Get user from request (added by protect middleware)
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${user?.role || 'unknown'} is not authorized to access this route`,
      });
    }

    next();
  };
};

// Restrict to specific roles
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to perform this action'
      });
    }
    
    next();
  };
}; 