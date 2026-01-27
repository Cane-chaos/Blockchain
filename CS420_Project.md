# PROJECT PLAN: NỀN TẢNG HỌC TRỰC TUYẾN WEB3

**Ngày lập:** 20/01/2026
**Loại dự án:** Đồ án môn học (MVP Focus)
**Thời gian:** 8 tuần (8h/tuần)
**Mục tiêu:** Demo thành công luồng: Mua khóa học bằng ETH -> Học giả lập -> Nhận chứng chỉ NFT.
**Tech Stack:**
* **Frontend:** Vue.js, TailwindCSS.
* **Backend:** Node.js, Express, **MongoDB**.
* **Blockchain:** Solidity, Ganache, Web3.js.

---

## I. PHÂN CHIA NHÂN SỰ (3 MEMBERS)

### 1. Thành viên A: Frontend Lead (Vue.js & UI/UX)
**Chiến lược:** "Dynamic UI". Giao diện đẹp, gọi dữ liệu động từ Backend.
* **Công việc cụ thể:**
    * **Data Strategy:** Dùng `Axios` hoặc `Fetch API` để gọi dữ liệu từ Server của C. Không dùng file JSON cứng.
    * **Pages:**
        * *Home:* Gọi API `GET /api/courses` để render danh sách khóa học.
        * *Course Detail:* Gọi API lấy chi tiết khóa học. Có nút "Hoàn thành" giả lập.
        * *Profile:* Trang "khoe" chiến tích. Hiển thị Grid các NFT (kết hợp dữ liệu từ Blockchain và Metadata từ DB nếu cần).
    * **Interaction:**
        * Loading State: Spinner xoay khi chờ API phản hồi và Blockchain xác nhận.
        * Modal: Xử lý các thông báo lỗi nếu API Server bị down.

### 2. Thành viên B: Blockchain Lead (Solidity & Ganache)
**Chiến lược:** "Simple Logic". Smart Contract giữ nguyên logic, mapping ID khớp với DB.
* **Công việc cụ thể:**
    * **Infrastructure:** Setup Ganache, đảm bảo RPC hoạt động ổn định.
    * **Contract 1 - Marketplace.sol:**
        * Lưu ý quan trọng: `courseId` trong Smart Contract phải khớp với field `courseId` (Int) trong MongoDB (không dùng `_id` mặc định của Mongo vì nó là Hex String, khó xử lý trong Solidity cơ bản).
    * **Contract 2 - Certificate.sol (ERC-721):**
        * Logic: Check `isPurchased` -> Mint.
    * **Testing:** Viết Unit Test cho Contract để đảm bảo logic dòng tiền đúng.

### 3. Thành viên C: Backend & Integration Lead (NodeJS + Web3)
**Chiến lược:** "The Backbone". Dựng Server kết nối DB và xử lý Web3 ở Client.
* **Công việc cụ thể:**
    * **Backend (New):**
        * Dựng Server Node.js/Express.
        * Kết nối MongoDB (dùng Mongoose).
        * Viết API:
            * `GET /api/courses`: Trả về danh sách khóa học.
            * `GET /api/courses/:id`: Trả về chi tiết.
    * **Web3 Integration:**
        * Xử lý kết nối MetaMask ở Frontend (vì team chỉ có 3 người, C sẽ phụ trách logic JS logic này bên trong code Vue của A).
        * Đồng bộ trạng thái: Khi User mua xong trên Blockchain, có thể (tùy chọn) gọi API `POST /api/user/enroll` để lưu backup vào DB (Hybrid storage).

---

## II. CẤU TRÚC DỮ LIỆU (MONGODB SCHEMA)
*Thay vì file JSON, Thành viên C sẽ tạo Schema Mongoose như sau:*

**Collection: `courses`**
> **Lưu ý:** Chúng ta vẫn giữ một field `id` dạng số (Number) để map với Smart Contract, thay vì dùng `_id` mặc định của MongoDB.

```javascript
const CourseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Map với Smart Contract
  title: { type: String, required: true },
  price: { type: String, required: true }, // Lưu String để dễ convert sang Wei
  image: { type: String }, // URL ảnh thumbnail
  videoUrl: { type: String }, // URL Youtube embed
  nftImage: { type: String } // URL ảnh chứng chỉ
});
```
# 📅 PROJECT ROADMAP: WEB3 COURSE & NFT SYSTEM

**Thời gian thực hiện:** 8 Tuần (2 Tháng)
**Cường độ:** 8h/tuần/thành viên
**Phương pháp:** Agile/Waterfall lai tạo (Focus vào MVP Demo)

---

## 🛑 GIAI ĐOẠN 1: KHỞI TẠO & GIAO DIỆN TĨNH (TUẦN 1 - 2)
*Mục tiêu: Mọi người đều chạy được code trên máy, có giao diện web cơ bản (chưa nối Blockchain).*

### Tuần 1: Environment & Setup
- [ ] **Team:** Họp chốt cấu trúc thư mục Github.
- [ ] **B (Blockchain):** Cài đặt Ganache, tạo Workspace mới. Note lại `RPC URL` và `Network ID`.
- [ ] **A (Frontend):** Init Vue.js project (Vite + Vue 3). Cài TailwindCSS.
- [ ] **C (Integration):** Tìm hiểu tài liệu Web3.js/Ethers.js, thử kết nối MetaMask với Ganache trên trình duyệt.

### Tuần 2: Static UI & Data Mocking
- [ ] **A (Frontend):**
    - Tạo file `courses.json` (Hardcode dữ liệu 3 khóa học).
    - Code giao diện **Home Page** (hiển thị list khóa học).
    - Code giao diện **Course Detail** (nhúng iframe Youtube giả).
- [ ] **B (Blockchain):**
    - Viết Draft contract `Marketplace.sol`.
    - Định nghĩa Struct `Course`.
    - Viết script deploy đơn giản bằng Truffle hoặc Hardhat.
- [ ] **C (Integration):**
    - Viết module `useWallet.js`: Chức năng Connect/Disconnect ví.

---

## 🚀 GIAI ĐOẠN 2: CHỨC NĂNG THANH TOÁN (TUẦN 3 - 4)
*Mục tiêu: Chức năng "Mua khóa học" hoạt động. Tiền ETH ảo bị trừ.*

### Tuần 3: Smart Contract Logic & Integration
- [ ] **B (Blockchain):**
    - Hoàn thiện hàm `buyCourse()`.
    - Deploy lên Ganache -> Gửi file `ABI` và `Contract Address` cho C.
- [ ] **C (Integration):**
    - Dùng Web3.js gọi hàm `buyCourse()` từ UI.
    - Xử lý sự kiện: Click nút Mua -> MetaMask hiện Popup -> Confirm.
- [ ] **A (Frontend):**
    - Design component **Loading Spinner** (Bắt buộc phải có khi chờ xác nhận transaction).
    - Design Modal thông báo: "Mua thành công" hoặc "Giao dịch thất bại".

### Tuần 4: Sync State (Đồng bộ trạng thái)
- [ ] **C (Integration):**
    - Viết logic kiểm tra: Load trang -> Check Blockchain -> Nếu đã mua thì ẩn nút "Mua", hiện nút "Vào học".
- [ ] **Team:**
    - Test chéo: A đóng vai user mua hàng của B. Kiểm tra xem Ganache có trừ tiền đúng không.

---

## 🏆 GIAI ĐOẠN 3: HỆ THỐNG NFT CHỨNG CHỈ (TUẦN 5 - 6)
*Mục tiêu: Học xong nhận được bằng khen NFT về ví.*

### Tuần 5: NFT Smart Contract
- [ ] **B (Blockchain):**
    - Viết contract `Certificate.sol` (dựa trên ERC-721).
    - Logic: Hàm `mint()` phải gọi sang `Marketplace` để check xem user mua khóa học chưa (Security giả lập).
    - Deploy lên Ganache.
- [ ] **A (Frontend):**
    - Làm trang **My Profile**: Nơi hiển thị lưới các chứng chỉ đã nhận.
    - Làm nút "Hoàn thành khóa học" ở trang Detail.

### Tuần 6: Minting Flow
- [ ] **C (Integration):**
    - Nối nút "Hoàn thành" với hàm `mint()`.
    - Fetch dữ liệu NFT (Ảnh, Tên) về hiển thị tại trang Profile.
- [ ] **Team:**
    - Fix bug logic: Đảm bảo user chưa mua thì không mint được (nếu làm kịp), hoặc ít nhất user mua xong mới thấy nút mint.

---

## 🏁 GIAI ĐOẠN 4: HOÀN THIỆN & DEMO (TUẦN 7 - 8)
*Mục tiêu: Mọi thứ mượt mà cho 15 phút trình bày.*

### Tuần 7: Polish & Bug Fixing
- [ ] **A (Frontend):**
    - Trau chuốt CSS, icon, font chữ.
    - Xử lý các case layout bị vỡ.
- [ ] **C (Integration):**
    - Bắt lỗi (Catch Error): Nếu user từ chối xác nhận ở MetaMask thì web không được crash.
- [ ] **B (Blockchain):**
    - Reset lại Ganache sạch sẽ cho lần test cuối.

### Tuần 8: Final Prep (Quan trọng)
- [ ] **Backup Demo:** Quay video màn hình một luồng chạy hoàn hảo (Happy Path) từ đầu đến cuối. Lưu lại đề phòng lúc Demo bị lỗi mạng/máy đơ.
- [ ] **Slide:** Soạn slide báo cáo (Cấu trúc hệ thống, Tech stack, Screenshots).
- [ ] **Rehearsal:** Chạy thử kịch bản demo 2-3 lần.

---

> **💡 Lời khuyên của Leader:**
> * Đừng cố làm thêm tính năng ở Tuần 7.
> * Nếu gặp bug khó quá ở Tuần 6 -> **Fake nó luôn ở Frontend** (Ví dụ: NFT chưa load được ảnh thì hardcode ảnh mặc định vào). Quan trọng là luồng đi trơn tru.
