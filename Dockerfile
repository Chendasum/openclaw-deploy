FROM node:20

WORKDIR /app

# Install OpenClaw globally from GitHub
RUN npm install -g github:imperiumcapitalkh/openclaw

# Run OpenClaw gateway
CMD ["openclaw", "gateway"]
