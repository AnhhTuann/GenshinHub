# TeyvatDB - Genshin Impact Wiki & Tracker 🌟

**TeyvatDB** là một nền tảng cơ sở dữ liệu và bách khoa toàn thư toàn diện dành cho game Genshin Impact. Dự án cung cấp thông tin chi tiết về hệ thống nhân vật, vũ khí, thánh di vật, và nguyên liệu nâng cấp, đồng thời hỗ trợ tra cứu các đội hình (teams) và hướng dẫn build (artifacts & weapons) tối ưu nhất cho từng nhân vật.

## 🎯 Mục đích và Công dụng
- **Tra cứu Bách Khoa Toàn Thư:** Xem chi tiết về cốt truyện, hình ảnh, thông số (level 90) và kỹ năng của mọi nhân vật trong Genshin Impact.
- **Hướng dẫn Build:** Gợi ý cách lên đồ, ưu tiên kỹ năng, và cách xếp đội hình mạnh nhất cho từng nhân vật.
- **Đồng bộ Dữ liệu Tự động:** Tích hợp script cào dữ liệu (crawl/seed) trực tiếp từ các nguồn uy tín như *yatta.moe* (Project Amber cũ) và *Enka.Network* để luôn cập nhật những nhân vật mới nhất.

## 🏗️ Cấu trúc Dự án
Dự án được phát triển theo mô hình Client-Server (Monorepo), bao gồm:
- **[frontend/](./frontend/)**: Giao diện người dùng được xây dựng bằng **Next.js 15** và **TailwindCSS**, tập trung vào trải nghiệm mượt mà, tối ưu SEO và thiết kế đẹp mắt.
- **[backend/](./backend/)**: API Server được xây dựng bằng **Apollo Server (GraphQL)** và **Prisma (ORM)**, tương tác với cơ sở dữ liệu **PostgreSQL**.

---

## 🚀 Hướng dẫn Cài đặt & Chạy Dự án

### 1. Khởi động Cơ sở dữ liệu (PostgreSQL)
Dự án sử dụng Docker Compose để khởi tạo PostgreSQL một cách nhanh chóng.
```bash
cd backend
docker-compose up -d
```
*(Database sẽ chạy ở port 5433 với thông tin đăng nhập mặc định trong file `.env`)*

### 2. Khởi động Backend (GraphQL API)
Mở một terminal mới và chạy các lệnh sau:
```bash
cd backend
npm install
npx prisma db push   # Khởi tạo các bảng trong Database
npm run dev          # Chạy server ở http://localhost:4000
```

### 3. Nạp dữ liệu mẫu (Seeding)
Để trang web có dữ liệu (nhân vật, vũ khí...), bạn cần chạy script seed (cào dữ liệu từ yatta.moe):
```bash
cd backend
npm run prisma:seed
```
*(Quá trình này có thể mất khoảng 1 phút. Dữ liệu bao gồm 106 nhân vật gốc, vũ khí, thánh di vật và nguyên liệu).*

### 4. Khởi động Frontend (Next.js UI)
Mở một terminal khác và chạy:
```bash
cd frontend
npm install
npm run dev          # Chạy frontend ở http://localhost:3000
```

---

## 🗄️ Quản lý Cơ sở dữ liệu (Prisma Studio)
Để xem, chỉnh sửa, hoặc xóa dữ liệu trong database một cách trực quan bằng giao diện web, hãy sử dụng **Prisma Studio**:
```bash
cd backend
npx prisma studio
```
Truy cập `http://localhost:5555` trên trình duyệt để mở giao diện quản lý.
