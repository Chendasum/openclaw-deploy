FROM node:20

WORKDIR /app

# Install OpenClaw globally and fix PATH
RUN npm install -g openclaw && npm cache clean --force

# Ensure global npm bin is in PATH
ENV PATH="/usr/local/bin:$PATH"

ENV PORT=8080

CMD ["sh", "-c", "openclaw gateway --port $PORT"]
