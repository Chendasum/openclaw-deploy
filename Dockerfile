FROM node:20

WORKDIR /app

RUN npm install -g openclaw

ENV PORT=8080

CMD ["sh", "-c", "openclaw gateway --port $PORT"]
