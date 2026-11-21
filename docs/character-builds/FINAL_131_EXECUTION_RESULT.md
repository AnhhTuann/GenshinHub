# GenshinHub 7.2 character audit execution

**COMPLETE_WITH_APPROVAL_PENDING.** The audit covers all 131 live identities and 219 existing build records. One confirmed asset correction is live. Two build corrections are staged in the existing review workflow. Five absent builds and other evidence holds remain documented.

## Running project

The existing development services were reused and left running. Node 20.20.2, npm 10.8.2, installed dependencies and local lockfiles were used. PostgreSQL 15.20 is the existing local database at 127.0.0.1:5434/genshinhub. Prisma reported all five migrations applied. The Admin API accepted the existing credential and rejected anonymous and invalid requests.

- [Frontend](http://127.0.0.1:3001/en)
- [Character catalog](http://127.0.0.1:3001/en/characters)
- [GraphQL](http://127.0.0.1:4000/graphql)

## Changes and protection

| Change | Result |
|---|---|
| Sandrone avatar | Re-encoded the PNG served at the WebP URL as lossless WebP. Decoded pixel difference was zero. The server returned the new bytes as image/webp. |
| Legacy Neuvillette and Xinyan teams | Staged Kazuha’s canonical ID for five member slots across the two builds. Both live pending patches and the version 2 STAGED audit records matched. Public lineups and defaults remain unchanged until review. |
| Approved Bennett | Prepared the exact four-slot alias correction for human review. The approved build was left intact. |
| Metadata, missing roles and test cleanup | Prepared seven null-stat corrections and documented five held role drafts. Left the one previously archived test team quarantined. No hard deletes or new archive writes. |

A fresh complete private archive restored in network-isolated PostgreSQL. All 22 application table digests matched. The archive SHA-256 is `46e2589569094a700f235fdfdd921c98ea44897106b89cb0ef4bc761c5f0e826`. The before-write snapshot still matched immediately before staging. The post-write full digest and inventory comparison found exactly two legacy build version changes and two new STAGED audit records. No public recommendation rows, approved builds, defaults, Character identities, Tier List tables, or migrations changed. Development retains 219 builds, 96 approved, 88 archives and 126 unique defaults. Build audits increased from 319 to 321, with two pending stages. Production was not accessed.

## Validation

- GraphQL matched all 131 list and detail identities, public build memberships and recommendations, and default IDs. The unknown-character query returned null. The audit recorded existing invalid legacy aliases and placeholders. Integrity PASS refers to the protected-data preservation and exact authorized write boundary.
- Chromium passed 11 hydrated route checks across English, Vietnamese, desktop, mobile, multiple builds, a page without a supported build, and an unknown-character fallback. It reported zero unhandled runtime exceptions during those checks.
- Three existing backend audit, apply and role-check test files passed.

## Remaining review

Review the two staged alias-only patches before publication. The approved Bennett correction, null-stat tables and legacy alias proposals have exact before/after records. The five held build drafts need representative rotation evidence or explicitly approved review scope. The reference API lacks patch metadata and exposes only one primary curated build per identity, so its recommendation order was not treated as universal.

[Audit report](FINAL_131_CHARACTER_AUDIT.md) · [Character matrix](FINAL_131_CHARACTER_MATRIX.json) · [Corrections](FINAL_131_CORRECTIONS.json) · [Test cleanup](FINAL_131_TEST_CLEANUP.md)

[Current correction follow-up and Admin status](FINAL_131_CORRECTION_EXECUTION.md)
