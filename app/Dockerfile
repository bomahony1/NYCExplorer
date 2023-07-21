# Use the official Node.js image as the base image
FROM node:14

# Set environment variable
ENV CI=true

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy the React application code into the container
COPY . /app/

# Expose the React application port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
