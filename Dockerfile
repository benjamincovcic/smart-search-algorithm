# Use official Node.js image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]