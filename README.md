# E-Commerce Web Application

A fully functional e-commerce web application built with Next.js, Express, MongoDB, and Docker.

## Features

- Modern, responsive UI built with Next.js and Tailwind CSS
- Comprehensive admin panel for product, user, and order management
- RESTful API with Express and MongoDB
- Containerized with Docker for easy deployment

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Running with Docker

1. Clone the repository:
   ```
   git clone <repository-url>
   cd e-commerce
   ```

2. Start the application using Docker Compose:
   ```
   docker-compose up
   ```

   This will start three containers:
   - MongoDB (database)
   - Express backend (API)
   - Next.js frontend (UI)

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin

4. To run in detached mode:
   ```
   docker-compose up -d
   ```

5. To stop the containers:
   ```
   docker-compose down
   ```

### Development Setup (without Docker)

1. Start MongoDB locally or use MongoDB Atlas.

2. Configure backend:
   ```
   cd backend
   cp .env.example .env
   # Edit .env file with your MongoDB connection string
   npm install
   npm run dev
   ```

3. Configure frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Admin Access

The admin panel can be accessed at http://localhost:3000/admin

Default admin credentials:
- Email: admin@example.com
- Password: password123

## Architecture

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Docker, Docker Compose

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 