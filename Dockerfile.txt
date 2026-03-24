FROM node:20

WORKDIR /app

RUN npm install -g openclaw

EXPOSE 18789

CMD ["openclaw", "gateway", "--port", "18789"]
