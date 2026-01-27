# Sử dụng Node.js phiên bản ổn định
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Mở port 5000 (hoặc port bạn config trong Express)
EXPOSE 5000

# Lệnh chạy server (dùng nodemon cho dev hoặc node cho prod)
CMD ["npm", "start"]