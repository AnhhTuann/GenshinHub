# TeyvatDB - Backend ⚙️

Đây là máy chủ API của **TeyvatDB**. Backend đóng vai trò làm trung tâm xử lý dữ liệu, giao tiếp với cơ sở dữ liệu PostgreSQL và cung cấp endpoint GraphQL duy nhất cho Frontend. Nó cũng chịu trách nhiệm cào dữ liệu (seeding) từ các nguồn bên ngoài.

## 📦 Các Packages đã sử dụng và Công dụng

| Package | Phiên bản | Công dụng |
| :--- | :--- | :--- |
| **@apollo/server** | `5.5.x` | Xây dựng GraphQL Server. Giúp định nghĩa Schema, Resolvers và cung cấp môi trường chạy API nhanh chóng, mạnh mẽ. |
| **graphql** | `16.14.x` | Ngôn ngữ truy vấn chính. Frontend chỉ cần gửi đúng những trường dữ liệu mình cần (ví dụ: chỉ lấy tên và ảnh thay vì lấy cả tiểu sử) để tối ưu băng thông. |
| **@prisma/client** | `5.10.x` | ORM (Object-Relational Mapping) hiện đại để tương tác với PostgreSQL qua TypeScript. Giúp truy vấn cơ sở dữ liệu cực nhanh và type-safe. |
| **axios** | `1.16.x` | HTTP Client để gọi API ra bên ngoài (như yatta.moe, enka.network) trong các script cào dữ liệu (seeder). |
| **nodemon & ts-node** | `3.x / 10.x` | Môi trường phát triển (Dev environment) giúp chạy file TypeScript trực tiếp và tự động restart server mỗi khi code thay đổi. |

## 📂 Cấu trúc thư mục (Directory Structure)

- **`prisma/`**: 
  - `schema.prisma`: Nơi định nghĩa toàn bộ cấu trúc bảng của database.
  - `seeds/`: Thư mục chứa các module cào dữ liệu được chia nhỏ (Nhân vật, Vũ khí, Thánh di vật, Nguyên liệu).
  - `seed.ts`: File orchestrator tự động chạy tất cả các module seeder.
- **`src/`**: Chứa mã nguồn chính của GraphQL Server.
  - `index.ts`: Điểm khởi chạy của Apollo Server, khai báo Schema (`typeDefs`) và xử lý truy vấn (`resolvers`).
- **`docker-compose.yml`**: Khởi chạy nhanh một container PostgreSQL để làm database cục bộ.

## ⚙️ Cách thức hoạt động

1. **Khởi tạo và Kết nối (Prisma):** 
   Server kết nối tới database PostgreSQL qua biến môi trường `DATABASE_URL` nằm trong file `.env`. Prisma Client được sinh tự động (auto-generated) dựa trên `schema.prisma`.
2. **GraphQL Endpoint:** 
   Apollo Server phơi bày một endpoint duy nhất tại `http://localhost:4000/graphql`. Mọi thao tác Lấy dữ liệu (Query) hay Sửa dữ liệu (Mutation) đều đi qua cổng này.
3. **Seed Data (Thu thập dữ liệu):** 
   Hệ thống có các tập lệnh chạy ngoài luồng (seeder). Khi kích hoạt lệnh `npm run prisma:seed`, các file trong `prisma/seeds/` sẽ dùng `axios` kết nối tới API của *yatta.moe*, tải các chuỗi JSON khổng lồ, chuẩn hóa lại ảnh từ *Enka Network*, và chèn vào Database bằng `prisma.createMany()` và `prisma.upsert()`.
