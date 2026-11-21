# Final Tier List 7.2 Admin decision execution

**Development result — all three REQUEST_CHANGES recorded. Zero Admin approvals and zero publications.** All 18 conditional editorial candidates and both tier changes remain pending.

## Final execution — authenticated development Admin API

The live backend authorized the existing local Admin credential and separately denied invalid and anonymous requests. Decisions used the documented backend GraphQL Admin path. The service supplied the Admin actor, and each decision was read back with its timestamp and matching audit entry.

| Candidate | Recorded state | Decision time (UTC) |
|---|---|---|
| CHAR-TIER-B2-06 | NEEDS_REVIEW | 2026-11-21T04:05:55.921Z |
| independent-12401-SUB_DPS-R1::D2 | REQUEST_CHANGES | 2026-11-21T04:05:56.01Z |
| independent-13501-MAIN_DPS-R1::D2 | REQUEST_CHANGES | 2026-11-21T04:05:56.151Z |

The browser retry succeeded after the automation focused the labeled password field, explicitly selected its existing contents, and used trusted Chromium input to replace them. The invalid attempt displayed the expected error. The valid attempt reached the Admin dashboard, established an HttpOnly session, and loaded the Admin queue through the frontend proxy. These checks reproduce a working form and backend connection. No login UI code change was needed.

The manifest and all candidate checksums matched. The fresh complete development backup restored in network-isolated PostgreSQL. All 22 application table counts and protected-data digests matched the source. Archive SHA-256 was 787b8fa8dc8377ddcce67f9e745a9d4a0d5afedfba02b595540fbb4bfcfcaaf0.

PostgreSQL confirmed the exact submitted reasons. Raiden uses NEEDS_REVIEW with a REQUEST_CHANGES audit event. Both Weapon decisions are D2 revision rows at logical version 1. Rights and evidence acknowledgement stayed unset, no tier changes were confirmed, and public GraphQL returned zero 7.2 rankings after each decision. The local public Tier List returned HTTP 200. Protected Character Build and migration digests matched before and after. Production was not accessed.

## Earlier resume attempt — stopped before writes

| Check | Result |
|---|---|
| Admin endpoint | ONLINE. The existing backend and frontend were started on loopback ports 4000 and 3001. The unrelated service on port 3000 was left running. |
| Authentication | FAIL on the execution run's repeated browser preflight. The initial check successfully logged in with the existing credential, confirmed an HttpOnly Admin session, rejected the invalid password, and verified that the backend independently rejected missing and invalid Admin keys. The execution run stopped when the browser login form did not accept input. |
| Manifest checksum | MATCH. All 23 D2 candidate payload checksums, both batch checksums, and all eight referenced artifact hashes matched. |
| Backup restored | YES. The complete private archive restored in a network-isolated PostgreSQL container. All 22 application table counts and the protected digests matched. |
| Raiden Shogun REQUEST_CHANGES | NOT RECORDED. No draft preparation committed. |
| Favonius Greatsword REQUEST_CHANGES | NOT RECORDED. |
| Staff of Homa REQUEST_CHANGES | NOT RECORDED. |
| Group A pending | 18 of 18. |
| Tier changes pending | 2 of 2. |
| Actual publications | 0. |
| Character Builds unchanged | YES. |
| Production not accessed | YES. |

The intended database was PostgreSQL 15.20 at 127.0.0.1:5434/genshinhub. Backup SHA-256 was 15472db517e6d3239f238b276897c43aa23891b263d4c93c4ac9bf3cecd5b812 (620335 bytes, file mode 0600). The restored database matched the source snapshot. The first authenticated pass confirmed 14 pending Weapon candidates at version 0 and an empty Character review table. The second run failed before the first write and was stopped without a mutation retry.

The final PostgreSQL readback found no Character or Weapon review rows, zero approvals, and an empty public projection. The protected before-and-after digests matched exactly. The public local Tier List returned HTTP 200 and the public 7.2 GraphQL query returned zero rankings for both lists. The local services were left running. The backend still has its pre-existing development warning for the missing USER_JWT_SECRET and remains bound to loopback.

The checklist and evidence below include the earlier execution snapshot. The final execution section records the latest checks and committed state.

## Preflight and integrity

- The authorized manifest SHA-256 matched the exact file bytes (de34074fe3eb7494737f4ed8a3bb5ef652cba9c39875165a5d0eadbf1b9e11c5). All eight referenced file hashes, 23 D2 payload hashes, and both D2 batch hashes matched. D2 payloads use recursively key-sorted canonical JSON. The repository preview and authoritative Weapon store agreed on candidate lineage, IDs, roles, conditions, tiers, and version 7.2. All seven Character and 14 Weapon targets were found in development.
- Development is PostgreSQL 15.20 in local container genshinhub-postgres, database genshinhub at 127.0.0.1:5434. The PostgreSQL probe confirmed read-only mode. The configured development backend on port 4000 and frontend on port 3001 were offline at preflight. No authenticated development Admin context was available. The later public probe accepted queries only.
- No real mutation was attempted. A fresh development backup and isolated restore test remain prerequisites for the first real write, including Raiden draft preparation.
- Before and after SHA-256 digests match for builds and build audits, weapon and artifact recommendations, teams and team members, legacy build fields, Mitya, Tier tables, and migration history. Development has 219 builds, 96 approved, 319 build audit rows, 88 archives, 126 defaults across 126 characters, and zero pending stages. All five applied migration checksums match the repository files.

## Candidate decisions

EDITORIAL_AGREEMENT applies to the 18 Group A candidates. RIGHTS_VERIFIED, EVIDENCE_ACKNOWLEDGED, ADMIN_APPROVED, and PUBLISHED each have zero development candidates. The six excluded Character drafts remain outside the action set.

### Group A — 18 conditional editorial approvals

| Candidate and exact IDs | Role · condition · proposed 7.2 tier | Candidate SHA-256 | Development outcome |
|---|---|---|---|
| Xiangling · `xiangling` / `CHAR-TIER-B2-01` | SUB_DPS · C0 · S | `722349957f2f8edac0e92fa0082c0c4d9c3d90f91926c346ecaa9fddef49c483` | Pending human rights and evidence acknowledgement |
| Xiangling · `xiangling` / `CHAR-TIER-B2-02` | SUB_DPS · C6 · S | `eaf5e65aef864a44b7e3fafd191d72c76782086d8b81a8bfb00db64212aac3c7` | Pending human rights and evidence acknowledgement |
| Furina · `furina` / `CHAR-TIER-B2-03` | SUB_DPS · C0 · SS | `cfbe95edb58192413f61f043c1c165e463c7812cc18166e07f75d63d49aa4f56` | Pending human rights and evidence acknowledgement |
| Furina · `furina` / `CHAR-TIER-B2-04` | SUPPORT · C0 · SS | `9b83756276f3699eed0e00d3cef7aed77c1efa02d6e93cf251f3ceced48ee383` | Pending human rights and evidence acknowledgement |
| Neuvillette · `neuvillette` / `CHAR-TIER-B2-05` | MAIN_DPS · C0 · SS | `9b9a799d6ed012d55b7843cff4ebfba2dfd5bb6a2606c468ca3d14652b48c41b` | Pending human rights and evidence acknowledgement |
| Nahida · `nahida` / `CHAR-TIER-B2-07` | SUPPORT · C0 · SS | `e850190905b6801552e71bf1c2966de86645c958249b2637547f94e82657c782` | Pending human rights and evidence acknowledgement |
| Zhongli · `zhongli` / `CHAR-TIER-B2-08` | SUPPORT · C0 · S | `18090c05ff53a8c3b13ca97bc9690fa050ce589df883e2e4bbb207f07cdfd19d` | Pending human rights and evidence acknowledgement |
| Yelan · `yelan` / `CHAR-TIER-B2-09` | SUB_DPS · C0 · S | `17fc33a57a09cc045cbaedf06dae6d00c400b3f8a4f184b1f69401ac4fbc9d00` | Pending human rights and evidence acknowledgement |
| Favonius Sword · `11401` / `independent-11401-SUPPORT-R1` | SUPPORT · R1 · SS | `c272e3d99e0bf387e9bee7ea9d2382901bb95611ce94c080067916d337c2796a` | Pending human rights and evidence acknowledgement |
| Sacrificial Sword · `11403` / `independent-11403-SUB_DPS-R5` | SUB_DPS · R5 · S | `9d2ba88fe7e76548a7d441cec191c5f85084802c7395e5aa5b0011d0a8a71897` | Pending human rights and evidence acknowledgement |
| Xiphos' Moonlight · `11418` / `independent-11418-SUPPORT-R1` | SUPPORT · R1 · S | `44030aa2e6271b6266ae44d3296554206b0cff0cb1361bba5063de44a8c3a0b2` | Pending human rights and evidence acknowledgement |
| Light of Foliar Incision · `11512` / `independent-11512-MAIN_DPS-R1` | MAIN_DPS · R1 · S | `65d1680be8357af2876bea3a5a01eb62db29f6f3d60b9ab49588f8cee034d1be` | Pending human rights and evidence acknowledgement |
| Wolf's Gravestone · `12502` / `independent-12502-SUPPORT-R1` | SUPPORT · R1 · A | `6f8a75c36bce167607de3199b3a7f50a3da75b6bba659766058bc0fb77f2c903` | Pending human rights and evidence acknowledgement |
| Favonius Lance · `13407` / `independent-13407-SUPPORT-R1` | SUPPORT · R1 · SS | `bce10da76bc12a1549a15b0086ad2dccd170cdd341b9075b773fd713dcaced25` | Pending human rights and evidence acknowledgement |
| Prototype Amber · `14406` / `independent-14406-SUPPORT-R5` | SUPPORT · R5 · A | `f6ce9d3d53e9c1482e657e09add62f06f1f0e601101c6dce131e08a65e4abc11` | Pending human rights and evidence acknowledgement |
| Kagura's Verity · `14509` / `independent-14509-SUB_DPS-R1` | SUB_DPS · R1 · A | `88c4f434069705901ba1e8b58286c1afb4858b583f14a6970bea58fd8558deeb` | Pending human rights and evidence acknowledgement |
| The Stringless · `15402` / `independent-15402-SUB_DPS-R1` | SUB_DPS · R1 · S | `53ee1c03f49387df21ef034804503958bfa43a2e131e5c6c4ddb7d5a69eff67f` | Pending human rights and evidence acknowledgement |
| Aqua Simulacra · `15508` / `independent-15508-MAIN_DPS-R1` | MAIN_DPS · R1 · S | `ca6e01e22ec2114ba18985b47c20813af57055ef2bbe6fd79c5f7f748a0820e2` | Pending human rights and evidence acknowledgement |

### Group B — 3 REQUEST_CHANGES directions

| Candidate and exact IDs | Role · condition · proposed 7.2 tier | Candidate SHA-256 | Development outcome |
|---|---|---|---|
| Raiden Shogun · `raiden-shogun` / `CHAR-TIER-B2-06` | MAIN_DPS · C0 · S | `43a5d660b157347ffc39ac073b5d38559fc0da7cf072a9a553a3aff946e80a64` | REQUEST_CHANGES recorded |
| Favonius Greatsword · `12401` / `independent-12401-SUB_DPS-R1` | SUB_DPS · R1 · A | `4f716a4ea1013604e38c04d034a369c0448103b0ae7331ca01ee1bc855886d4f` | REQUEST_CHANGES recorded |
| Staff of Homa · `13501` / `independent-13501-MAIN_DPS-R1` | MAIN_DPS · R1 · SS | `90da5f517c5feb9531e47bca67d81033e341ea2629ee59af8e7d4e4491f26831` | REQUEST_CHANGES recorded |

### Group C — 2 tier changes on hold

| Candidate and exact IDs | Role · condition · proposed 7.2 tier | Candidate SHA-256 | Development outcome |
|---|---|---|---|
| Thrilling Tales of Dragon Slayers · `14302` / `independent-14302-SUPPORT-R5` | SUPPORT · R5 · S | `353ed2b6feccc42d45e6cb711c4f689e2c828e828a25beae992d5cc9ba5b568a` | Held, SS → S unconfirmed |
| The Widsith · `14402` / `independent-14402-SUB_DPS-R1` | SUB_DPS · R1 · A | `6c8cedf40352a1af1323fb041be8666bb9bd96a35b59a37ff958f78555ab795f` | Held, S → A unconfirmed |

### Group B evidence gaps and mutation details

The JSON status preserves each original missing-evidence string and blocker code.

- **Raiden Shogun** — Define the exact on-field Main DPS archetype(s) being evaluated at C0. Quantify Resolve generation from party Bursts and show a representative burst-focused rotation. Show Energy contribution from Musou Isshin and Enlightened One at C0 with concrete team examples. Document team synergy and why those teams are representative in the assessed game version. State all C0 assumptions; explicitly exclude C2 and C6. Provide version-scoped comparative evidence against other MAIN_DPS characters justifying S rather than A or SS. Identify damage ceilings/limits versus competing Main DPS carries rather than relying on the rubric formula.
- **Favonius Greatsword** — CRIT Rate assumptions. Passive proc conditions. Rotation. Field-time requirements. Energy generation assumptions. Rubric justification. The frozen Group B status and LOW confidence remain. The verified R1 Windfall mechanics leave these six fields outstanding.
- **Staff of Homa** — Comparative dossier across varied Polearm Main DPS users in the assessed version. Examples showing where Max HP-to-ATK conversion matters and where it does not. Team configurations for ATK-scaling, HP-scaling and DEF/EM-oriented carries. Explicit rationale for SS rather than S using the weapon rubric criteria. Exclude the conditional below-50% bonus from the baseline.

- **Raiden Shogun** — In the existing Character Admin screen, prepare the exact D2 draft. Submit requestChangesCharacterTierRanking with the row ID, fresh updatedAt, exact candidate checksum, and the reason above. The transition records NEEDS_REVIEW and a REQUEST_CHANGES audit event.
- **Favonius Greatsword and Staff of Homa** — Submit adminDecideWeaponTierReview with their respective ::D2 operational IDs, D2_REVISED, REQUEST_CHANGES, exact record SHA-256, batch eae26ea26b737d8e1cbe6cdabcc340c13575e47af0737a91e6662749b7460185, and the fresh logical version from the Admin queue. An absent row starts at version 0. Submit the reason above with evidence acknowledgement and rights unset.
- Before those actions, authenticate a real authorized development Admin, create and restore-test a fresh backup, and recheck the live state for conflicts. After each action, verify the audit and absence from the public projection.

## Rights and publication gates

- The rights matrix links every D2 dossier and its frozen predecessor, with checkable local genshin-db@5.2.15 mechanics for all Character targets and exact-refinement passive matches for all Weapon rows. The 18 Group A packets distinguish verified game facts, editorial assessments, and missing provenance. External reference links are attributed by the dossiers. Independent verification covers the local fields identified in the matrix.
- No candidate has a persisted rights attestation, actor, or timestamp. A human must establish independent derivation and authorship, review potential editorial copying, confirm source attribution and representative gameplay, and write a substantive candidate-specific rights note bound to the exact checksum. The existing review found no Genshin-Builds republication license. Obtain explicit human evidence acknowledgement for the same checksum.
- **Character** — The existing verification mutation stores a signed rights note with actor and timestamp. The current D2 guard checks the tier, evidence, explanation and checksum for rights verification and approval. The Character workflow has no standalone evidence acknowledgement field or mutation. Obtain explicit human acknowledgement tied to the exact candidate checksum before approval. Approved independent Character rows feed the public query.
- **Weapon** — The existing Admin review stores the five rights grounds and note. Approval requires evidence acknowledgement. Transactional publication checks the audited decision and rights, exact version and checksum, and any separate tier confirmation. Its public projection requires approved, independent, rights-verified rows.
- **Group C** — Keep each change on hold until its own checksum-bound human confirmation. Neither confirmation was recorded.

## Verification results

- **Isolated PostgreSQL and GraphQL** — 25 existing tests passed. They covered Character and Weapon approval, missing rights, Weapon evidence acknowledgement, invalid checksums, stale versions, anonymous access, tier confirmation, concurrent publication, rollback, audits, source-derived exclusion, and 7.2 projection filtering. Three additional exact Group B operations passed on fresh fixtures, each with a verified audit, stale replay denial, and hidden public result. Test identities and attestations were confined to isolated PostgreSQL.
- **Development GraphQL** — The current resolvers queried the verified development database in read-only mode. Explicit 7.2 queries returned zero Character and zero Weapon rankings. Both Admin queues denied anonymous access.
- **Development browser** — Headless Chromium rendered DATA PENDING on both /en/tierlist and /vi/tierlist against the read-only GraphQL probe. Both public ranking queries default to 7.2 and allow explicit versions. The Tier List page explicitly requests 7.2.

[Rights verification matrix](FINAL_RIGHTS_VERIFICATION_MATRIX.json) · [Publication status and protected-data digests](FINAL_PUBLICATION_STATUS.json) · [Frozen blockers](FINAL_TIERLIST_BLOCKERS.md)
