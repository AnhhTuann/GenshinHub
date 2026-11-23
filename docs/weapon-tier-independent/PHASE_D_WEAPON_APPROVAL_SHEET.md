# Phase D — Weapon Tier Approval Sheet (14 records, 13 reviewable)

**STATUS: READY FOR ADMIN REVIEW ONLY — NO APPROVAL, NO RIGHTS FLIP, NO INSERT.**

Freeze verified: `true`; batch SHA-256 `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e`.
Decision sheet SHA-256 `a100002cc2e5f1815bf20836bda1b111c68d97bd22aa924161541c61df40caf9` matches the freeze manifest.
Machine-readable companion: `PHASE_D_WEAPON_APPROVAL_SHEET.json`.

## Reviewable candidates (Group A — 13)

| Candidate | Weapon | Role | Ref. | Proposed | Old | Confidence | Rights verified | Decision | Tier re-review |
|---|---|---|---|---|---|---|---|---|---|
| `independent-11401-SUPPORT-R1` | Favonius Sword | SUPPORT | R1 | SS | SS | HIGH | false | PENDING | n/a |
| `independent-11403-SUB_DPS-R5` | Sacrificial Sword | SUB_DPS | R5 | S | S | MEDIUM | false | PENDING | n/a |
| `independent-11418-SUPPORT-R1` | Xiphos' Moonlight | SUPPORT | R1 | S | S | MEDIUM | false | PENDING | n/a |
| `independent-11512-MAIN_DPS-R1` | Light of Foliar Incision | MAIN_DPS | R1 | S | S | MEDIUM | false | PENDING | n/a |
| `independent-12502-SUPPORT-R1` | Wolf's Gravestone | SUPPORT | R1 | A | A | MEDIUM | false | PENDING | n/a |
| `independent-13407-SUPPORT-R1` | Favonius Lance | SUPPORT | R1 | SS | SS | HIGH | false | PENDING | n/a |
| `independent-13501-MAIN_DPS-R1` | Staff of Homa | MAIN_DPS | R1 | SS | SS | HIGH | false | PENDING | n/a |
| `independent-14302-SUPPORT-R5` | Thrilling Tales of Dragon Slayers | SUPPORT | R5 | S | SS | MEDIUM | false | PENDING | REQUIRED |
| `independent-14402-SUB_DPS-R1` | The Widsith | SUB_DPS | R1 | A | S | MEDIUM | false | PENDING | REQUIRED |
| `independent-14406-SUPPORT-R5` | Prototype Amber | SUPPORT | R5 | A | A | MEDIUM | false | PENDING | n/a |
| `independent-14509-SUB_DPS-R1` | Kagura's Verity | SUB_DPS | R1 | A | A | MEDIUM | false | PENDING | n/a |
| `independent-15402-SUB_DPS-R1` | The Stringless | SUB_DPS | R1 | S | S | MEDIUM | false | PENDING | n/a |
| `independent-15508-MAIN_DPS-R1` | Aqua Simulacra | MAIN_DPS | R1 | S | S | MEDIUM | false | PENDING | n/a |

## Blocked (Group B — 1)

| Candidate | Weapon | Status | Required evidence |
|---|---|---|---|
| `independent-12401-SUB_DPS-R1` | Favonius Greatsword | NEEDS_MORE_EVIDENCE | NEEDS_MORE_EVIDENCE - crit-rate assumptions, passive proc conditions, rotation, field time and energy assumptions require supplementation. |

## Mandatory tier re-review

| Candidate | Change | Reason | Confirmed |
|---|---|---|---|
| `independent-14302-SUPPORT-R5` | SS → S | OLD_TIER=SS → PROPOSED_TIER=S. Lý do: buff 48% ATK chỉ áp dụng cho nhân vật vào sân kế tiếp, chỉ có ý nghĩa với carry scale ATK và phủ 10/20s; SS đòi hỏi tính phổ dụng mà record không chứng minh được. | false |
| `independent-14402-SUB_DPS-R1` | S → A | OLD_TIER=S → PROPOSED_TIER=A. Lý do: giá trị thay đổi theo nhóm nhân vật (EM có thể là bản ca tốt với Sub DPS scale EM, không phải luôn vô dụng), cộng thêm buff chỉ 10s trên chu kỳ 30s và dễ lệch burst window; A phản ánh kỳ vọng thực tế thay vì buff tốt nhất. | false |

## Rights and authentication policy

- All 14 rows have `publishRightsVerified = false`; the flag changes only after an authorized human verifies rights.
- `admin-decisions.input.json` and the Phase D JSON are evidence, not authorization. The backend derives `approvedBy` and `audit.actor` from the authenticated Admin session and rejects fake actors.
- No `SOURCE_DERIVED` record and no 296 research rows may be imported.
- Current import eligibility: **0 / 14** (13 reviewable but undecided, 1 blocked).

## Decision workflow

1. Re-verify the freeze manifest, batch hash, decision-sheet hash and every `recordSha256`.
2. For each Group A row: explicit `APPROVE` / `REQUEST_CHANGES` / `REJECT`, real Admin actor, timestamp, reason, rights verification and evidence acknowledgement.
3. For the two tier changes, also record `tierReReviewConfirmed = true` only after a deliberate decision.
4. Keep Favonius Greatsword blocked until the listed evidence is supplemented.
5. Import only approved rows via the Admin-authenticated backend path with audit logging; then verify PostgreSQL, public GraphQL and the current Weapon Tier List.

**Current import eligibility: 0 / 14.**
