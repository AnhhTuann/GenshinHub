# Final sync and scheduler readiness

The npm registry still selects the pinned stable `genshin-db@5.2.15`. The installed package was retained. Both current development dry-runs used the real versioned source and proposed zero creates and zero updates. Two real applies on a fresh disposable restore returned the same plan without creating snapshots. The development database received zero sync writes. [npm package versions](https://www.npmjs.com/package/genshin-db?activeTab=versions)

The detector now fails on an empty, malformed, or unsupported package index. The supplemental loader rejects an index with no usable identities. Missing individual source rows remain unmatched evidence and have no deletion path. The fixture suite passed 34 apply, duplicate, stale-plan, preservation, rollback and GraphQL checks. The tested rollback involved a failed transaction and an explicit snapshot restore. Process termination during an apply was outside this verification.

| Exact ID | Material | Canonical result |
|---|---|---|
| 107011 | Crimson Agate (Display) | Core identity has no rarity. Supplemental identity absent. Pending. |
| 107035 | Cryoculus | Core identity has no rarity. Supplemental identity absent. Pending. |
| 107016 | Lumenspar | Core identity has no rarity. Supplemental identity absent. Pending. |
| 107015 | Moonchase Charm | Core identity has no rarity. Supplemental identity absent. Pending. |
| 107026 | Spirit Carp | Core identity has no rarity. Supplemental identity absent. Pending. |

The configured published material index returned 832 supplemental rows. The five exact IDs lack positive rarity evidence in both accepted sources. The material schema requires an integer. These collectible records remain pending and were excluded from writes. [Configured material source](https://gi.yatta.moe/api/v2/en/material)

`npm run test:assets` passed 41 checks, including valid WebP decode, storage paths, corrupt file handling, fallback, bounded retries, duplicate skipping, atomic writes and preservation when replacement fails. Production assets were untouched.

The scheduled workflow still runs at 03:00 UTC, in `backend/`, with pinned actions, a single concurrency group and a 15-minute timeout. It now reads `SYNC_READONLY_DATABASE_URL`. Supply a runner-reachable reporting database or read replica and a least-privilege read-only database user. GitHub listed no Actions secrets for this repository. Hosted dry-run with a database is blocked on external configuration. The validation job skips its database step with an explicit diagnostic when the secret is absent. Production apply remains separately dispatched and was not invoked.

A fresh live Aino download exercised two source attempts and decoded the successful fallback as WebP in temporary storage. The workflow YAML, pinned actions, Bash syntax, missing-secret skip, and nonzero exit propagation were verified locally.

The historical hosted schedule failed at the former dry-run step after dependency installation and Prisma generation. The latest workflow adds an explicit missing-secret outcome. [Historical hosted run](https://github.com/AnhhTuann/GenshinHub/actions/runs/45015078548)
