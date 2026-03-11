# 🎓 Web3 Course Platform

Nền tảng học trực tuyến phi tập trung — người dùng mua khóa học bằng **ETH** qua MetaMask, quyền truy cập được xác thực trực tiếp trên **Blockchain**.

---

## 🏗 Kiến trúc hệ thống

```
[Vue.js Frontend :5173]
        │  REST API          │  MetaMask (window.ethereum)
        ▼                    ▼
[Node.js + Express :8080]   [Ganache :7545]
        │                    │
   [MongoDB :27017]    [Marketplace.sol]
```

| Service | Container | Port |
|---|---|---|
| MongoDB | `cs420_mongo` | 27017 |
| Backend (Node.js) | `cs420_server` | 8080 |
| Frontend (Vue.js) | `cs420_client` | 5173 |
| Smart Contract Deployer | `cs420_blockchain` | — |

> **Ganache chạy trên host machine**, không chạy trong Docker.

---

## ⚙️ Yêu cầu môi trường

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (đã bao gồm Docker Compose)
- [Ganache Desktop](https://trufflesuite.com/ganache/) — Ethereum local testnet
- [MetaMask](https://metamask.io/download/) — browser extension
- Node.js 18+ *(chỉ cần nếu muốn chạy seed script local)*

---

## 🚀 Hướng dẫn chạy (từ đầu)

### Bước 1: Cấu hình Ganache

1. Mở **Ganache Desktop** → chọn **Quickstart Ethereum**
2. Vào **Settings** (biểu tượng bánh răng) → tab **Server**:
   - **Hostname:** `127.0.0.1`
   - **Port:** `7545`
   - **Network ID:** `1337`
3. Lưu lại và đảm bảo Ganache đang chạy hiển thị danh sách accounts

### Bước 2: Deploy Smart Contract lên Ganache

```bash
cd blockchain
npm install
node scripts/deploy.js
```

Lệnh này sẽ:
- Compile `contracts/Marketplace.sol`
- Deploy lên Ganache tại `http://127.0.0.1:7545`
- Tự động tạo/cập nhật file `deployment-info.json` trong 2 vị trí:
  - `blockchain/deployment-info.json`
  - `client/src/deployment-info.json` *(Frontend tự đọc)*

### Bước 3: Khởi động toàn bộ hệ thống bằng Docker Compose

```bash
# Từ thư mục gốc của dự án
docker compose up -d --build
```

Đợi khoảng 30–60 giây để các service khởi động xong.

### Bước 4: Seed dữ liệu khóa học vào MongoDB

```bash
docker exec cs420_server node src/seed.js
```

Lệnh này nạp sẵn **6 khóa học** vào database:

| ID | Tên khóa học | Giá (ETH) | Cấp độ |
|---|---|---|---|
| 1 | Blockchain Fundamentals | 0.05 | Beginner |
| 2 | Smart Contract with Solidity | 0.08 | Intermediate |
| 3 | Web3 & DApp Development | 0.10 | Intermediate |
| 4 | Ethereum for Developers | 0.07 | Beginner |
| 5 | DeFi Fundamentals | 0.09 | Intermediate |
| 6 | Blockchain Security | 0.10 | Advanced |

### Bước 5: Cấu hình MetaMask

1. Mở MetaMask → **Add a network manually**
2. Điền thông tin:

| Trường | Giá trị |
|---|---|
| Network Name | `Ganache Local` |
| RPC URL | `http://127.0.0.1:7545` |
| Chain ID | `1337` |
| Currency Symbol | `ETH` |

3. **Import account test từ Ganache vào MetaMask:**
   - Trong Ganache, click biểu tượng 🔑 cạnh bất kỳ account nào
   - Copy **Private Key**
   - MetaMask → Account → **Import Account** → dán private key vào
   - Account này sẽ có sẵn ~100 ETH test

### Bước 6: Truy cập ứng dụng

| URL | Mô tả |
|---|---|
| http://localhost:5173 | Frontend (Vue.js) |
| http://localhost:8080/api/courses | Backend API — danh sách khóa học |
| http://localhost:8080/health | Backend health check |

---

## 📋 Các lệnh thường dùng

```bash
# Xem logs tất cả service
docker compose logs -f

# Xem logs riêng từng service
docker compose logs -f server
docker compose logs -f client

# Dừng tất cả service
docker compose down

# Dừng và xóa toàn bộ volume (reset database)
docker compose down -v

# Restart một service cụ thể
docker compose restart server

# Seed lại database (xóa dữ liệu cũ và tạo mới)
docker exec cs420_server node src/seed.js
```

---

## 🔄 Quy trình sử dụng (User Flow)

```
1. Vào http://localhost:5173
2. Click "Connect Wallet" → MetaMask popup → Chọn account
3. Vào /courses → Chọn khóa học muốn mua
4. Click "Buy Course" → Checkout page
5. Click "Pay X ETH" → MetaMask hiện popup xác nhận → Confirm
6. Sau khi blockchain xác nhận → Redirect sang trang học (/learn/:id)
7. Vào /profile để xem lại các khóa học đã mua
```

---

## ⚠️ Lưu ý quan trọng

> **Mỗi khi reset Ganache** — contract address thay đổi, bắt buộc phải:
> 1. Chạy lại `node blockchain/scripts/deploy.js`
> 2. Chạy lại `docker compose up -d --build` (để client nhận `deployment-info.json` mới)
> 3. Chạy lại `docker exec cs420_server node src/seed.js`

> **MetaMask báo "Wrong network"** — Đảm bảo đang chọn network `Ganache Local` (Chain ID 1337) trong MetaMask.

> **Giao dịch bị reject "Course not found"** — Khóa học chưa được tạo trên blockchain. Hệ thống sẽ tự động gọi `createCourse()` trước khi `buyCourse()`, nếu vẫn lỗi hãy thử lại.

---

## 📂 Cấu trúc thư mục

```
Blockchain/
├── blockchain/              # Smart Contract
│   ├── contracts/
│   │   └── Marketplace.sol  # Contract chính
│   ├── scripts/
│   │   └── deploy.js        # Script deploy lên Ganache
│   ├── deployment-info.json # Contract address + ABI (sau khi deploy)
│   └── hardhat.config.js
│
├── server/                  # Backend API
│   └── src/
│       ├── app.js           # Express app entry point
│       ├── seed.js          # Script nạp dữ liệu mẫu
│       ├── models/
│       │   ├── Course.js    # MongoDB schema khóa học
│       │   └── Enrollment.js # MongoDB schema lịch sử mua hàng
│       └── routes/
│           ├── courses.js   # GET /api/courses, GET /api/courses/:id
│           └── enrollments.js # POST /api/enrollments, GET /api/enrollments/:wallet
│
├── client/                  # Frontend Vue.js
│   └── src/
│       ├── pages/           # 7 trang (Home, Courses, CourseDetail, Checkout, LearnCourse, Profile, Explore)
│       ├── components/      # Các component tái sử dụng
│       ├── stores/
│       │   └── wallet.js    # Global reactive state cho MetaMask
│       └── deployment-info.json # Tự động copy từ blockchain/ khi deploy
│
└── docker-compose.yml       # Orchestrate tất cả service
```

---

## 🛠 Tech Stack

| Lớp | Công nghệ |
|---|---|
| Frontend | Vue.js 3, Vite, TailwindCSS |
| Blockchain Client | Web3.js, MetaMask |
| Smart Contract | Solidity ^0.8.20, Hardhat |
| Local Blockchain | Ganache |
| Backend | Node.js, Express.js |
| Database | MongoDB 6.0, Mongoose |
| DevOps | Docker, Docker Compose |
