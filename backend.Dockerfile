# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY backend/package*.json ./

# Install dependencies
RUN npm ci

COPY backend/ .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/seeders ./src/seeders

EXPOSE 5000

CMD ["node", "dist/index.js"] 