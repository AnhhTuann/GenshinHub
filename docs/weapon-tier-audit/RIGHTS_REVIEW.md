# Source reuse review — genshin-builds.com weapon tier list

**Reviewed:** 2026-11-20
**Primary source:** https://genshin-builds.com/en/tier-list-weapons
**Vietnamese page:** https://genshin-builds.com/vi/tier-list-weapons/ (name cross-check only)
**Cross-check:** https://gamewith.net/genshin-impact/article/show/22376 (version/role context only)

| Check | Result |
|---|---|
| `robots.txt` | `User-agent: * → Allow: /`; only `/_server-islands/` disallowed. AI agents explicitly allowed. |
| `llms.txt`, `agents.md`, `auth.md`, `api/llms.txt` | Document anonymous read-only access and preferred structured endpoints. This is access guidance, **not** a content license. |
| `/.well-known/...`, `api/mcp` | Read-only structured endpoints exist. No license grant for republication. |
| `/en/terms` | Contains a **User Content License** for content submitted by users. It does **not** cover the site's own editorial tier tables or notes. |
| Page metadata | Title: “Genshin Impact Weapons Tier List (Best Weapons)”; no game version and no refinement assumption are published. |
| GameWith cross-check | Page title states **7.2**. Used only to confirm the current game context; no ranking text was copied. |

## Conclusion

**`RIGHTS VERIFIED`: NO.**

API/page access is permitted, but no license was found that allows copying or redistributing the full editorial weapon ranking table or its notes into GenshinHub. Therefore:

- The snapshot is an **independent draft**: structured placements are recorded as factual observations of the source grid, with source URL and checksum.
- All Vietnamese explanations in `backend/scripts/weapon-tier-audit/explanations.vi.json` are newly authored from game mechanics (genshin-db 5.2.15) and role context. No editorial prose was copied from Genshin-Builds or GameWith.
- No record is `APPROVED`. Explained records are `PENDING_REVIEW`; the rest are `NEEDS_REVIEW`; source conflicts are `DISPUTED`.
- No wholesale source table was written to PostgreSQL. Zero database writes were performed in this phase.

## Required attribution if any draft text is published

`Nguồn: Genshin-Builds — Genshin Impact Weapons Tier List (https://genshin-builds.com/en/tier-list-weapons). Đây là nhận định meta có thể thay đổi theo phiên bản; GenshinHub chưa xác minh quyền tái xuất bản bảng xếp hạng gốc.`
