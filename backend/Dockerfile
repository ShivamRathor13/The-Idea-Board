# Use Node.js LTS
FROM node:22.20.0-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose backend port
EXPOSE 4000

# Start backend
CMD ["node", "server.js"]
