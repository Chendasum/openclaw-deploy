FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y curl \
    && curl -L https://github.com/imperiumcapitalkh/openclaw/releases/latest/download/openclaw.tar.gz \
    | tar -xz -C /usr/local/bin

CMD ["openclaw", "gateway"]
