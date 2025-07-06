# Use the Node.js 14 Buster Slim base image
FROM node:14-buster-slim

# Create and set the application directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Run the application
CMD ["node", "index.js"]