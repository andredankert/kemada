# Build stage
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage to both locations
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist /app/dist

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy server files and environment
WORKDIR /app
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./
COPY .env.local ./

# Install Node.js and dependencies in the Nginx image
RUN apk add --update nodejs npm && npm install --production

# Expose ports
EXPOSE 80 8080

# Create log directories
RUN mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log && \
    touch /var/log/nginx/error.log && \
    chown -R nginx:nginx /var/log/nginx

# Start both Nginx and Node.js server with proper logging
CMD sh -c "nginx && tail -f /var/log/nginx/error.log & tail -f /var/log/nginx/access.log & node server.js"