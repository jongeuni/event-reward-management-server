# Node.js 18 버전 고정
FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY libs ./libs
COPY auth ./auth
RUN npm install

RUN npm run build  # 빌드 실행

CMD ["node", "auth/dist/main.js"]