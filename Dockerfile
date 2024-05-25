# Use the official Ubuntu image
FROM ubuntu:latest

# Install Node.js, npm, and other dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get install -y build-essential

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the application port
EXPOSE 3000

# Default command
CMD ["npm", "run", "start:dev"]
