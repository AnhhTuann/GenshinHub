# GenshinHub CI

CI khởi tạo một PostgreSQL 15 riêng trên runner GitHub Actions. Job dùng bộ
thông tin đăng nhập công khai dành cho test và một GraphQL server trên
loopback. PostgreSQL và dữ liệu kiểm thử được dọn khi job kết thúc.

## Bảo vệ database

Script fixture yêu cầu `NODE_ENV=test` và đúng URL
`postgresql://ci_user:ci_password@127.0.0.1:5432/genshinhub_test`. Guard chạy
trước các lệnh ghi của Prisma. Cả seeding và đồng bộ schema qua
`--schema-only` đều đi qua guard này. Bước schema dùng `db push` trên service
mới. Dành riêng thông tin đăng nhập và tên database này cho service kiểm thử
dùng một lần vì bước seed thay thế dữ liệu trong các bảng fixture.

## Các bước CI

CI sinh Prisma Client, validate schema, tạo bảng, seed fixture offline và
build backend. Bước readiness kiểm tra nội dung JSON GraphQL, gồm fixture
Albedo, Cinnabar Spindle, `Weapon.role`, artifact sets và tier ranks.
Next.js lint, typecheck và prerender với GraphQL cục bộ. Các bài kiểm tra
version, asset và tích hợp Data Sync dùng cấu hình CI. Next.js có thể tải
font qua mạng trong khi build.

## Chạy cục bộ

Khởi động một PostgreSQL mới chỉ lắng nghe trên loopback với tên database
và thông tin đăng nhập ở trên. Lấy URL GraphQL và các biến môi trường từ
workflow, rồi chạy tuần tự các lệnh trong checkout riêng. Dùng
`npm run seed:ci -- --schema-only` để tạo schema và `npm run seed:ci` để
nạp fixtures. Cả hai lệnh yêu cầu `NODE_ENV=test`.
