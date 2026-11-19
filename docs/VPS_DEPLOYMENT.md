# GenshinHub — VPS Deployment Guide (chuẩn bị, chưa triển khai)

Tài liệu này mô tả kiến trúc mục tiêu khi self-host toàn bộ GenshinHub trên một VPS.
**Chưa có thao tác nào được thực hiện lên VPS thật.**

## 1. Cấu trúc thư mục đề xuất

```text
/srv/genshinhub/
├── frontend/            # Next.js app (build output .next/)
├── backend/             # Express + Apollo GraphQL + Prisma
├── assets/              # ASSET_STORAGE_PATH — persistent, NGOÀI source code
│   └── assets/          # URL namespace /assets/
│       ├── characters/
│       ├── weapons/
│       ├── artifacts/
│       └── items/       # materials
├── backups/             # pg_dump + snapshot JSON + assets tar
└── logs/
```

Lưu ý: code hiện dùng `assets/items/` cho materials (theo `materialIconPath`),
không phải `assets/materials/`.

## 2. Biến môi trường

### backend/.env

```bash
DATABASE_URL="postgresql://genshin:PASS@127.0.0.1:5432/genshinhub"
DIRECT_URL="postgresql://genshin:PASS@127.0.0.1:5432/genshinhub"   # cho pg_dump
ADMIN_PASSWORD=...
FRONTEND_URL=https://your-domain.com
PORT=4000
ASSET_STORAGE_PATH=/srv/genshinhub/assets
REVALIDATE_SECRET=...        # shared secret với frontend
DISCORD_WEBHOOK_URL=...      # optional
```

### frontend/.env.local (hoặc .env.production)

```bash
NEXT_PUBLIC_GRAPHQL_URL=https://api.your-domain.com/graphql   # hoặc /graphql nếu cùng domain
ASSET_STORAGE_PATH=/srv/genshinhub/assets                      # cho route /assets fallback
REVALIDATE_SECRET=...                                          # giống backend
```

## 3. Nginx — phục vụ /assets/ trực tiếp

```nginx
# /etc/nginx/sites-available/genshinhub
server {
    listen 443 ssl;
    server_name your-domain.com;

    # --- Assets: serve thẳng từ persistent storage, không qua Next.js ---
    include /etc/nginx/snippets/genshinhub-assets.conf;

    # --- Frontend Next.js ---
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# API GraphQL (subdomain riêng hoặc path riêng)
server {
    listen 443 ssl;
    server_name api.your-domain.com;
    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Nếu KHÔNG dùng Nginx cho /assets, Next.js route `app/assets/[...path]/route.ts`
sẽ tự phục vụ file từ `ASSET_STORAGE_PATH` (đã có sẵn, chậm hơn Nginx nhưng
hoạt động ngay). Khuyến nghị vẫn dùng Nginx `alias` cho hiệu năng.

## 4. Chạy services

```bash
# PostgreSQL: cài đặt bình thường, tạo db genshinhub + user riêng.

# Backend (GraphQL API)
cd /srv/genshinhub/backend
npm ci && npm run build
# systemd unit: ExecStart=node dist/src/index.js

# Frontend (Next.js standalone)
cd /srv/genshinhub/frontend
npm ci && npm run build
# systemd unit: ExecStart=node server.js (output: 'standalone')
# hoặc pm2: pm2 start npm --name genshinhub-web -- start
```

## 5. Data Sync và template VPS

Các file mẫu nằm trong [deploy/vps](../deploy/vps). Cài Node 20+, PostgreSQL
client, Bash và util-linux cho máy chạy sync. Chuẩn bị thư mục
`/srv/genshinhub/assets/assets` và đưa thư mục `frontend/public/assets` hiện
có vào đó trước khi bật Nginx. Nginx chỉ đọc volume, job asset có quyền ghi.

| Unit | Chức năng | Kích hoạt |
| --- | --- | --- |
| `genshinhub-sync-check.timer` | 03:00 UTC, kiểm tra npm, diff, validation và kiểm kê WebP | Bật sau khi xác minh cấu hình |
| `genshinhub-sync-apply.service` | Kiểm tra phiên bản đã duyệt, backup PostgreSQL, sync, kiểm tra lại và revalidate | Chạy thủ công |
| `genshinhub-sync-assets.service` | Tải assets còn thiếu và ghi log các lỗi CDN | Chạy thủ công hoặc sau apply |

Cấp `DATABASE_URL` chỉ đọc cho `sync-readonly.env`. Đặt URL PostgreSQL trực tiếp
cùng quyền ghi bốn model game và quyền đọc để backup trong `sync-apply.env`, cùng
`APPROVED_GENSHIN_DB_VERSION`, `SYNC_BACKUP_ROOT`,
`FRONTEND_REVALIDATE_URL` và `REVALIDATE_SECRET`. Cấu hình backup ngoài cây
source và giới hạn quyền đọc. Script apply dùng cùng host, port, DB và user
từ URL này cho Prisma và pg_dump. Nếu validation sau apply, lệnh asset sync
hoặc revalidation thất bại, script thử rollback snapshot của lần đó. Các
icon 404 được ghi vào báo cáo asset và tiếp tục xử lý batch.

### Node.js, systemd và Nginx

Dùng `genshinhub-backend.service`, `genshinhub-frontend.service` và snippet
`assets.nginx.conf`. Copy `.next/static` và `public` vào thư mục standalone
nếu dùng output Next.js standalone. Cấu hình TLS và route GraphQL/nginx phù
hợp với hostname thực tế trước khi khởi động.

### Docker Compose và Nginx

Dùng `compose.yml` cùng `compose.assets.yml`. Cấp image tags đã được review
qua `GENSHINHUB_BACKEND_IMAGE` và `GENSHINHUB_FRONTEND_IMAGE`, tạo các env
file mẫu tương ứng ngay trước khi chạy. Frontend image phải được build với
GraphQL endpoint có thể truy cập được lúc build và từ trình duyệt. Nginx
template lắng nghe HTTP trên loopback 8080, để cấu hình TLS phía trước. Đặt
sync runner bên ngoài image runtime tối giản và mount cùng asset volume vào
runner khi chọn Docker. Dùng network nội bộ hoặc direct PostgreSQL endpoint
đã phê duyệt cho runner.

## 6. Backup

- `pg_dump` hàng ngày → mã hóa `openssl enc -aes-256-cbc` → lưu offsite.
- `tar -czf assets_$(date).tar.gz /srv/genshinhub/assets` hàng tuần.
- Snapshot JSON của syncEngine nằm trong `backend/backups/` — copy cùng backup.

## 7. CI/CD

- `.github/workflows/ci.yml` — lint + build frontend/backend mỗi PR.
- `genshin-data-sync.yml` — dry-run hằng ngày, mở PR khi có diff (cần
  `DATABASE_URL` trỏ tới DB reachable từ runner — read replica khuyến nghị).
- `genshin-data-sync-apply.yml` — manual + environment `production` approval;
  pg_dump được mã hóa trước khi upload artifact; assets đóng gói tar.gz.
- Dependabot — PR nâng cấp `genshin-db` hằng ngày (không auto-merge).

## 8. Checklist trước khi deploy thật

- [ ] `ASSET_STORAGE_PATH` đã set cho cả backend & frontend.
- [ ] Nginx `location /assets/` trỏ đúng thư mục persistent.
- [ ] `BACKUP_ENCRYPTION_KEY` secret đã cấu hình (apply workflow bắt buộc).
- [ ] `REVALIDATE_SECRET` giống nhau backend/frontend.
- [ ] `DIRECT_URL` có nếu dùng connection pooler.
- [ ] Quyền ghi: user chạy sync service phải write được `/srv/genshinhub/assets`;
      Nginx (`www-data`) chỉ cần read.
- [ ] Postgres reachable, `prisma migrate deploy` đã chạy.
- [ ] Smoke test: `npm run sync:assets:check` → `sync:check` → `sync:e2e`.
