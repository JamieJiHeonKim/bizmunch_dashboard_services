# Step 1: Build the app in a Node.js environment
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Step 2: Use a smaller Node.js image to run the app
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the compiled code and node_modules from the build step
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose the port the app runs on
EXPOSE 3001

# Start the app
CMD ["node", "build/index.js"]
