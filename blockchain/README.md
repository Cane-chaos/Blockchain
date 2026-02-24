# 🔗 BLOCKCHAIN MODULE - MARKETPLACE SMART CONTRACT

> **Dự án:** Nền tảng học trực tuyến Web3  
> **Smart Contract:** Marketplace.sol (ERC-20 Payment System)  
> **Network:** Ganache (Local Development)

---

## 📋 MỤC LỤC

1. [Tổng quan](#-tổng-quan)
2. [Cài đặt môi trường](#-cài-đặt-môi-trường)
3. [Cấu trúc Contract](#-cấu-trúc-contract)
4. [Deploy Contract](#-deploy-contract)
5. [Hướng dẫn cho Frontend (Thành viên A)](#-hướng-dẫn-cho-frontend-thành-viên-a)
6. [Hướng dẫn cho Backend (Thành viên C)](#-hướng-dẫn-cho-backend-thành-viên-c)
7. [Testing](#-testing)
8. [Troubleshooting](#-troubleshooting)

---

## 🎯 TỔNG QUAN

Smart Contract `Marketplace.sol` quản lý việc mua bán khóa học trên blockchain:
- Lưu trữ thông tin khóa học (title, price, image, videoUrl, nftImage)
- Xử lý thanh toán bằng ETH
- Tracking trạng thái mua hàng của user
- **Lưu ý quan trọng:** `courseId` trong contract phải khớp với field `id` (Number) trong MongoDB

### Thông tin Deployment hiện tại:
- **Contract Address:** `0xeB7B15E6da4edD0b4e02dfdaEe01731c869a6418`
- **Network:** Ganache (http://127.0.0.1:7545)
- **Chain ID:** 1337
- **Owner:** `0x772dBE2611e441B362322F8Cfd6Ff457cd0D2f74`

---

## 🛠 CÀI ĐẶT MÔI TRƯỜNG

### Prerequisites:
```bash
# Cài đặt Node.js (nếu chưa có)
# Tải từ: https://nodejs.org/

# Cài đặt Ganache
# Tải từ: https://trufflesuite.com/ganache/
# Hoặc cài qua npm:
npm install -g ganache
```

### Cài đặt dependencies:
```bash
cd blockchain
npm install
```

### Khởi động Ganache:
1. Mở Ganache GUI
2. Tạo workspace mới hoặc Quickstart
3. Đảm bảo RPC Server chạy ở: `http://127.0.0.1:7545`
4. Ghi lại các địa chỉ ví để test

---

## 📦 CẤU TRÚC CONTRACT

### Course Struct:
```solidity
struct Course {
    uint256 id;           // ID khớp với MongoDB (1, 2, 3,...)
    string title;         // Tên khóa học
    uint256 price;        // Giá (Wei)
    string image;         // URL ảnh thumbnail
    string videoUrl;      // URL video Youtube embed
    string nftImage;      // URL ảnh certificate NFT
    address payable owner; // Người tạo khóa học
    bool isActive;        // Trạng thái active/inactive
}
```

### Main Functions:

#### 1. `createCourse()` - Tạo khóa học mới
```solidity
function createCourse(
    uint256 _id,
    string memory _title,
    uint256 _price,
    string memory _image,
    string memory _videoUrl,
    string memory _nftImage
) public onlyContractOwner
```
**Chỉ contract owner mới được gọi**

#### 2. `buyCourse()` - Mua khóa học
```solidity
function buyCourse(uint256 _courseId) public payable
```
**User gửi ETH để mua khóa học**

#### 3. `hasUserPurchased()` - Kiểm tra đã mua chưa
```solidity
function hasUserPurchased(uint256 _courseId, address _user) 
    public view returns (bool)
```
**Dùng để check xem user đã mua khóa học ID này chưa**

#### 4. `getCourse()` - Lấy thông tin khóa học
```solidity
function getCourse(uint256 _courseId) 
    public view returns (Course memory)
```

---

## 🚀 DEPLOY CONTRACT

### Cách 1: Deploy mới (Reset toàn bộ)
```bash
node scripts/deploy.js
```

Script sẽ:
- Compile `Marketplace.sol`
- Deploy lên Ganache
- Tạo file `deployment-info.json` chứa Contract Address và ABI

### Cách 2: Sử dụng contract đã deploy
File `deployment-info.json` đã có sẵn với:
- Contract Address
- ABI (Application Binary Interface)
- Network info

**⚠️ Lưu ý:** Nếu reset Ganache thì phải deploy lại contract!

---

## 🎨 HƯỚNG DẪN CHO FRONTEND (Thành viên A)

### 1. Setup Web3 trong Vue.js

#### Cài đặt dependencies:
```bash
npm install web3
```

#### Tạo file `src/web3/marketplace.js`:
```javascript
import { Web3 } from 'web3';
import deploymentInfo from '../../blockchain/deployment-info.json';

// Kết nối với Ganache
const web3 = new Web3('http://127.0.0.1:7545');

// Khởi tạo contract instance
const marketplace = new web3.eth.Contract(
  deploymentInfo.contractABI,
  deploymentInfo.contractAddress
);

export { web3, marketplace };
```

### 2. Kết nối MetaMask

#### Component để connect wallet:
```javascript
import { web3 } from '@/web3/marketplace';

// Request account access
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      return accounts[0];
    } catch (error) {
      console.error('User denied account access');
    }
  } else {
    alert('Please install MetaMask!');
  }
}
```

#### Thêm Ganache vào MetaMask:
- Network Name: `Ganache Local`
- RPC URL: `http://127.0.0.1:7545`
- Chain ID: `1337`
- Currency Symbol: `ETH`

### 3. Mua khóa học

```javascript
import { marketplace } from '@/web3/marketplace';

async function buyCourse(courseId, priceInEth, userAddress) {
  try {
    const priceInWei = web3.utils.toWei(priceInEth, 'ether');
    
    const tx = await marketplace.methods.buyCourse(courseId).send({
      from: userAddress,
      value: priceInWei,
      gas: 3000000
    });
    
    console.log('Transaction hash:', tx.transactionHash);
    return tx;
  } catch (error) {
    console.error('Purchase failed:', error);
    throw error;
  }
}
```

### 4. Kiểm tra đã mua chưa

```javascript
async function checkPurchased(courseId, userAddress) {
  const hasPurchased = await marketplace.methods
    .hasUserPurchased(courseId, userAddress)
    .call();
  
  return hasPurchased;
}
```

### 5. UI Flow gợi ý:

**Trang Course Detail:**
```vue
<template>
  <div class="course-detail">
    <h1>{{ course.title }}</h1>
    <p>Giá: {{ course.price }} ETH</p>
    
    <!-- Nếu chưa mua -->
    <button v-if="!isPurchased" @click="handleBuy" :disabled="loading">
      {{ loading ? 'Đang xử lý...' : 'Mua khóa học' }}
    </button>
    
    <!-- Nếu đã mua -->
    <button v-else @click="gotoLearning">
      Vào học
    </button>
    
    <!-- Loading spinner -->
    <div v-if="loading" class="spinner">Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPurchased: false,
      loading: false,
      userAddress: null
    }
  },
  async mounted() {
    this.userAddress = await connectWallet();
    this.isPurchased = await checkPurchased(
      this.course.id, 
      this.userAddress
    );
  },
  methods: {
    async handleBuy() {
      this.loading = true;
      try {
        await buyCourse(this.course.id, this.course.price, this.userAddress);
        this.isPurchased = true;
        alert('Mua khóa học thành công!');
      } catch (error) {
        alert('Lỗi: ' + error.message);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
```

---

## 💻 HƯỚNG DẪN CHO BACKEND (Thành viên C)

### 1. Kết nối với Contract từ Node.js

#### Install Web3:
```bash
npm install web3
```

#### Tạo module `web3-service.js`:
```javascript
import { Web3 } from 'web3';
import fs from 'fs';
import path from 'path';

// Đọc deployment info
const deploymentInfo = JSON.parse(
  fs.readFileSync('./blockchain/deployment-info.json', 'utf8')
);

const web3 = new Web3('http://127.0.0.1:7545');
const marketplace = new web3.eth.Contract(
  deploymentInfo.contractABI,
  deploymentInfo.contractAddress
);

export { web3, marketplace };
```

### 2. API Endpoints gợi ý

#### GET /api/courses/:id/check-purchased
```javascript
import { marketplace } from './web3-service.js';

app.get('/api/courses/:id/check-purchased', async (req, res) => {
  try {
    const { id } = req.params;
    const { userAddress } = req.query;
    
    const hasPurchased = await marketplace.methods
      .hasUserPurchased(id, userAddress)
      .call();
    
    res.json({ 
      courseId: id,
      userAddress,
      hasPurchased 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### POST /api/courses/create (Admin only)
```javascript
app.post('/api/courses/create', async (req, res) => {
  try {
    const { id, title, price, image, videoUrl, nftImage } = req.body;
    
    // Giá từ ETH sang Wei
    const priceInWei = web3.utils.toWei(price.toString(), 'ether');
    
    // Gọi contract (cần private key của contract owner)
    const ownerAddress = '0x772dBE2611e441B362322F8Cfd6Ff457cd0D2f74';
    
    const tx = await marketplace.methods.createCourse(
      id, title, priceInWei, image, videoUrl, nftImage
    ).send({
      from: ownerAddress,
      gas: 3000000
    });
    
    // Lưu vào MongoDB
    await Course.create({ id, title, price, image, videoUrl, nftImage });
    
    res.json({ 
      success: true,
      transactionHash: tx.transactionHash 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 3. Hybrid Storage Strategy (Tùy chọn)

Bạn có thể lưu backup dữ liệu vào MongoDB để:
- Tăng tốc độ query
- Giảm số lần gọi blockchain
- Dễ search và filter

**Lưu ý:** Blockchain là source of truth, MongoDB chỉ là cache!

---

## 🧪 TESTING

### Chạy test script:
```bash
node scripts/test-course.js
```

Script sẽ test:
1. ✅ Tạo khóa học (hoặc skip nếu đã tồn tại)
2. ✅ Kiểm tra thông tin khóa học
3. ✅ Mua khóa học
4. ✅ Kiểm tra balance thay đổi
5. ✅ Verify trạng thái đã mua

### Customize test:
Sửa file `scripts/test-course.js`:
- `courseId`: ID khóa học cần test
- `buyer`: Địa chỉ ví người mua

---

## 🔧 TROUBLESHOOTING

### Lỗi: "Cannot connect to Ganache"
**Giải pháp:**
- Kiểm tra Ganache đang chạy
- Đảm bảo port 7545 không bị block
- Check RPC URL đúng: `http://127.0.0.1:7545`

### Lỗi: "User denied transaction"
**Giải pháp:**
- User phải approve trong MetaMask
- Giải thích cho user về transaction

### Lỗi: "Insufficient funds"
**Giải pháp:**
- Import account từ Ganache vào MetaMask
- Mỗi account trong Ganache có 100 ETH test

### Lỗi: "Course already exists"
**Giải pháp:**
- Mỗi `courseId` chỉ tạo được 1 lần
- Dùng ID khác (2, 3, 4...) cho khóa học mới
- Hoặc deploy lại contract (reset Ganache)

### Lỗi: "Only contract owner can create course"
**Giải pháp:**
- Chỉ account `0x772dBE2611e441B362322F8Cfd6Ff457cd0D2f74` mới tạo được course
- Đây là account deploy contract

### Lỗi: "User already purchased this course"
**Giải pháp:**
- Đúng logic! User không thể mua lại
- Dùng account khác để test

---

## 📂 CẤU TRÚC THỦ MỤC

```
blockchain/
├── contracts/
│   ├── Marketplace.sol      # Main contract
│   └── Migrations.sol       # Truffle migrations
├── scripts/
│   ├── deploy.js           # Deploy script
│   └── test-course.js      # Test script
├── deployment-info.json    # Contract Address + ABI
├── package.json
└── README.md              # File này
```

---

## 📚 TÀI LIỆU THAM KHẢO

- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ganache Documentation](https://trufflesuite.com/docs/ganache/)
- [MetaMask Guide](https://docs.metamask.io/)

---

## 👥 TEAM CONTACTS

- **Thành viên A (Frontend):** Sử dụng section "Hướng dẫn cho Frontend"
- **Thành viên B (Blockchain - You):** Maintain contract và deploy
- **Thành viên C (Backend):** Sử dụng section "Hướng dẫn cho Backend"

---

## 🔄 WORKFLOW TÍCH HỢP

1. **B (Blockchain)** deploy contract → tạo `deployment-info.json`
2. **A (Frontend)** import `deployment-info.json` → gọi contract từ UI
3. **C (Backend)** đọc `deployment-info.json` → sync data với MongoDB
4. **User** mua khóa học trên Frontend → transaction ghi vào blockchain
5. **Frontend** check `hasUserPurchased()` → hiển thị nút "Vào học"

---

**💡 Tips:**
- Test kỹ trên Ganache trước khi deploy lên testnet thật
- Giữ `deployment-info.json` trong source control để team sync
- Backup private key của contract owner
- Document mọi thay đổi trong contract

**🚀 Chúc team làm việc hiệu quả!**
