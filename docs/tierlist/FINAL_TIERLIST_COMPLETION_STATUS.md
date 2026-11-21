# GenshinHub Tier List 7.2 completion status

**AWAITING_HUMAN_RIGHTS_REVIEW.** The consolidated review package covers all 20 outstanding candidates. Development remained read-only. No genuine human evidence acknowledgement, candidate-specific rights attestation, final approval, or publication authorization was supplied in this run.

## Verified package and recorded decisions

The frozen manifest SHA-256 matched `de34074fe3eb7494737f4ed8a3bb5ef652cba9c39875165a5d0eadbf1b9e11c5`. All eight referenced artifact hashes, all 23 canonical D2 payload hashes, and both D2 batch bindings matched. The live Weapon queue matched all 14 D2 candidate identities, roles, refinements, tiers, and hashes. The verified Character dossier binds each role and constellation to 7.2.

| Completed action | Live state and audit |
|---|---|
| Raiden Shogun C0 · `CHAR-TIER-B2-06` | `NEEDS_REVIEW`. Server-derived actor and `REQUEST_CHANGES` audit at 2026-11-21 04:05:55.921 UTC verified through Character review. |
| Favonius Greatsword R1 · `independent-12401-SUB_DPS-R1::D2` | `REQUEST_CHANGES`, version 1. Actor, reason, timestamp and checksum-bound decision audit verified. |
| Staff of Homa R1 · `independent-13501-MAIN_DPS-R1::D2` | `REQUEST_CHANGES`, version 1. Actor, reason, timestamp and checksum-bound decision audit verified. |
| Thrilling Tales of Dragon Slayers R5 · `independent-14302-SUPPORT-R5::D2` | SS → S confirmed. `PENDING`, version 1. Audit `66e67b56-e9f4-4262-b6cb-1c15d5bb3418`. |
| The Widsith R1 · `independent-14402-SUB_DPS-R1::D2` | S → A confirmed. `PENDING`, version 1. Audit `926618d4-0b0b-4267-a66f-636879a7f0ff`. |

The three evidence-blocked dossiers remain outside the final approval queue. The two tier confirmations apply to the exact D2 hashes and are included in the 20-candidate queue.

## Human review counts

| Measure | Count |
|---|---:|
| In-scope frozen candidates | 23 |
| Outstanding final human review candidates | 20 |
| Conditional editorial agreements | 18 |
| Adequate traceable gameplay evidence for final human review | 18 of 20 |
| Recommended gameplay evidence changes | 2 of 20 |
| Human evidence acknowledgement | 0 |
| Human publication rights verified | 0 |
| Admin approved | 0 |
| Published | 0 |
| Pending final decision | 20 |
| Blocked from publication | 23 in scope, including all 20 pending and the 3 already returned for changes |

The two additional evidence recommendations are Favonius Sword R1 and Favonius Lance R1. Their single-CRIT Energy illustration does not establish practical uptime for category-wide SS. Both remain pending. The matrix contains the five findings, mechanics sources, author-provenance gaps and candidate-specific limitations for every row. Its exact-text comparison found no 12-token matches with the archived Vietnamese source-derived explanations. That screen does not establish independent authorship, rule out paraphrasing, or grant reuse permission.

## Technical and protected-data checks

- The documented local Admin API accepted the existing credential. Anonymous and invalid credentials were denied. Recorded audit actors matched their server-supplied review actors.
- Twenty-five existing Tier Review checks passed. PostgreSQL mutation fixtures lived exclusively in disposable local databases. Tested guards included rights, Weapon evidence acknowledgement, tier confirmations, checksum and version mismatches, concurrent decisions, audit and rollback, and approved-only independent 7.2 publication.
- The existing Character workflow uses signed, checksum-bound rights notes. Its UI and API have no standalone evidence acknowledgement control or persisted flag. The human reviewer must explicitly acknowledge the exact dossier and record that in the signed note before final approval. Character approval itself affects public visibility. Weapon review has a dedicated acknowledgement checkbox, separate rights controls, and a separate publication operation.
- Development PostgreSQL at `127.0.0.1:5434/genshinhub` matched its post-confirmation baseline and all 22 before/after table counts and digests. It retained 219 Character Builds, 96 approved, 319 build audit rows, 88 archives, 126 defaults across 126 characters, and zero pending build stages. Mitya, recommendations, teams and migration history remained unchanged. Production was not accessed.
- Authenticated browser smoke checks rendered the Character prepare control and the selected Weapon candidate’s approval, acknowledgement and five rights controls. The run logged network and JavaScript console error-category events. Both review panels rendered, and these smoke results do not establish an error-free console.
- Public GraphQL returned zero Character and Weapon rankings for 7.2. Headless Chromium rendered `DATA PENDING` at desktop and mobile widths on both `/en/tierlist` and `/vi/tierlist`. Published-card links, layouts and data were outside the scope of the empty-state check.

## Remaining human actions

1. Resolve the candidate-specific gaps on both Favonius R1 proposals or record the recommended requests for changes in Weapon Tier Review. The other 18 can proceed to human examination of the rights evidence.
2. Personally review each exact checksum-bound packet. Supply missing authorship and editorial provenance, verify all five grounds individually, and explicitly acknowledge the gameplay evidence. Use the existing Character signed note or Weapon rights controls described in the decision sheet.
3. Provide and record the final candidate-specific Admin decision. For a Character approval, separately authorize its immediate public visibility. For a Weapon approval, authorize publication separately through the existing projection operation. Recheck the live checksum and version and take a fresh restore-tested development backup before any such write.

[Consolidated decision sheet](FINAL_20_CANDIDATE_ADMIN_REVIEW.md) · [Candidate rights matrix](FINAL_20_CANDIDATE_RIGHTS_MATRIX.json) · [Tier confirmation audit report](FINAL_TIER_CHANGE_CONFIRMATIONS.md)
