# Node.js 18 버전 고정
FROM node:18

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY libs ./libs
COPY gateway ./gateway

RUN npm install

RUN npm run build && echo "✅ Build Success" || echo "❌ Build Failed"
 # 빌드 실행

CMD ["node", "gateway/dist/main.js"]