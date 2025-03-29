import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Login user and return JWT token
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Find user
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check if user is active
    if (user.status !== 'Active') {
      return res.status(401).json({ 
        success: false, 
        message: 'Your account is inactive. Please contact an administrator.' 
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '1d' }
    );

    // Return token and user info (without password)
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Get current user profile
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // The user ID will be attached by the auth middleware
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Register new admin user (protected, only existing admins can create new admin accounts)
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate request
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Validate role
    const allowedRoles = ['Administrator', 'Editor', 'Viewer'];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Viewer', // Default to Viewer if no role specified
      status: 'Active'
    });

    // Return success without password
    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Request password reset
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email'
      });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '1h' }
    );

    // Save reset token and expiry to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // In production, send email with reset link
    // For development, just return the token
    return res.status(200).json({
      success: true,
      message: 'Password reset token generated',
      resetToken // Remove this in production
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Reset password with token
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide reset token and new password'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your_jwt_secret_key_here'
      ) as jwt.JwtPayload;

      // Find user
      const user = await User.findOne({
        _id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token'
        });
      }

      // Update password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Password has been reset'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token'
      });
    }
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 