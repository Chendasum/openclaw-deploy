FROM node:20

WORKDIR /app

# Install OpenClaw via HTTPS (no SSH needed)
RUN npm install -g https://github.com/imperiumcapitalkh/openclaw/archive/refs/heads/main.tar.gz

ENV PORT=8080

CMD ["sh", "-c", "openclaw gateway --port 8080"]
