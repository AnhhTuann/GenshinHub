# GenshinHub — VPS Deployment Guide (chuẩn bị, chưa triển khai)

Tài liệu này mô tả kiến trúc mục tiêu khi self-host toàn bộ GenshinHub trên một VPS.
**Chưa có thao tác nào được thực hiện lên VPS thật.**

## 1. Cấu trúc thư mục đề xuất

```text
/srv/genshinhub/
├── frontend/            # Next.js app (build output .next/)
├── backend/             # Express + Apollo GraphQL + Prisma
├── assets/              # ASSET_STORAGE_PATH — persistent, NGOÀI source code
│   ├── characters/
│   ├── weapons/
│   ├── artifacts/
│   └── items/           # materials
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
    location /assets/ {
        alias /srv/genshinhub/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        # Chặn path traversal (Nginx merge_slashes + alias an toàn)
        location ~* \.(php|sh|py)$ { deny all; }
    }

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
npm ci && npx prisma generate && npx prisma migrate deploy
npm run build
# systemd unit: ExecStart=node dist/src/index.js

# Frontend (Next.js standalone)
cd /srv/genshinhub/frontend
npm ci && npm run build
# systemd unit: ExecStart=node server.js (output: 'standalone')
# hoặc pm2: pm2 start npm --name genshinhub-web -- start
```

## 5. Data Sync định kỳ (cron/systemd timer)

```bash
# crontab — chạy check hằng ngày; apply chỉ khi có thay đổi được duyệt
0 3 * * *  cd /srv/genshinhub/backend && npm run sync:check >> logs/sync.log 2>&1
# Apply thủ công hoặc qua GitHub Actions "Genshin Data Sync — Apply"
```

Trên VPS có thể chạy `npm run sync:run` trực tiếp — assets sẽ ghi vào
`/srv/genshinhub/assets` (persistent, sống sót qua deploy/rebuild).

### Đường đi của assets mới

- **Cách khuyến nghị (VPS tự sync):** cron/systemd chạy `sync:run` hoặc
  `sync:assets` trực tiếp trên VPS → file ghi thẳng vào
  `/srv/genshinhub/assets`, không qua GitHub.
- **Cách qua GitHub Actions Apply:** workflow tải assets vào
  `ASSET_STORAGE_PATH` tạm rồi upload `assets-downloaded-prod` artifact.
  Artifact chỉ là cầu nối — sau khi apply, SSH vào VPS và restore:

  ```bash
  # Trên VPS (sau khi download artifact từ GitHub Actions)
  tar -xzf assets_prod_YYYYMMDD_HHMMSS.tar.gz -C /srv/genshinhub/assets/
  # hoặc chạy bù cho chắc:
  cd /srv/genshinhub/backend && npm run sync:assets
  ```

  `sync:assets` là idempotent — file đã có & hợp lệ sẽ bị skip, chỉ tải
  phần còn thiếu. Vì vậy quy trình an toàn là: apply trên GitHub → restore
  artifact → chạy `sync:assets` trên VPS để bù phần artifact không chứa.

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
