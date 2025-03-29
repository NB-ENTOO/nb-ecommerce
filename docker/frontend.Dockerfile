FROM node:18-alpine AS deps

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies with cache
RUN npm install

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

# Development stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy from builder
COPY --from=builder /app ./

# Create cache folder and set permissions
RUN mkdir -p /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

# Expose port
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev"]