import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import productRoutes from './routes/productRoutes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce API is running');
});

// API routes
app.use('/api/products', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export default app; 