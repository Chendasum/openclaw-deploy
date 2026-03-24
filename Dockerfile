FROM node:20

WORKDIR /app

RUN npm install openclaw

ENV PORT=8080

CMD ["npx", "openclaw", "gateway", "--port", "8080"]
