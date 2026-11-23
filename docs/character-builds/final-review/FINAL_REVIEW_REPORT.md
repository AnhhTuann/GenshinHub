# Character Build final review

> A01’s R3 package supersedes its historical R2 payload below. [Current A01 review](A01_FINAL_REVIEW.md).

2026-11-20 · Frozen source `character-build-catalog-7.2-r1` · Corrections `character-build-catalog-7.2-r2`

**Batch A01 is ready for human review. Real approvals and imports are both zero.** A01 contains three existing legacy profiles with complete proposed patches, preserved default IDs, and no current protected-build conflict. Its exact boundary is the candidate IDs and R2 checksums below.

## Coverage and decisions

| State | Drafts | Characters |
|---|---:|---:|
| Inspected and mechanically screened | 133 | 127 |
| Group A · REVIEW_READY | 12 | 12 |
| Group B · DRAFTED, more evidence required | 115 | 111 |
| Group C · DRAFTED, blocked | 6 | 6 |
| HUMAN_APPROVED in development by this task | 0 | 0 |
| IMPORTED in development by this task | 0 | 0 |

A character with distinct builds can appear in more than one group. The role tallies in `READY_BATCHES.json` are non-exclusive because a build can carry several roles. The live catalog has 131 characters, 127 existing builds, 126 defaults, and 127 existing audit entries. The draft set contains 122 revisions, five first builds, and six alternate role builds. It originally had 106 drafts with a lineup, and 27 drafts without one. No fabricated lineup was added.

The generic Traveler and the two Manekin entries remain blocked outside the draft set. Both of Mitya’s approved builds, the Support/Sub DPS default, and their build-scoped recommendations are preserved.

## Provenance and gameplay checks

- **Genshin-Builds:** All 133 dossiers reference observed comparison data for their 127 owners. These are the saved 2026-11-20 R1 observations, with exact access timestamps and per-category comparisons. They are not fresh R2 source recommendations. The generic Traveler was not indexed under its generic identity. The two indexed Manekin entries supplied no build data. [Genshin-Builds character index](https://genshin-builds.com/en/characters)
- **Local mechanics:** All 133 passed independent checks for real catalog ownership, weapon ID/type/refinement, artifact ID and piece effects, talent kit availability, and four distinct real IDs where a team is specified. Reaction element checks covered restricted cores such as Nilou, Chevreuse, Skirk/Escoffier, and Hyperbloom. This is mechanical screening. It does not establish exact ER targets, damage rankings, or a simulated rotation for every dossier.
- **Contextual review:** The 12 Group A builds have explicit trigger, scaling, or uptime rationale and a job assigned to all four team slots. Fourteen records have separately verified theorycrafting references. Group B retains timing, aura, battery, or team evidence gaps, and Group C lacks essential build fields. A reference link by itself was excluded from the verified theorycrafting tally.
- **GenshinHub:** Current build IDs, versions, hashes, defaults and audit actions were checked read-only for every candidate. Existing legacy profiles supply a comparison and a conflict check. They do not serve as independent editorial proof. Approved Mitya data was checked for preservation.

## Versioned corrections

Seventeen candidates have R2 successors. R1 remains unchanged. Each successor links its old checksum and carries an explicit empty review decision. The diff lists nine mechanics or condition corrections and 12 team-role clarifications, with overlap.

| Area | Changes |
|---|---|
| Weapons · 4 | Yelan’s Slingshot uses R1 when selected for CRIT Rate. Iansan’s Rightful Reward option was removed from the unresolved healing setup. Chasca’s Song of Stillness and Klee’s Widsith now have their relevant conditional outcomes documented. |
| Artifacts · 3 | Ganyu Melt uses an EM/Cryo 2+2 option in place of Shimenawa for the Hamayumi-compatible shortlist. Mavuika and Citlali prioritize a non-overlapping set in their named Xilonen teams and retain Scroll as conditional. |
| Stats · 1 | Bennett’s healing circlet now has a CRIT Rate alternative for Favonius, with the C0 Burst threshold stated. |
| Talents · 1 | Raiden’s dedicated Hyperbloom role drops the Burst and Normal Attack ranking. Level 90 and EM drive reaction damage, and Skill investment is for utility. |
| Teams · 12 | Existing lineups now name each member’s job. Teammate identities are unchanged. |

The artifact and talent changes were checked against the local item or kit and relevant theorycrafting. [Ganyu](https://keqingmains.com/q/ganyu-quickguide/) · [Mavuika](https://keqingmains.com/q/mavuika-quickguide/) · [Citlali](https://keqingmains.com/q/citlali-quickguide/) · [Raiden](https://keqingmains.com/q/raiden-quickguide/) · [Yelan](https://keqingmains.com/q/yelan-quickguide/)

## First authorization target

Batch **A01** manifest checksum `1acfde1c57701c09a90574eab83c969abbd0554bf73e39c1cb083377e418ae36`.

| Candidate | R2 checksum | Proposed change |
|---|---|---|
| `bennett:1` | `6e94ecbffb40fa65c7ddb251430d151127ec55c78f9af3ff1a08852e666f07eb` | C0 Burst support. Review verified canonical sword IDs, Noblesse/Instructor conditions, ER/HP healing stats, conditional Favonius circlet, and the Xiangling/Xingqiu/Sucrose roster. |
| `fischl:1` | `92483f765e9bbb0a0ca1caab7f3347f60431da958e98a8a39b1117e80cd6f703` | Replace generic stats and unresolved artifact placeholder with off-field Golden Troupe and Oz Skill priority. Add the reviewed roles for Keqing/Nahida/Yaoyao. |
| `xiangling:1` | `8b217db9e2b920e674bcb00f0de81648a871373e016fbb24d028ef1eb1b2847e` | The Catch R5 and Emblem for Burst Vaporize, ER first with Bennett particle funneling, and explicit Hydro/driver roles. |

[Batch manifest with full before/after patches](READY_BATCHES.json) · [Bennett](https://keqingmains.com/q/bennett-quickguide/) · [Fischl](https://keqingmains.com/q/fischl-quickguide/) · [Xiangling](https://keqingmains.com/xiangling/)

A01 stages revisions on existing legacy build IDs. Batches A02–A04 are separate review units. Group B/C and first-default cases are excluded. Every write stays unauthorized until the user approves specific IDs and checksums, followed by explicit review using authenticated Admin credentials.

### Recheck and recover

Read a fresh snapshot and run the existing read-only planning helpers before authorized staging. Match the bound candidate checksum, expected build version and full baseline fingerprint. A different pending patch, changed baseline, Admin-managed audit history, or conflicting name must stop the candidate. An identical pending patch is a no-op. Treat a previously published candidate as a changed baseline and inspect the exact audited patch before any replay.

```bash
cd backend
node scripts/build-audit/catalog-inventory.cjs /tmp/fresh-review-inventory.json
node scripts/build-audit/catalog-final-review.cjs /tmp/fresh-review-inventory.json --batch A01 --candidate bennett:1
```

Take a fresh build-scoped backup before any authorized write. The existing `updateCharacterBuild` stages the exact patch using the expected version, and `reviewCharacterBuild` takes a separate decision. Rejecting a staged legacy revision preserves its existing public content. A nondefault alternate can be archived with its audit history. After a legacy replacement publishes, use the preserved child baseline, the `PUBLISHED` before payload and the backup for any separately authorized restoration. Legacy labels that do not resolve to current IDs require review before a restoration patch. The existing service promotes a first approved build to default when no default exists, so first builds require an explicit default decision.

## Validation

| Verification | Result |
|---|---|
| Prisma validate and migration status | Passed in order. Development has five applied migrations and no pending migrations. |
| Backend and frontend TypeScript | Both no-emit checks passed. |
| Build audit, selection, conflicts, provenance and checksums | 19/19 passed. Includes tampered batch and synthetic baseline drift checks. |
| Character Detail and Multi-Build | 4/4 read-only GraphQL and DataLoader regressions passed. The isolated HTTP Detail queries also verified public equipment, teams and defaults. |
| Isolated PostgreSQL lifecycle | All five migrations bootstrapped. The runner verified `current_database()` before fixture writes. With a disposable Admin key, A01 staged and published in the fixture, while anonymous and incorrect-key requests failed. Concurrent stages yielded one success and one conflict. Rejection preserved the prior public build. Replay, default uniqueness, alternate archival, publication audit and published GraphQL checks passed. |
| Development integrity | The complete before/after read-only snapshots matched byte-for-byte. No development mutation was called. |

There were four test-only approvals in the disposable database, comprising the three A01 candidates and one alternative used to exercise rollback. These approvals have no editorial standing. The temporary backend stopped after the suite. The existing CharacterBuild resolver recorded its shared authenticated Admin actor for the isolated HTTP requests.

No source rankings, UI, migrations or existing approval workflows changed.
