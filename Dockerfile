# Use Node.js 20 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the application using Vite's preview server
CMD ["npm", "run", "preview", "--", "--host", "--port", "8080"] 