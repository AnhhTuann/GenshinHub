# Kiểm toán nguyên liệu đột phá & thiên phú của nhân vật

- **Thời gian**: 2026-11-20T06:23:01.082Z
- **Nguồn**: genshin-db@5.2.15 (game data v7.2), license MIT, dữ liệu từ GenshinData/Fandom — không scrape/đoán.
- **Chế độ**: verify
- **Phạm vi**: 131 nhân vật trong development database.
- **An toàn dữ liệu**: chỉ điền field đang `null`/`[]`; không xoá bản ghi; không ghi đè tier/build/team/stats; snapshot + rollback; chỉ cho phép ghi khi `DATABASE_URL` là local/loopback.
- **Lỗi frontend đã sửa**: bỏ mock Prithiva Topaz/Juvenile Jade khỏi cả 2 section; talent editor giờ gọi `updateCharacterTalentMats` thay vì ghi nhầm vào ascension.

## Tổng hợp cause

| Cause | Count |
|---|---:|
| NONE | 129 |
| NO_MATERIALS_REQUIRED | 2 |

- Pending / chưa đầy đủ: **0**
- Sẵn sàng từ nguồn nhưng sync cũ không ghi: **0**
- Verified không cần nguyên liệu (lưu `[]`): **2**

## Warnings

- traveler: Hồ sơ Traveler legacy dùng chung chi phí đột phá Aether và chi phí thiên phú Anemo theo quy ước của dự án.
- traveler-anemo: Traveler theo nguyên tố: đột phá dùng Aether (Brilliant Diamond), thiên phú dùng bản ghi theo nguyên tố.
- traveler-dendro: Traveler theo nguyên tố: đột phá dùng Aether (Brilliant Diamond), thiên phú dùng bản ghi theo nguyên tố.
- traveler-electro: Traveler theo nguyên tố: đột phá dùng Aether (Brilliant Diamond), thiên phú dùng bản ghi theo nguyên tố.
- traveler-geo: Traveler theo nguyên tố: đột phá dùng Aether (Brilliant Diamond), thiên phú dùng bản ghi theo nguyên tố.
- traveler-hydro: Traveler theo nguyên tố: đột phá dùng Aether (Brilliant Diamond), thiên phú dùng bản ghi theo nguyên tố.
- traveler-pyro: Traveler theo nguyên tố: đột phá dùng Aether (Brilliant Diamond), thiên phú dùng bản ghi theo nguyên tố.

## Chi tiết từng nhân vật

| Character ID | Character Name | Release/Data Status | Ascension Materials Status | Talent Materials Status | Missing Reason | Data Source | Fix Applied | Verification Result |
|---|---|---|---|---|---|---|---|---|
| aino | Aino | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aino).costs + genshin-db@5.2.15:talents(Aino).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| albedo | Albedo | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Albedo).costs + genshin-db@5.2.15:talents(Albedo).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| alhaitham | Alhaitham | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Alhaitham).costs + genshin-db@5.2.15:talents(Alhaitham).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| aloy | Aloy | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aloy).costs + genshin-db@5.2.15:talents(Aloy).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| alyosha | Alyosha | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Alyosha).costs + genshin-db@5.2.15:talents(Alyosha).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| amber | Amber | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Amber).costs + genshin-db@5.2.15:talents(Amber).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| arataki-itto | Arataki Itto | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Arataki Itto).costs + genshin-db@5.2.15:talents(Arataki Itto).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| arlecchino | Arlecchino | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Arlecchino).costs + genshin-db@5.2.15:talents(Arlecchino).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| baizhu | Baizhu | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Baizhu).costs + genshin-db@5.2.15:talents(Baizhu).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| barbara | Barbara | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Barbara).costs + genshin-db@5.2.15:talents(Barbara).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| beidou | Beidou | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Beidou).costs + genshin-db@5.2.15:talents(Beidou).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| bennett | Bennett | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Bennett).costs + genshin-db@5.2.15:talents(Bennett).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| candace | Candace | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Candace).costs + genshin-db@5.2.15:talents(Candace).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| charlotte | Charlotte | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Charlotte).costs + genshin-db@5.2.15:talents(Charlotte).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| chasca | Chasca | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Chasca).costs + genshin-db@5.2.15:talents(Chasca).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| chevreuse | Chevreuse | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Chevreuse).costs + genshin-db@5.2.15:talents(Chevreuse).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| chiori | Chiori | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Chiori).costs + genshin-db@5.2.15:talents(Chiori).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| chongyun | Chongyun | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Chongyun).costs + genshin-db@5.2.15:talents(Chongyun).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| citlali | Citlali | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Citlali).costs + genshin-db@5.2.15:talents(Citlali).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| clorinde | Clorinde | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Clorinde).costs + genshin-db@5.2.15:talents(Clorinde).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| collei | Collei | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Collei).costs + genshin-db@5.2.15:talents(Collei).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| columbina | Columbina | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Columbina).costs + genshin-db@5.2.15:talents(Columbina).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| cyno | Cyno | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Cyno).costs + genshin-db@5.2.15:talents(Cyno).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| dahlia | Dahlia | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Dahlia).costs + genshin-db@5.2.15:talents(Dahlia).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| dehya | Dehya | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Dehya).costs + genshin-db@5.2.15:talents(Dehya).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| diluc | Diluc | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Diluc).costs + genshin-db@5.2.15:talents(Diluc).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| diona | Diona | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Diona).costs + genshin-db@5.2.15:talents(Diona).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| dori | Dori | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Dori).costs + genshin-db@5.2.15:talents(Dori).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| durin | Durin | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Durin).costs + genshin-db@5.2.15:talents(Durin).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| emilie | Emilie | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Emilie).costs + genshin-db@5.2.15:talents(Emilie).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| escoffier | Escoffier | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Escoffier).costs + genshin-db@5.2.15:talents(Escoffier).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| eula | Eula | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Eula).costs + genshin-db@5.2.15:talents(Eula).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| faruzan | Faruzan | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Faruzan).costs + genshin-db@5.2.15:talents(Faruzan).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| fischl | Fischl | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Fischl).costs + genshin-db@5.2.15:talents(Fischl).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| flins | Flins | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Flins).costs + genshin-db@5.2.15:talents(Flins).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| freminet | Freminet | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Freminet).costs + genshin-db@5.2.15:talents(Freminet).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| furina | Furina | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Furina).costs + genshin-db@5.2.15:talents(Furina).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| gaming | Gaming | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Gaming).costs + genshin-db@5.2.15:talents(Gaming).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| ganyu | Ganyu | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Ganyu).costs + genshin-db@5.2.15:talents(Ganyu).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| gorou | Gorou | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Gorou).costs + genshin-db@5.2.15:talents(Gorou).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| hu-tao | Hu Tao | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Hu Tao).costs + genshin-db@5.2.15:talents(Hu Tao).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| iansan | Iansan | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Iansan).costs + genshin-db@5.2.15:talents(Iansan).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| ifa | Ifa | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Ifa).costs + genshin-db@5.2.15:talents(Ifa).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| illuga | Illuga | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Illuga).costs + genshin-db@5.2.15:talents(Illuga).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| ineffa | Ineffa | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Ineffa).costs + genshin-db@5.2.15:talents(Ineffa).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| jahoda | Jahoda | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Jahoda).costs + genshin-db@5.2.15:talents(Jahoda).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| jean | Jean | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Jean).costs + genshin-db@5.2.15:talents(Jean).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kachina | Kachina | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kachina).costs + genshin-db@5.2.15:talents(Kachina).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kaedehara-kazuha | Kaedehara Kazuha | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kaedehara Kazuha).costs + genshin-db@5.2.15:talents(Kaedehara Kazuha).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kaeya | Kaeya | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kaeya).costs + genshin-db@5.2.15:talents(Kaeya).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kamisato-ayaka | Kamisato Ayaka | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kamisato Ayaka).costs + genshin-db@5.2.15:talents(Kamisato Ayaka).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kamisato-ayato | Kamisato Ayato | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kamisato Ayato).costs + genshin-db@5.2.15:talents(Kamisato Ayato).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kaveh | Kaveh | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kaveh).costs + genshin-db@5.2.15:talents(Kaveh).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| keqing | Keqing | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Keqing).costs + genshin-db@5.2.15:talents(Keqing).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kinich | Kinich | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kinich).costs + genshin-db@5.2.15:talents(Kinich).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| klee | Klee | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Klee).costs + genshin-db@5.2.15:talents(Klee).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kujou-sara | Kujou Sara | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kujou Sara).costs + genshin-db@5.2.15:talents(Kujou Sara).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| kuki-shinobu | Kuki Shinobu | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kuki Shinobu).costs + genshin-db@5.2.15:talents(Kuki Shinobu).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| lanyan | Lan Yan | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Lan Yan).costs + genshin-db@5.2.15:talents(Lan Yan).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| lauma | Lauma | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Lauma).costs + genshin-db@5.2.15:talents(Lauma).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| layla | Layla | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Layla).costs + genshin-db@5.2.15:talents(Layla).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| linnea | Linnea | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Linnea).costs + genshin-db@5.2.15:talents(Linnea).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| lisa | Lisa | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Lisa).costs + genshin-db@5.2.15:talents(Lisa).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| lohen | Lohen | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Lohen).costs + genshin-db@5.2.15:talents(Lohen).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| lynette | Lynette | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Lynette).costs + genshin-db@5.2.15:talents(Lynette).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| lyney | Lyney | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Lyney).costs + genshin-db@5.2.15:talents(Lyney).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| mavuika | Mavuika | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Mavuika).costs + genshin-db@5.2.15:talents(Mavuika).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| mika | Mika | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Mika).costs + genshin-db@5.2.15:talents(Mika).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| mitya | Mitya | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Mitya).costs + genshin-db@5.2.15:talents(Mitya).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| momoka | Kirara | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Kirara).costs + genshin-db@5.2.15:talents(Kirara).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| mona | Mona | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Mona).costs + genshin-db@5.2.15:talents(Mona).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| mualani | Mualani | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Mualani).costs + genshin-db@5.2.15:talents(Mualani).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| nahida | Nahida | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Nahida).costs + genshin-db@5.2.15:talents(Nahida).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| navia | Navia | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Navia).costs + genshin-db@5.2.15:talents(Navia).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| nefer | Nefer | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Nefer).costs + genshin-db@5.2.15:talents(Nefer).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| neuvillette | Neuvillette | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Neuvillette).costs + genshin-db@5.2.15:talents(Neuvillette).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| nicole | Nicole | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Nicole).costs + genshin-db@5.2.15:talents(Nicole).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| nilou | Nilou | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Nilou).costs + genshin-db@5.2.15:talents(Nilou).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| ningguang | Ningguang | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Ningguang).costs + genshin-db@5.2.15:talents(Ningguang).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| noelle | Noelle | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Noelle).costs + genshin-db@5.2.15:talents(Noelle).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| odette | Odette | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Odette).costs + genshin-db@5.2.15:talents(Odette).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| ororon | Ororon | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Ororon).costs + genshin-db@5.2.15:talents(Ororon).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| prune | Prune | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Prune).costs + genshin-db@5.2.15:talents(Prune).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| qiqi | Qiqi | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Qiqi).costs + genshin-db@5.2.15:talents(Qiqi).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| raiden-shogun | Raiden Shogun | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Raiden Shogun).costs + genshin-db@5.2.15:talents(Raiden Shogun).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| razor | Razor | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Razor).costs + genshin-db@5.2.15:talents(Razor).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| rosaria | Rosaria | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Rosaria).costs + genshin-db@5.2.15:talents(Rosaria).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| sandrone | Sandrone | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Sandrone).costs + genshin-db@5.2.15:talents(Sandrone).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| sangonomiya-kokomi | Sangonomiya Kokomi | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Sangonomiya Kokomi).costs + genshin-db@5.2.15:talents(Sangonomiya Kokomi).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| sayu | Sayu | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Sayu).costs + genshin-db@5.2.15:talents(Sayu).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| sethos | Sethos | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Sethos).costs + genshin-db@5.2.15:talents(Sethos).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| shenhe | Shenhe | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Shenhe).costs + genshin-db@5.2.15:talents(Shenhe).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| shikanoin-heizou | Shikanoin Heizou | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Shikanoin Heizou).costs + genshin-db@5.2.15:talents(Shikanoin Heizou).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| sigewinne | Sigewinne | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Sigewinne).costs + genshin-db@5.2.15:talents(Sigewinne).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| skirk | Skirk | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Skirk).costs + genshin-db@5.2.15:talents(Skirk).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| sucrose | Sucrose | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Sucrose).costs + genshin-db@5.2.15:talents(Sucrose).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| tartaglia | Tartaglia | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Tartaglia).costs + genshin-db@5.2.15:talents(Tartaglia).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| thoma | Thoma | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Thoma).costs + genshin-db@5.2.15:talents(Thoma).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| tighnari | Tighnari | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Tighnari).costs + genshin-db@5.2.15:talents(Tighnari).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| traveler | Traveler | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aether).costs + genshin-db@5.2.15:talents(Traveler (Anemo)).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| traveler-anemo | Traveler (Anemo) | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aether).costs + genshin-db@5.2.15:talents(Traveler (Anemo)).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| traveler-boy | Manekin | NO MATERIALS REQUIRED / VERIFIED | NONE (verified — no materials) | NONE (verified — no materials) | NO_MATERIALS_REQUIRED — https://genshin-impact.fandom.com/wiki/Wonderland_Manekin: lên cấp qua Miliastra Wonderland, không cần nguyên liệu đột phá/thiên phú; lưu [] đã kiểm chứng. | genshin-db@5.2.15:characters(Manekin).costs (verified: https://genshin-impact.fandom.com/wiki/Wonderland_Manekin) | Ghi [] đã kiểm chứng (không cần nguyên liệu) | Prisma OK |
| traveler-dendro | Traveler (Dendro) | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aether).costs + genshin-db@5.2.15:talents(Traveler (Dendro)).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| traveler-electro | Traveler (Electro) | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aether).costs + genshin-db@5.2.15:talents(Traveler (Electro)).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| traveler-geo | Traveler (Geo) | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aether).costs + genshin-db@5.2.15:talents(Traveler (Geo)).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| traveler-girl | Manekina | NO MATERIALS REQUIRED / VERIFIED | NONE (verified — no materials) | NONE (verified — no materials) | NO_MATERIALS_REQUIRED — https://genshin-impact.fandom.com/wiki/Wonderland_Manekin: lên cấp qua Miliastra Wonderland, không cần nguyên liệu đột phá/thiên phú; lưu [] đã kiểm chứng. | genshin-db@5.2.15:characters(Manekina).costs (verified: https://genshin-impact.fandom.com/wiki/Wonderland_Manekin) | Ghi [] đã kiểm chứng (không cần nguyên liệu) | Prisma OK |
| traveler-hydro | Traveler (Hydro) | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aether).costs + genshin-db@5.2.15:talents(Traveler (Hydro)).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| traveler-pyro | Traveler (Pyro) | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Aether).costs + genshin-db@5.2.15:talents(Traveler (Pyro)).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| valeriy | Valeriy | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Valeriy).costs + genshin-db@5.2.15:talents(Valeriy).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| varesa | Varesa | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Varesa).costs + genshin-db@5.2.15:talents(Varesa).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| varka | Varka | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Varka).costs + genshin-db@5.2.15:talents(Varka).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| venti | Venti | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Venti).costs + genshin-db@5.2.15:talents(Venti).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| vesna | Vesna | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Vesna).costs + genshin-db@5.2.15:talents(Vesna).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| vodyanitsa | Vodyanitsa | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Vodyanitsa).costs + genshin-db@5.2.15:talents(Vodyanitsa).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| wanderer | Wanderer | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Wanderer).costs + genshin-db@5.2.15:talents(Wanderer).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| wriothesley | Wriothesley | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Wriothesley).costs + genshin-db@5.2.15:talents(Wriothesley).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| xiangling | Xiangling | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Xiangling).costs + genshin-db@5.2.15:talents(Xiangling).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| xianyun | Xianyun | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Xianyun).costs + genshin-db@5.2.15:talents(Xianyun).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| xiao | Xiao | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Xiao).costs + genshin-db@5.2.15:talents(Xiao).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| xilonen | Xilonen | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Xilonen).costs + genshin-db@5.2.15:talents(Xilonen).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| xingqiu | Xingqiu | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Xingqiu).costs + genshin-db@5.2.15:talents(Xingqiu).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| xinyan | Xinyan | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Xinyan).costs + genshin-db@5.2.15:talents(Xinyan).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| yae-miko | Yae Miko | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Yae Miko).costs + genshin-db@5.2.15:talents(Yae Miko).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| yanfei | Yanfei | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Yanfei).costs + genshin-db@5.2.15:talents(Yanfei).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| yaoyao | Yaoyao | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Yaoyao).costs + genshin-db@5.2.15:talents(Yaoyao).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| yelan | Yelan | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Yelan).costs + genshin-db@5.2.15:talents(Yelan).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| yoimiya | Yoimiya | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Yoimiya).costs + genshin-db@5.2.15:talents(Yoimiya).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| yumemizu | Yumemizuki Mizuki | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Yumemizuki Mizuki).costs + genshin-db@5.2.15:talents(Yumemizuki Mizuki).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| yun-jin | Yun Jin | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Yun Jin).costs + genshin-db@5.2.15:talents(Yun Jin).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| zhongli | Zhongli | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Zhongli).costs + genshin-db@5.2.15:talents(Zhongli).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |
| zibai | Zibai | RELEASED / READY | OK (6 levels) | OK (9 levels) | — | genshin-db@5.2.15:characters(Zibai).costs + genshin-db@5.2.15:talents(Zibai).costs | Backfill JSON đã kiểm chứng (chỉ field trống) | Prisma OK |

## Pending characters

- Không còn nhân vật pending.

## Verified: không cần nguyên liệu

- `traveler-boy` — Manekin: lưu `[]` cho cả hai field. Nguồn: https://genshin-impact.fandom.com/wiki/Wonderland_Manekin; genshin-db v6.1 trả costs chỉ có Mora không có count và không có bản ghi talent.
- `traveler-girl` — Manekina: lưu `[]` cho cả hai field. Nguồn: https://genshin-impact.fandom.com/wiki/Wonderland_Manekin; genshin-db v6.1 trả costs chỉ có Mora không có count và không có bản ghi talent.

## Ghi chú mapping

- Traveler legacy dùng `characters(Aether).costs` cho đột phá (Brilliant Diamond) và `talents(Traveler (<Element>)).costs` cho thiên phú theo từng variant.
- `traveler-boy` / `traveler-girl` là slug legacy của Manekin / Manekina. Họ là mannequin của Miliastra Wonderland: lên cấp Wonderland Level 10 thì tự động mở ascension và tự tăng talent, **không cần nguyên liệu**. Vì vậy lưu `[]` (khác với `null` = chưa công bố), frontend hiển thị thông báo riêng, không dùng chung thông báo "chưa được công bố đầy đủ" và không bịa material.
- Mọi materialId được lưu dưới dạng ID số game và phải tồn tại trong bảng `Material` với icon WebP local tương ứng.
