# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_GOOGLE_API_KEY
ARG VITE_SPREADSHEET_ID
ARG VITE_SHEET_NAME
ARG VITE_SHEET_RANGE

# Set environment variables for build
ENV VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY
ENV VITE_SPREADSHEET_ID=$VITE_SPREADSHEET_ID
ENV VITE_SHEET_NAME=$VITE_SHEET_NAME
ENV VITE_SHEET_RANGE=$VITE_SHEET_RANGE

# Build the application
RUN chmod +x build.sh && ./build.sh

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
