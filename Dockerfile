FROM node:20

WORKDIR /app

# Install OpenClaw via HTTPS
RUN npm install -g https://github.com/imperiumcapitalkh/openclaw/archive/refs/heads/main.tar.gz

ENV PORT=8080

CMD ["node", "/usr/local/lib/node_modules/openclaw/dist/cli.js", "gateway", "--port", "8080"]
