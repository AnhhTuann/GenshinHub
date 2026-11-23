# GenshinHub 7.2 development Character maintenance

**COMPLETE_WITH_EVIDENCE_GAPS.** All nine weapon stages and both team stages were applied to their existing legacy records. Seven stat tables are live. The run also canonicalized 52 additional weapon references and four explicitly named artifact pairs. No build was approved, promoted, created, or archived.

## Applied and verified

| Scope | Actual result |
|---|---|
| Nine existing weapon stages | 79/79 exact alias rows changed to pinned canonical IDs. |
| Other verified weapon aliases | 52 rows changed. This includes Neuvillette’s Sacrificial Jade, corroborated by its unique pinned icon, CRIT stat, and stored Battle Pass and HP passive description. |
| Two existing team stages | Five existing slots changed from kazuha to kaedehara-kazuha across Neuvillette and Xinyan. Member IDs, order and roles stayed intact. |
| Artifact sets | Three Nilou labels and one Xinyan label canonicalized from their explicitly named pairs. The selected sets, piece counts and order stayed intact. |
| Character stats | Seven independently reproduced 14-row tables applied. The six SQL NULL fields and Sandrone’s JSON null have distinct rollback entries. No Traveler stats were substituted. |

The existing Admin publisher recreates recommendation rows and records an approved publication. The scoped Prisma transaction instead updated only the verified fields on the existing legacy rows and kept their existing visibility status and defaults. Twenty-eight legacy builds advanced one version. The transaction appended 28 MAINTENANCE_APPLIED audit events and 11 stage dispositions. The existing pending resolver uses REJECTED as a terminal action. Here it closes the superseded proposal, with explicit maintenance provenance, the original stage ID, and a null Admin decision. The original stage records and historical approvals remain intact. Admin GraphQL confirmed all 11 drafts are closed.

The exact total was **214 database row writes** comprising 147 data rows, 28 legacy version increments and 39 audit inserts. A replay verified the committed values without adding writes. The private restore-tested backup and exact before/after journal supply rollback data. A rollback must compare the live row and version to that journal, and restore the original null representation for stat rows.

## Blocked and preserved

- **Bennett, 0/4 aliases.** The approved default is still the original visible version 3. The current public model exposes approved or legacy-import builds and has no separate maintenance revision for an existing approved default. Changing the approved row in place would change the payload covered by its historical approval. The four-slot patch remains ready for the supported Admin review path. Protected Xiangling references also remain unchanged.
- **Five missing builds, 0/5 completed.** The existing verified kits and equipment are useful starting points. Alyosha needs a recurring 70-Energy and buff coverage check. Odette needs a verified double and special-Skill window and reaction ownership. Valeriy needs Momentum gains and swap-back timing. Vesna needs verified Essence spending and aura coverage. Vodyanitsa needs Skill hit and swap timing before retaining Tenacity and the 20-second Thrilling Tales schedule in the same scoped build. The pinned R5 passive gives +48% ATK for 10 seconds to the next character entering the field. Separate Burst and Prototype Amber requirements still need verification. The five profiles have no new empty build rows. [Vodyanitsa comparison](https://genshin-builds.com/en/character/vodyanitsa)
- **Other evidence gaps.** Incompatible inherited weapon entries lack vetted replacements. Generic artifact placeholders and shorthand with more than two possible sets lack an exact intended pair. Traveler elemental stat variants lack supported exact tables. No protected or experimental evidence hold was cleared by changing an ID.
- **Correct builds preserved.** Mitya’s two approved builds and default and Xingqiu’s viable C0 Energy-dependent build are unchanged. Mitya’s character ascension stats were added separately. The quarantined test team remains archived.

Of the 42 prior confirmed-error identities, ten have no remaining confirmed error in this scope and 32 still have at least one unresolved correction or source conflict. Of the 45 broader open identities, one closed and 44 still need evidence or review. These counts use different scopes. The per-identity JSON shows partial corrections and the remaining distinct issue.

## Validation

- The owner-authorized transaction ran on PostgreSQL 15.20 at 127.0.0.1:5434/genshinhub. The fresh private backup restored in network-isolated PostgreSQL with matching counts and digests for all 22 application tables. Backup SHA-256 is 6c29abb47f040d208cc2e9993d8e49944c306054a5ff0f06ba0be3923e669fd9.
- The full before/after comparison matched every unrelated table, including Tier List, migrations, and archives. Row-level inventory comparison proved that only the stated fields and versions changed. All 96 approved builds and 126 defaults matched. No unvalidated foreign-key constraints, duplicate defaults, invalid default statuses, or pending build stages remain.
- Public GraphQL matched all 131 identities, exact visible build data, stat tables and defaults. Admin GraphQL verified the original 11 stages and their supersession. Chromium passed 14 requested English/Vietnamese desktop and mobile route checks, with zero unhandled runtime exceptions.
- The existing local services at http://127.0.0.1:3001/en and http://127.0.0.1:4000/graphql remain running. No seed export, backup pruning, deployment, or production access occurred.

[Exact applied changes and audit links](FINAL_131_APPLIED_CHANGES.json) · [Remaining gaps by identity](FINAL_131_REMAINING_GAPS.json)
