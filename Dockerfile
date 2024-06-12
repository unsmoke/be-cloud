FROM node:18

WORKDIR /app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE ${PORT:-8080}

CMD ["npm", "start"]
