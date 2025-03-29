import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Import models (will need to create this file)
// Assuming the User model is at src/models/User.ts
import User from '../models/User';

const seedAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB for seeding');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists, skipping seed');
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123', // This should be hashed in the User model's pre-save hook
      role: 'Administrator',
      status: 'Active',
      lastLogin: new Date()
    });

    await adminUser.save();
    console.log('Admin user created successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

// Run the seeder if executed directly
if (require.main === module) {
  seedAdminUser()
    .then(() => {
      console.log('Admin user seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Admin user seeding failed:', error);
      process.exit(1);
    });
}

export default seedAdminUser; 