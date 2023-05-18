# Use the official Node.js 14 image as the base image
FROM node:19-alpine AS builder

# Set the working directory
WORKDIR /hacker-stories 

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]