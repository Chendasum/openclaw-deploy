FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Expose the port
EXPOSE 18789

# Run your app (adjust entry file if needed)
CMD ["node", "index.js"]
