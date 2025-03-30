# NET-BRIDGE Server Solutions Platform

A professional B2B server and networking equipment lead generation platform built with Next.js, Express, MongoDB, and Docker. The platform showcases enterprise-grade hardware solutions and generates sales inquiries through configuration requests.

## Project Overview

NET-BRIDGE Server Solutions is a tech-focused platform that enables:
- Browsing detailed server and networking equipment options
- Configuring custom server solutions
- Generating PDF specifications of configurations
- Submitting inquiries via email form

## Completed Features

### Core Platform
- Modern, responsive UI built with Next.js 13+ and Tailwind CSS
- Professional tech-focused design
- Server configuration tool with PDF generation
- Direct email inquiry system for sales team
- Comprehensive admin panel for product management

### Product Catalog
- Detailed server equipment listings
- Technical specifications display
- Filtering and search functionality
- Server comparison capabilities
- Mobile-responsive product views

### Admin Panel
- Product management interface
- Category management
- Bulk product import interface
- Dashboard with statistics
- Responsive admin layout

### Technical Infrastructure
- Next.js 13+ with App Router
- Express backend with MongoDB
- Docker containerization
- TypeScript implementation
- Tailwind CSS styling

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (v8+ recommended)

## Development Environment Setup

### Required Global Dependencies
```bash
# Install TypeScript globally
npm install -g typescript

# Install nodemon for development
npm install -g nodemon

# Install Next.js CLI
npm install -g create-next-app
```

### Frontend Dependencies Setup
```bash
cd frontend

# UI Components
npm install @radix-ui/react-slider @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-slot
npm install @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-toast @radix-ui/react-avatar
npm install lucide-react

# Form Handling
npm install react-hook-form zod @hookform/resolvers

# Authentication
npm install next-auth @auth/core
npm install jsonwebtoken @types/jsonwebtoken

# Data Fetching & State Management
npm install axios swr

# PDF Generation
npm install jspdf html2canvas
```

### Backend Dependencies Setup
```bash
cd backend

# Core Dependencies
npm install express cors helmet mongoose dotenv
npm install bcryptjs jsonwebtoken express-validator multer

# TypeScript Dependencies
npm install -D typescript @types/node @types/express @types/cors @types/bcryptjs
npm install -D @types/jsonwebtoken @types/multer ts-node-dev

# Development Tools
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
```

### Database Setup
1. Install MongoDB Community Edition or use Docker:
   ```bash
   # Using Docker
   docker pull mongodb/mongodb-community-server
   docker volume create mongodb_data
   docker run -d -p 27017:27017 -v mongodb_data:/data/db --name mongodb mongodb/mongodb-community-server
   ```

2. Initialize required collections:
   ```bash
   mongosh
   use nb-ecommerce
   db.createCollection('users')
   db.createCollection('products')
   db.createCollection('categories')
   ```

### Environment Configuration
Create the following .env files:

1. Root .env:
```env
NODE_ENV=development
```

2. Frontend .env:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

3. Backend .env:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nb-ecommerce
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### Post-Installation Steps
1. Initialize Tailwind CSS:
   ```bash
   cd frontend
   npx tailwindcss init -p
   ```

2. Generate JWT keys:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. Set up Git hooks:
   ```bash
   npm install -D husky
   npx husky install
   ```

4. Create initial admin user:
   ```bash
   cd backend
   npm run seed:admin
   ```

## Getting Started

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nb-ecommerce
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment files:
   ```bash
   # Root .env
   NODE_ENV=development
   
   # Frontend .env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # Backend .env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nb-ecommerce
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Start backend (in backend directory)
   npm run dev
   
   # Start frontend (in frontend directory)
   npm run dev
   ```

### Docker Setup

1. Start all services:
   ```bash
   docker-compose up
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin

## Current Focus

### Authentication System Implementation
- Updating NextAuth.js configuration for App Router
- Connecting NextAuth with backend JWT authentication
- Setting up role-based authorization for admin access
- Implementing protected routes middleware

### Admin Panel Enhancement
- Implementing image upload for products
- Connecting product management to backend API
- Implementing CSV/JSON import processing
- Adding user management for admin accounts

### Database Seeding
- Defining comprehensive server product data model
- Creating seed data for server components
- Implementing database seeding automation
- Testing data integrity

### Docker Optimization
- Debugging container networking issues
- Implementing proper volume mounting
- Optimizing container configuration
- Testing multi-container communication

## Upcoming Tasks

### Testing Implementation
- Creating test plan for server configuration features
- Testing PDF generation functionality
- Testing email delivery system
- Cross-browser compatibility testing
- Performance testing

### Performance Optimization
- Analyzing performance bottlenecks
- Optimizing image loading
- Implementing code splitting
- Configuring caching strategies
- Optimizing API response times

### Deployment Preparation
- Setting up CI/CD pipeline
- Configuring production Docker containers
- Setting up monitoring and analytics
- Creating deployment documentation
- Implementing security best practices

## Architecture

- **Frontend**: Next.js 13+, React 18, TypeScript, Tailwind CSS
- **Backend**: Express, Node.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Infrastructure**: Docker, Docker Compose
- **PDF Generation**: Client-side JavaScript
- **Email System**: Backend service integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 

## Technical Implementation Details

### Frontend Architecture
```typescript
// Component Structure
src/
  ├── app/                    # Next.js 13 App Router pages
  ├── components/             # Reusable React components
  │   ├── ui/                # Base UI components
  │   ├── products/          # Product-related components
  │   ├── admin/             # Admin panel components
  │   └── shared/            # Shared components
  ├── lib/                   # Utility functions and helpers
  ├── hooks/                 # Custom React hooks
  ├── types/                 # TypeScript type definitions
  └── styles/                # Global styles and Tailwind

// Key Type Definitions
interface IProduct {
  id: string;
  name: string;
  description: string;
  specifications: Record<string, any>;
  category: string;
  price: number;
  stock: number;
  images: string[];
}

interface ICategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: ICategory[];
}
```

### Backend Architecture
```typescript
// API Structure
src/
  ├── controllers/           # Request handlers
  ├── models/               # MongoDB schemas
  ├── routes/               # API route definitions
  ├── middleware/           # Custom middleware
  ├── services/            # Business logic
  ├── utils/               # Helper functions
  └── types/               # TypeScript types

// Key MongoDB Schemas
interface ProductSchema {
  name: string;
  description: string;
  specifications: {
    processor?: {
      model: string;
      cores: number;
      frequency: number;
    };
    memory?: {
      size: number;
      type: string;
      speed: number;
    };
    storage?: Array<{
      type: string;
      size: number;
      interface: string;
    }>;
  };
  category: Types.ObjectId;
  price: number;
  stock: number;
  images: string[];
}
```

### Authentication Flow
```typescript
// NextAuth.js Configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        // Validate against backend API
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials)
        });
        const user = await response.json();
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    }
  }
};
```

### Docker Configuration
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      target: development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://backend:5000
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      target: development
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongodb:27017/nb-ecommerce
    ports:
      - "5000:5000"
    depends_on:
      - mongodb

  mongodb:
    image: mongodb/mongodb-community-server
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongodb_data:
```

### Development Scripts
```json
// package.json (frontend)
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}

// package.json (backend)
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "test": "jest",
    "seed:admin": "ts-node src/scripts/createAdmin.ts"
  }
}
``` 