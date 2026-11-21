# Final Tier List 7.2 tier-change confirmations

**Both authorized confirmations were recorded in development.** There are zero Admin approvals and zero published rankings.

## Package, authentication and backup

- The frozen manifest SHA-256 matched `de34074fe3eb7494737f4ed8a3bb5ef652cba9c39875165a5d0eadbf1b9e11c5`. Both authorized candidate hashes were recalculated from canonical D2 payloads and matched the manifest, the live review queue and the confirmation audits. The verified Weapon store bound both exact roles, refinements and tiers to game version 7.2.
- The existing backend GraphQL Admin endpoint accepted the configured local credential and rejected both anonymous and invalid-key requests. The API supplied the actor, which matched the stored confirmation and audit on each candidate.
- The complete development backup of PostgreSQL 15.20 at `127.0.0.1:5434/genshinhub` restored successfully in a network-isolated PostgreSQL container. Counts and content digests matched for all 22 application tables. The full development snapshot still matched immediately before the first write. The private archive was 625,160 bytes with mode 0600 and SHA-256 `9812e8d2ac19fc78959c9718f93f848e23fdea1c8436701f0f8d412f68de0787`.

## Confirmations

Both candidates started at logical version 0 with decision `PENDING`, no confirmation history, rights unverified, evidence unacknowledged, and publication eligibility false. The API recorded each confirmation separately at version 1.

| Candidate | Weapon ID · role · refinement | Exact candidate SHA-256 | Confirmation | Resulting Admin decision |
|---|---|---|---|---|
| Thrilling Tales of Dragon Slayers · `independent-14302-SUPPORT-R5::D2` | 14302 · SUPPORT · R5 | `353ed2b6feccc42d45e6cb711c4f689e2c828e828a25beae992d5cc9ba5b568a` | **RECORDED** SS → S at 2026-11-21 04:13:13.432 UTC | `PENDING` |
| The Widsith · `independent-14402-SUB_DPS-R1::D2` | 14402 · SUB_DPS · R1 | `6c8cedf40352a1af1323fb041be8666bb9bd96a35b59a37ff958f78555ab795f` | **RECORDED** S → A at 2026-11-21 04:13:13.508 UTC | `PENDING` |

- Thrilling Tales `TIER_CHANGE_CONFIRMED` audit `66e67b56-e9f4-4262-b6cb-1c15d5bb3418`.
- The Widsith `TIER_CHANGE_CONFIRMED` audit `926618d4-0b0b-4267-a66f-636879a7f0ff`.

GraphQL and PostgreSQL readback verified the audit timestamps, server-derived actor, exact D2 checksum and previous-to-proposed tier for each event. Both rows remain rights-unverified, evidence-unacknowledged, ineligible for import and unpublished. Each still requires explicit human evidence acknowledgement, candidate-specific five-ground rights verification, and a final authenticated Admin approval.

## Post-execution integrity

Only the two target Weapon review rows and their four required audit rows were added. Every unrelated application-table digest matched, including all 18 conditional Group A candidates and the three existing Group B decisions. Development retained 219 Character Builds, including 96 approved, with 319 build audit records, 88 archives, and 126 defaults across 126 characters. Build recommendations, Mitya, and migration history were preserved.

There are zero approved Character rankings, zero approved Weapon reviews, and zero `WeaponTierRank` rows. Public 7.2 GraphQL returned empty Character and Weapon ranking lists. The local Tier List returned HTTP 200 and displayed `DATA PENDING`. Production was not accessed.
