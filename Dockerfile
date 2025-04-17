FROM node:lts-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 lock 檔
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製專案檔案（包含 src/）
COPY . .

# 編譯 Next.js App
RUN npm run build

# 開啟 Port 3000（供 Nginx Proxy）
EXPOSE 3000

CMD ["npm", "start"]

