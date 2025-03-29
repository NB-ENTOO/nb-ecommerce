import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

// Get all products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Get single product
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Create new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
}; 