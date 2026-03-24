FROM node:20

WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies (this installs openclaw too)
RUN npm install

# Copy the rest of your project
COPY . .

# Run OpenClaw gateway
CMD ["npx", "openclaw", "gateway"]
