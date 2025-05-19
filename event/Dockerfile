# Node.js 18 버전 고정
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV DB_URL=mongodb://mongodb:27017/event-db

RUN npm run build



CMD ["node", "dist/main"]