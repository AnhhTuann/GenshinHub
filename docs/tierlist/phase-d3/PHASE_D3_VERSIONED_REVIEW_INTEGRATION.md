# Phase D3 — Versioned Review Integration

**Status:** `IMPLEMENTED — REVIEW-ONLY — NO APPROVAL / NO IMPORT / NO RANKING WRITE / NO PRODUCTION WRITE`
**Date:** 2026-11-20
**Scope:** connect the 23 Phase D2 revised drafts (9 Character + 14 Weapon) to the existing Admin Review workflow with safe content versioning, without changing the frozen originals or inheriting old approvals.

No real Admin decision exists in this report. No `--apply`, import, rights flip, ranking write, production write, commit, push, merge, or deploy was performed. No Prisma migration was added and no applied migration was edited. The development database remained unchanged (verified below). B3.3 Admin E2E is still incomplete, so no browser-workflow PASS is claimed.

---

## 1. Version mapping

| Layer | Version / value | Notes |
|---|---|---|
| B3.1 frozen candidate batch | `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e` | Original immutable Weapon freeze; unchanged and re-verified. |
| B3.1 freeze manifest | `30372bf5de13d50856d479789f64598b53fde474c6043f4787094d5fd628777a` | Per-record SHA-256 anchors remain authoritative. |
| B3.1 decision sheet | `a100002cc2e5f1815bf20836bda1b111c68d97bd22aa924161541c61df40caf9` | Consumed by the existing B3.2 workflow. |
| B2 Character source | `PHASE_D_CHARACTER_APPROVAL_SHEET.json` + `PHASE_B2_RANKING_DRAFTS.json` | 9 in-scope records; 6 excluded drafts remain untouched. |
| D2 Character revised artifact | `1177ecd1536703d83167e0e09d30aa145deb10a66f9e3440839dd450756d896e` | 9 records; canonical checksum recomputed in D3. |
| D2 Weapon revised artifact | `eae26ea26b737d8e1cbe6cdabcc340c13575e47af0737a91e6662749b7460185` | 14 records; canonical checksum recomputed in D3. |
| Current Admin Review version | no persisted dev-DB rows; logical `v0` | Dev DB `WeaponTierReview=0`, `WeaponTierReviewAudit=0`. Isolated B3.2 test DB was used and cleaned. |
| D3 Weapon review identity | `${stableCandidateId}::D2` | New checksum-bound identity; stable base ID preserved as `stableCandidateId`. |
| D3 Character review identity | original `CHAR-TIER-B2-xx` | Exposed through the read-only 23-record preview; no new Character review table/migration. |

Versioning rules implemented:

- Frozen originals stay immutable. B3.1 per-record checksums remain the lineage/source checksums.
- Each D2 record has a new canonical `newChecksum`, recomputed from the artifact with only `newChecksum` omitted.
- Old checksum → new checksum linkage is verified on every source load; hand-edited checksums fail closed.
- Stable target IDs, roles, conditions, and review history are preserved.
- A D2 Weapon review is a fresh `WeaponTierReview` row with `decision=PENDING`, `rightsVerified=false`, `tierChangeConfirmed=false`, `evidenceAcknowledged=false`, and logical version `0`.
- All decisions bind to the D2 artifact batch and the D2 per-record checksum. Supplying a B3.1 checksum is rejected as `SUPERSEDED_VERSION`, and a row bound to an older checksum is rejected as `SUPERSEDED_REVIEW_VERSION`.
- `approvalCarriedOver` is reported per record and is `false` for all in-scope D2 candidates.
- No new Prisma column or migration was required: `batchSha256`, `recordSha256`, `version`, `evidenceSupplement`, and audit `changes` already provide the needed binding; the full source/revision history stays in the versioned artifacts plus audit JSON.

---

## 2. 23-record diff summary

All 23 records are present in the read-only preview. No candidate ID is duplicated. All records have `adminDecision=PENDING`, `approvalCarriedOver=false`, and `importEligibleNow=false`.

| Candidate ID | Prev → current | Target ID | Role / condition | Proposed tier | Old checksum | New checksum | Changed fields | Review status | Rights / import |
|---|---|---|---|---|---|---|---|---|---|
| CHAR-TIER-B2-01 | B2_FROZEN → D2_REVISED | xiangling | SUB_DPS / C0 | S | `0336f88f1ad66bedeccc7a125c90f9abee0a0c5d225fc507062e6a7391a79b89` | `722349957f2f8edac0e92fa0082c0c4d9c3d90f91926c346ecaa9fddef49c483` | teamAssumptions, evidence, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | rightsVerified=false / import=false |
| CHAR-TIER-B2-02 | B2_FROZEN → D2_REVISED | xiangling | SUB_DPS / C6 | S | `ddde1a741219d9d62b4f0bdb9f0c00441dad25a7eee0a76248fde851c04fd56f` | `eaf5e65aef864a44b7e3fafd191d72c76782086d8b81a8bfb00db64212aac3c7` | explanationVi, limitations, teamAssumptions, evidence, reviewStatus | REVISION_READY_FOR_ADMIN_REVIEW | rightsVerified=false / import=false |
| CHAR-TIER-B2-03 | B2_FROZEN → D2_REVISED | furina | SUB_DPS / C0 | SS | `75541b909f10a7b23c9936239dcba65c2f4966dfe1e1b8000ec7cbb165a23efc` | `cfbe95edb58192413f61f043c1c165e463c7812cc18166e07f75d63d49aa4f56` | explanationVi, limitations, teamAssumptions, evidence, reviewStatus | REVISION_READY_FOR_ADMIN_REVIEW | rightsVerified=false / import=false |
| CHAR-TIER-B2-04 | B2_FROZEN → D2_REVISED | furina | SUPPORT / C0 | SS | `538f11b1a3522b220f85b6ea206f837c1258b563b960c789c94817bd2d82370d` | `9b83756276f3699eed0e00d3cef7aed77c1efa02d6e93cf251f3ceced48ee383` | explanationVi, limitations, teamAssumptions, evidence, reviewStatus | REVISION_READY_FOR_ADMIN_REVIEW | rightsVerified=false / import=false |
| CHAR-TIER-B2-05 | B2_FROZEN → D2_REVISED | neuvillette | MAIN_DPS / C0 | SS | `a5f92bff8291740647564f7acc8320a96cc9bcb8fa235011b52cb74c0f7c1805` | `9b9a799d6ed012d55b7843cff4ebfba2dfd5bb6a2606c468ca3d14652b48c41b` | explanationVi, limitations, teamAssumptions, evidence, reviewStatus | REVISION_READY_FOR_ADMIN_REVIEW | rightsVerified=false / import=false |
| CHAR-TIER-B2-06 | B2_FROZEN → D2_REVISED | raiden-shogun | MAIN_DPS / C0 | S | `0a66f70cf3639d98046376b4930898020898d245160863f4ce0f9f0e56f703c2` | `43a5d660b157347ffc39ac073b5d38559fc0da7cf072a9a553a3aff946e80a64` | explanationVi, limitations, teamAssumptions, evidence, reviewStatus | NEEDS_MORE_COMPARATIVE_EVIDENCE | rightsVerified=false / import=false |
| CHAR-TIER-B2-07 | B2_FROZEN → D2_REVISED | nahida | SUPPORT / C0 | SS | `5a4394a5aa57e6ba10904bd2c0d0febd0a8c3cf49bebe05d4a119efb12029bc8` | `e850190905b6801552e71bf1c2966de86645c958249b2637547f94e82657c782` | evidence, reviewStatus | VERIFIED_NO_CONTENT_CHANGE | rightsVerified=false / import=false |
| CHAR-TIER-B2-08 | B2_FROZEN → D2_REVISED | zhongli | SUPPORT / C0 | S | `e4076469882f22b097ca886e8537c8a291781b08c70f67d72c10e82fe61155d0` | `18090c05ff53a8c3b13ca97bc9690fa050ce589df883e2e4bbb207f07cdfd19d` | explanationVi, limitations, teamAssumptions, evidence, reviewStatus | REVISION_READY_FOR_ADMIN_REVIEW | rightsVerified=false / import=false |
| CHAR-TIER-B2-09 | B2_FROZEN → D2_REVISED | yelan | SUB_DPS / C0 | S | `bb5d45f5c28afb2b2fd61ef4bd5c0431c54b9d99b593fb4a0fe38951cc2eb225` | `17fc33a57a09cc045cbaedf06dae6d00c400b3f8a4f184b1f69401ac4fbc9d00` | explanationVi, limitations, teamAssumptions, evidence, reviewStatus | REVISION_READY_FOR_ADMIN_REVIEW | rightsVerified=false / import=false |
| independent-11401-SUPPORT-R1 | B3_1_FROZEN → D2_REVISED | 11401 | SUPPORT / R1 | SS | `99bcedcc30f03b29008f31285c00fdcac1a19dd0337c30764060c99bcfa9dce9` | `c272e3d99e0bf387e9bee7ea9d2382901bb95611ce94c080067916d337c2796a` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-11403-SUB_DPS-R5 | B3_1_FROZEN → D2_REVISED | 11403 | SUB_DPS / R5 | S | `79833088e0284741a1401b572af8f51788c55f627225a0df02f2260bf90cd257` | `9d2ba88fe7e76548a7d441cec191c5f85084802c7395e5aa5b0011d0a8a71897` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-11418-SUPPORT-R1 | B3_1_FROZEN → D2_REVISED | 11418 | SUPPORT / R1 | S | `3e268bac16e789d3ddc732a562f5d8db4678f94784f663e5828da8683e36bda7` | `44030aa2e6271b6266ae44d3296554206b0cff0cb1361bba5063de44a8c3a0b2` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-11512-MAIN_DPS-R1 | B3_1_FROZEN → D2_REVISED | 11512 | MAIN_DPS / R1 | S | `ff161813968954a2eaf2387b04eed7da6232e9846328160079f571c99e047929` | `65d1680be8357af2876bea3a5a01eb62db29f6f3d60b9ab49588f8cee034d1be` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-12401-SUB_DPS-R1 | B3_1_FROZEN → D2_REVISED | 12401 | SUB_DPS / R1 | A | `4c6d8185295e9e7abb9f1fdab6d682b85569c5d8b12ca1cbab8e67d20dff051a` | `4f716a4ea1013604e38c04d034a369c0448103b0ae7331ca01ee1bc855886d4f` | exactGameplayAssumptions, gameFacts, reviewStatus | NEEDS_MORE_EVIDENCE | publishRightsVerified=false / import=false |
| independent-12502-SUPPORT-R1 | B3_1_FROZEN → D2_REVISED | 12502 | SUPPORT / R1 | A | `4831c47ef50dd9ec4481101b0c0e408a29b7215e0c78bd3e433503ebbecf6724` | `6f8a75c36bce167607de3199b3a7f50a3da75b6bba659766058bc0fb77f2c903` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-13407-SUPPORT-R1 | B3_1_FROZEN → D2_REVISED | 13407 | SUPPORT / R1 | SS | `9c05a3f28683a33234e1ad912882ad281822e53c0db41dcb3944d06212b83e0e` | `bce10da76bc12a1549a15b0086ad2dccd170cdd341b9075b773fd713dcaced25` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-13501-MAIN_DPS-R1 | B3_1_FROZEN → D2_REVISED | 13501 | MAIN_DPS / R1 | SS | `af208d96f8a5d859d1ed54bcc35d7c95122decec2c7897705aba62282cb17e86` | `90da5f517c5feb9531e47bca67d81033e341ea2629ee59af8e7d4e4491f26831` | exactGameplayAssumptions, gameFacts, reviewStatus | NEEDS_MORE_COMPARATIVE_EVIDENCE | publishRightsVerified=false / import=false |
| independent-14302-SUPPORT-R5 | B3_1_FROZEN → D2_REVISED | 14302 | SUPPORT / R5 | S | `14e2cd13fc59cf36709fcf2189ad9f9ea825f4c76adfd669b1d4fcc9667f7c57` | `353ed2b6feccc42d45e6cb711c4f689e2c828e828a25beae992d5cc9ba5b568a` | exactGameplayAssumptions, gameFacts, reviewStatus | MANDATORY_TIER_RE_REVIEW_PENDING | publishRightsVerified=false / import=false |
| independent-14402-SUB_DPS-R1 | B3_1_FROZEN → D2_REVISED | 14402 | SUB_DPS / R1 | A | `7976f8d5c0119eba5c393b495e4445f60d22486f2e4b33e6bcb799cbbc620df9` | `6c8cedf40352a1af1323fb041be8666bb9bd96a35b59a37ff958f78555ab795f` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | MANDATORY_TIER_RE_REVIEW_PENDING | publishRightsVerified=false / import=false |
| independent-14406-SUPPORT-R5 | B3_1_FROZEN → D2_REVISED | 14406 | SUPPORT / R5 | A | `25d579067f2654c8eb4f591a6eeee33ce0ef78965cb8414621fc69ddc6711e0d` | `f6ce9d3d53e9c1482e657e09add62f06f1f0e601101c6dce131e08a65e4abc11` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-14509-SUB_DPS-R1 | B3_1_FROZEN → D2_REVISED | 14509 | SUB_DPS / R1 | A | `50bf4af224937eaf825459f7c2dab84aea3cd36c634493631a606862acb9b381` | `88c4f434069705901ba1e8b58286c1afb4858b583f14a6970bea58fd8558deeb` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISION_READY_FOR_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-15402-SUB_DPS-R1 | B3_1_FROZEN → D2_REVISED | 15402 | SUB_DPS / R1 | S | `c4ded204a2e3c98b210583071984ca6607cb109d47de5e861fbb671e29bdc448` | `53ee1c03f49387df21ef034804503958bfa43a2e131e5c6c4ddb7d5a69eff67f` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |
| independent-15508-MAIN_DPS-R1 | B3_1_FROZEN → D2_REVISED | 15508 | MAIN_DPS / R1 | S | `07431e870377f01815f9d071b363040a5f7124c5b3420308382a71620e0874e8` | `ca6e01e22ec2114ba18985b47c20813af57055ef2bbe6fd79c5f7f748a0820e2` | explanationVi, tierJustification, exactGameplayAssumptions, gameFacts, reviewStatus | REVISED_PENDING_ADMIN_REVIEW | publishRightsVerified=false / import=false |

Aggregate diff:

- 23/23 new checksums recomputed from canonical revised records.
- 23/23 old checksums matched the frozen source and differed from the new checksum.
- 23/23 records expose the required UI fields: Candidate ID, previous/current version, Character/Weapon ID, Role, Constellation/Refinement, Proposed Tier, Explanation, Evidence, Gameplay conditions, Confidence, Diff, Current checksum, Review status, Rights status.

---

## 3. Content-changed records

22 records have substantive revised content:

- **Character (8):** `CHAR-TIER-B2-01` through `CHAR-TIER-B2-06`, `CHAR-TIER-B2-08`, `CHAR-TIER-B2-09`.
- **Weapon (14):** all 14 D2 Weapon records.

Notable required corrections preserved:

- Xiangling C0 keeps S only with explicit 80 Energy / ER / battery / Pyronado uptime / reaction assumptions; no C1/C4/C6 benefit is counted.
- Xiangling C6 uses KQM-tested behavior: Pyronado does not gain the C6 buff, while Guoba and the initial swing hit 3 do.
- Furina `SUB_DPS` and `SUPPORT` remain separate records.
- Neuvillette C0 separates the three A1-maximizing Hydro reactions from playability and addresses C0 interruption.
- Zhongli C0 includes Jade Shield 20% Elemental/Physical RES shred.
- `14302` SS→S and `14402` S→A are recorded as mandatory separate tier re-reviews; neither is auto-confirmed.
- `12401` remains `NEEDS_MORE_EVIDENCE / LOW` with six missing evidence fields.
- `13501` remains paused for comparative evidence.
- Raiden C0 remains `NEEDS_MORE_COMPARATIVE_EVIDENCE`.

No tier was changed in the 9 Character records.

---

## 4. Unchanged records

- `CHAR-TIER-B2-07` (Nahida C0 SUPPORT) is `VERIFIED_NO_CONTENT_CHANGE`; its D2 checksum is a new artifact version, but substantive content is unchanged.
- All 9 Character proposed tiers remain unchanged.
- 12 of 14 Weapon tiers remain unchanged; only `14302` and `14402` are tier changes.
- B3.1 freeze manifest, decision sheet, admin review sheet, and per-record frozen checksums were not edited. Freeze verification returned `ok: true`, `issues: []`.
- The 6 excluded Character drafts remain excluded/not-ready and were not added to the 23-record in-scope set.

---

## 5. Review status

| Scope | Status | Count |
|---|---|---:|
| Character | REVISED_PENDING_ADMIN_REVIEW | 1 |
| Character | REVISION_READY_FOR_ADMIN_REVIEW | 6 |
| Character | NEEDS_MORE_COMPARATIVE_EVIDENCE | 1 |
| Character | VERIFIED_NO_CONTENT_CHANGE | 1 |
| Weapon | REVISED_PENDING_ADMIN_REVIEW | 9 |
| Weapon | REVISION_READY_FOR_ADMIN_REVIEW | 1 |
| Weapon | NEEDS_MORE_EVIDENCE | 1 |
| Weapon | NEEDS_MORE_COMPARATIVE_EVIDENCE | 1 |
| Weapon | MANDATORY_TIER_RE_REVIEW_PENDING | 2 |

Persisted Admin Review state:

- Development DB: `WeaponTierReview=0`, `WeaponTierReviewAudit=0` before and after all D3 work.
- Isolated test DB `genshinhub_b32_review_test_97c1`: integration tests created review/audit rows, verified guards, then deleted them.
- No live authenticated Admin session was available; no live authenticated Admin mutation was run. Test actors were server-derived context actors in the isolated test DB.
- All D2 artifact approvals are `PENDING` with null actor, null decided time, null reason, and `adminDecision=PENDING`.

---

## 6. Missing evidence

- `independent-12401-SUB_DPS-R1` — `NEEDS_MORE_EVIDENCE`, `confidence=LOW`. Missing six fields: `critRateAssumptions`, `passiveProcConditions`, `rotation`, `fieldTimeRequirements`, `energyGenerationAssumptions`, `rubricJustification`.
- `independent-13501-MAIN_DPS-R1` — `NEEDS_MORE_COMPARATIVE_EVIDENCE`. Missing comparative Polearm Main DPS evidence, HP-to-ATK conversion examples, scaling-team configurations, and explicit SS-vs-S rubric rationale.
- `CHAR-TIER-B2-06` (Raiden C0) — `NEEDS_MORE_COMPARATIVE_EVIDENCE`; remains paused.
- All other in-scope records have evidence and gameplay assumptions present; that is not an Admin acknowledgement or approval.

The D2 integration blocks `APPROVE` with `REVISION_EVIDENCE_INCOMPLETE` for D2 records whose source artifact still has unresolved evidence blockers.

---

## 7. Rights status

- All 14 Weapon D2 records keep `publishRightsVerified=false` and `sourceDerivedResearchUsedAsRanking=false`.
- All 23 D2 records have `approval.rightsVerified=false`; no rights-verified actor or time exists.
- Character D2 records have no per-record `rightsStatus` field in the source artifact; the preview reports `rightsVerified=false`.
- D2 Weapon review rows start with `rightsVerified=false`. Rights must be verified separately through `adminVerifyWeaponTierReviewRights`, with all five grounds and a server-derived actor. No persisted rights-verification state is copied from the frozen version; all 14 D2 records supply their own `rightsStatus` with `publishRightsVerified=false`.
- No rights flag was flipped in development or production.

---

## 8. Tier-change confirmation status

| Candidate | Change | Status |
|---|---|---|
| `independent-14302-SUPPORT-R5` | SS → S | `MANDATORY_TIER_RE_REVIEW_PENDING`; `confirmed=false`; separate Admin confirmation required. |
| `independent-14402-SUB_DPS-R1` | S → A | `MANDATORY_TIER_RE_REVIEW_PENDING`; `confirmed=false`; separate Admin confirmation required. |

Implemented guards:

- `adminConfirmWeaponTierChange` is required before `APPROVE` for either candidate.
- Confirmation is checksum-bound to the D2 artifact and per-record checksum.
- Confirmation is server-derived, audited, and separate from rights verification and decision recording.
- A non-tier-change candidate returns `NOT_A_TIER_CHANGE`.
- No tier confirmation was performed outside the isolated test DB.

---

## 9. Admin workflow integration

Backend:

- `weaponTierReview.sources.ts` registers two authoritative stores: `FROZEN` and `D2_REVISED`. Each load recomputes D2 artifact/record checksums and verifies D2 `oldChecksum` against the B3.1 manifest.
- D2 Weapon candidate IDs are namespaced `${stableCandidateId}::D2`; the base ID is preserved as `stableCandidateId` and linked as `previousCandidateId`.
- `WeaponTierReviewService` serves both versions from the same service/tables. Existing B3.2 callers and the importer default to `FROZEN` and keep seeing exactly 14 old candidates.
- Added `WeaponTierReviewSource` enum and optional `sourceVersion` argument to the 3 queries and 3 mutations. Backward compatible: omitted value means `FROZEN`.
- Added read-only `adminD3VersionedReviewPreview` admin query exposing all 23 records plus 6 excluded Character drafts.
- Existing review state fields are reused; no Prisma schema/migration change.
- Audit entries record source version, stable/previous candidate IDs, source/revised checksums, changed fields, and revision status.

Frontend:

- Weapon Admin page adds a `B3.1 Frozen / D2 Revised` selector. D2 mode sends `sourceVersion=D2_REVISED` and uses D2 batch/checksum values for rights, tier confirmation, and decisions.
- Per record the page now shows Candidate ID, stable/previous ID, previous/current version, Weapon ID, Role, Refinement, Proposed Tier, Explanation, Evidence, Gameplay assumptions, Confidence, Version diff, Current checksum, Review status, and Rights status.
- Character and Weapon Admin pages both render a read-only Phase D3 preview panel using the 23-record admin query. Character records are preview-only because no separate versioned Character review model exists; this avoids an unauthorized migration.
- Client actor fields are still ignored; all actors/times come from the verified backend context.

---

## 10. Import eligibility

Current state: **0 importable records**. The existing importer remains B3-only and defaults to the `FROZEN` queue; no D2 import path was added or authorized.

Guards verified:

- `PENDING`, `REQUEST_CHANGES`, `REJECT` are rejected by the importer/D3 eligibility evaluation.
- Missing rights verification, missing rights grounds, rights-basis checksum mismatch, missing gameplay acknowledgement, missing tier re-review confirmation, and missing evidence block approval/import.
- Bad batch checksum → `BATCH_CHECKSUM_MISMATCH`.
- Bad record checksum → `RECORD_CHECKSUM_MISMATCH`.
- Frozen checksum supplied for D2, or D2 checksum supplied for frozen → `SUPERSEDED_VERSION`.
- Persisted row bound to an older checksum → `SUPERSEDED_REVIEW_VERSION`.
- `SOURCE_DERIVED` derivation is excluded.
- Stale `expectedVersion` → `CONCURRENT_MODIFICATION`.
- `D2_REVISED` blocked/paused records (`12401`, `13501`) remain ineligible even after rights and evidence acknowledgement because the source artifact still has unresolved evidence blockers.

No import was run with `--apply`, no ranking row was written, and no `publishRightsVerified` value was set by any script.

---

## 11. Test results

Commands were run sequentially from the stated working directory. Exit codes are the observed process exit codes.

| # | Command | Workdir | Exit | Result |
|---:|---|---|---:|---|
| 1 | `node /tmp/opencode/d2/validate-d2.cjs` | repo root | 0 | `D2_CUSTOM_VALIDATION=PASS checks=30 passed=30 failed=0`; watched source hashes 15/15; 23/23 checksums recomputed. |
| 2 | `node scripts/weapon-tier-independent/freeze.cjs --verify` | `backend` | 0 | `ok:true`, `issues:[]`, batch `e61f9f4c…a810e`, `writeCount:0`, DB ranks/audits `0`. |
| 3 | `TS_NODE_COMPILER_OPTIONS='{"rootDir":"."}' npx ts-node --transpile-only src/graphql/modules/phaseD3/versionedReview.test.ts` | `backend` | 0 | `pass=6 fail=0`: 23-record preview, checksum links, superseded checksum, no inherited approval, Character/Weapon invariants, import guards. |
| 4 | `TS_NODE_COMPILER_OPTIONS='{"rootDir":"."}' npx ts-node --transpile-only src/graphql/modules/weaponTierReview/weaponTierReview.integration.test.ts` | `backend` | 0 | `pass=16 fail=0` on isolated test DB: auth, 14 frozen + 14 D2 candidates, checksum binding, stale/approval guards, rights, evidence, tier, audit, no ranking write. Rows cleaned after run. |
| 5 | `node scripts/weapon-tier-independent/import-b32.test.cjs` | `backend` | 0 | `pass=9 fail=0`: DB-only decisions, no fake actors, PENDING/negative decisions, rights, Group B evidence, checksum and bypass guards. |
| 6 | Character/Weapon regression loop (11 TS test files) | `backend` | 0 | 69 assertions/tests across files, all `fail=0`: weaponTierRanking 17, graphql 5, migration 5, dataloader 2, characterTierRanking 13, graphql 3, B2 draft 9, B2.5 6, migration 2, C1 smoke 3, tierReviewSecurity 4. |
| 7 | `npx tsc --noEmit --pretty false` | `backend` | 0 | `BACKEND_TSC_PASS`. |
| 8 | `npx tsc --noEmit --pretty false` | `frontend` | 0 | `FRONTEND_TSC_PASS`. |
| 9 | Read-only dev DB count probe | `backend` | 0 | `db=genshinhub`, `WeaponTierReview=0`, `WeaponTierReviewAudit=0`, `CharacterTierRanking=0`, `WeaponTierRank=0`, `CharacterBuildAudit=127`. |

Regression loop command used for row 6:

```bash
set -e
for f in \
  src/graphql/modules/weaponTierRanking/weaponTierRanking.test.ts \
  src/graphql/modules/weaponTierRanking/weaponTierRanking.graphql.test.ts \
  src/graphql/modules/weaponTierRanking/migration.test.ts \
  src/graphql/modules/weaponTierRanking/weaponTierDataloader.test.ts \
  src/graphql/modules/characterTierRanking/characterTierRanking.test.ts \
  src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts \
  src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts \
  src/graphql/modules/characterTierRanking/phaseB25Review.test.ts \
  src/graphql/modules/characterTierRanking/migration.test.ts \
  src/graphql/modules/characterTierRanking/phaseC1Smoke.test.ts \
  src/graphql/modules/tierReviewSecurity.d1.test.ts; do
  TS_NODE_COMPILER_OPTIONS='{"rootDir":"."}' npx ts-node --transpile-only "$f"
done
```

Not run intentionally:

- Browser/Playwright E2E — B3.3 Admin E2E is incomplete; no browser PASS is claimed.
- Database-mutating integration tests that write the development DB.
- Any importer `--apply`, approval mutation against the dev DB, rights flip, ranking write, production write, commit, push, merge, or deploy.
- Any change to `Character Multi-Build`, Tier List redesign, or the B3 audit.

---

## 12. Files changed

Backend:

- `backend/src/graphql/index.ts` — registered the Phase D3 preview module.
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.sources.ts` — versioned FROZEN/D2 source registry and checksum validation.
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.service.ts` — version-aware queue/one/audit/decide/rights/tier workflow; checksum and lineage guards; no ranking writes.
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.schema.ts` — `WeaponTierReviewSource`, `sourceVersion` args, stable/previous ID and version fields.
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.resolvers.ts` — pass `sourceVersion` through all operations.
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.integration.test.ts` — expanded to 16 tests covering FROZEN + D2_REVISED.
- `backend/src/graphql/modules/phaseD3/versionedReview.ts` — 23-record read-only preview, checksum links, no-inheritance guard, pure import eligibility guard.
- `backend/src/graphql/modules/phaseD3/versionedReview.schema.ts` — admin preview query SDL.
- `backend/src/graphql/modules/phaseD3/versionedReview.resolvers.ts` — admin-only resolver.
- `backend/src/graphql/modules/phaseD3/versionedReview.test.ts` — 6 D3 integrity/guard tests.
- `backend/scripts/weapon-tier-independent/import-approved.cjs` — confirmed/restored B3/FROZEN-only importer: default queue has no `sourceVersion`, D2 candidates are never imported, decisions bind to frozen checksums.
- `backend/scripts/weapon-tier-independent/b3-test-helpers.cjs` — restored frozen checksum fixtures so B3 importer tests remain FROZEN-only.

Frontend:

- `frontend/app/[locale]/admin/weapon-tier-review/page.tsx` — source version selector, D2-aware mutations, expanded per-record fields, diff display, preview panel.
- `frontend/app/[locale]/admin/character-tier-review/page.tsx` — read-only Character D3 preview panel.
- `frontend/components/admin/PhaseD3PreviewPanel.tsx` — shared 23-record read-only Admin preview.

Not changed:

- `backend/prisma/schema.prisma` and all migrations.
- `docs/weapon-tier-independent/*` frozen artifacts.
- `docs/tierlist/phase-d2/*` artifacts.
- Ranking tables, rights flags, production data, frozen artifacts, and Phase D2 artifacts.

---

## 13. Pending Admin actions

1. **Review, do not auto-approve.** Use the Admin UI to inspect each of the 23 records. All decisions must remain `PENDING` until a real Admin acts.
2. **Verify rights separately** for every record intended for publication. All five grounds and a note are required; no script may set `publishRightsVerified=true`.
3. **Acknowledge evidence separately** before any `APPROVE`.
4. **Resolve evidence blockers:** keep `12401` blocked/LOW until all six fields are supplied; keep `13501` paused until comparative evidence is supplied; keep Raiden C0 `NEEDS_MORE_COMPARATIVE_EVIDENCE`.
5. **Confirm tier changes separately** for `14302` SS→S and `14402` S→A. Do not treat D2 recommendation text as confirmation.
6. **Use D2 checksums only** for D2 decisions: batch `eae26ea26b737d8e1cbe6cdabcc340c13575e47af0737a91e6662749b7460185` and the per-record `newChecksum` values in section 2. Frozen checksums are superseded.
7. **Do not import yet.** The existing importer is B3-only and import eligibility is currently zero. A separate D2 importer requires its own design, checksum binding, tests, and explicit authorization.
8. **Complete B3.3 Admin E2E** with a real authenticated Admin session before claiming browser workflow PASS.
9. **Re-run freeze + D2 checksum verification** immediately before any future write; any mismatch must be treated as `CONCURRENT_EDIT` and stop.

**Final boundary:** this phase stops at versioned preview and guarded Admin workflow integration. No approval, rights flip, import, ranking write, production write, commit, push, merge, or deploy has been performed.
