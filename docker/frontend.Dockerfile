FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Create and use node_modules cache folder
RUN mkdir -p /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

# Install dependencies
RUN npm install

# Copy frontend files
COPY frontend/ .

# Use development mode instead of build
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]