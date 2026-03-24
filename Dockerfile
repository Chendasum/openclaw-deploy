FROM node:20

WORKDIR /app

RUN npm install -g openclaw

CMD ["openclaw", "gateway"]
