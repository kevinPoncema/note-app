# Use official lightweight Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied when available
COPY package*.json ./
RUN npm install --production

# Copy app source (will respect .dockerignore to exclude .env and node_modules)
COPY . .

# Expose application port
EXPOSE 3000

# Default command
CMD ["node", "index.js"]
