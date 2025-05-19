# Node.js 18 버전 고정
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV AUTH_SERVER_URL=http://auth:3001
ENV EVENT_SERVER_URL=http://event:3002
ENV SECRET_KEY=test_key

RUN npm run build

CMD ["node", "dist/main"]