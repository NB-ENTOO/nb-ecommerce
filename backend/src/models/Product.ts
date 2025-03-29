import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide a product image URL'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock information'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema); 