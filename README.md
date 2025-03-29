# E-Commerce Website

A modern e-commerce application with a React/Next.js frontend and a Node.js/Express backend.

## Features

- Responsive design with mobile-first approach
- Product listings with filtering and sorting capabilities
- Detailed product pages
- Shopping cart functionality
- User profiles and order history
- Checkout flow with multiple steps

## Tech Stack

### Frontend
- Next.js 13 (with App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React for icons

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Docker for containerization

## Getting Started

### Prerequisites
- Node.js 16+
- Docker and Docker Compose

### Running the Backend
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`

4. Start the backend services with Docker:
   ```
   docker-compose up -d
   ```

5. Run the development server:
   ```
   npm run dev
   ```
   The API will be available at http://localhost:5000

### Running the Frontend
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   The website will be available at http://localhost:3000

## Project Structure

```
├── backend/                # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Express app
│   ├── Dockerfile          # Backend Docker configuration
│   └── package.json        # Backend dependencies
│
├── frontend/               # Next.js application
│   ├── app/                # Next.js app router
│   ├── components/         # React components
│   │   ├── layout/         # Layout components (header, footer)
│   │   └── ui/             # Reusable UI components
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
└── docker-compose.yml      # Docker services configuration
``` 