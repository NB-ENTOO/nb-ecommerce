# NB E-commerce Backend

This is the backend server for the NB E-commerce platform, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication and authorization
- Role-based access control (Administrator, Editor, Viewer)
- User management API
- MongoDB database integration
- TypeScript support
- JWT authentication
- Environment configuration
- Error handling middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nb-ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

4. Seed the initial admin user:
   ```bash
   npm run seed:admin
   ```
   This will create an admin user with the following credentials:
   - Email: admin@example.com
   - Password: admin123

5. Build the TypeScript code:
   ```bash
   npm run build
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on http://localhost:5000

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm run seed:admin` - Seed the initial admin user

## API Endpoints

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PATCH /api/users/:id/status` - Update user status (Admin only)

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Security

- All routes are protected with JWT authentication
- Role-based access control for admin routes
- Password hashing with bcrypt
- CORS enabled
- Environment variables for sensitive data

## Development

The project uses TypeScript for type safety and better developer experience. Make sure to:

1. Follow the existing code style
2. Add appropriate type annotations
3. Handle errors properly
4. Test your changes before committing

## License

ISC 