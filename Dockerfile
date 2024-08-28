# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables (optional if you want to hardcode)
ENV SESSION_SECRET=34343434fsfdsfs

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
