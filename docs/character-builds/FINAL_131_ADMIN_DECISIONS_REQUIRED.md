# Character Build Admin decisions required

**11 live stages and one protected correction ready for authorization.** Use the existing Character Build manager. Inspect each exact patch and current version before making a decision. The public rows and defaults remain unchanged.

## Existing team stages

Both stages use the canonical member ID kaedehara-kazuha. They retain the existing four-person team compositions, roles and defaults. Leave the two existing stages in place until an authorized Admin decides.

| Build | Live stage | Changed slots | Stage audit |
|---|---:|---:|---|
| legacy-neuvillette | v2 | 4 | e3af1097-7b6e-44f3-80df-64eb85298689 |
| legacy-xinyan | v2 | 1 | 21719498-d695-4979-a99e-9d99cfcc47ac |

## Nine new weapon-ID stages

Each patch converts exact legacy aliases to pinned numeric IDs. The lists preserve the live public order, refinements, F2P flags and constellation contexts. Review the complete weapon field before publishing. The existing publisher rebuilds that list using catalog presentation and normalized rank values. Public recommendations currently retain their old IDs.

| Build | Version | Canonical IDs staged | Stage audit |
|---|---:|---:|---|
| legacy-aloy | 2 | 10 | 24a4c3a7-a4bb-4b0c-8fb9-caf1e3cda8fe |
| legacy-amber | 2 | 18 | 1d07bca2-675b-4141-b8cb-fba1d76de4c6 |
| legacy-citlali | 2 | 6 | 766cfc12-25f9-4eef-9102-3b47eba19042 |
| legacy-columbina | 2 | 4 | d39de0f1-a639-475a-9822-1967473a087c |
| legacy-durin | 2 | 15 | da0d8474-04ce-40ea-a35a-0e14cd8f66dd |
| legacy-nicole | 2 | 10 | 69a59740-57c3-4cdf-b192-4474e111ca12 |
| legacy-nilou | 2 | 5 | 59d37998-13a6-4e69-85c1-5b52c22a4ac3 |
| legacy-traveler-hydro | 2 | 6 | 4a68b9d5-3ee3-4aac-a2b3-d133329e5586 |
| legacy-traveler-pyro | 2 | 5 | 5b271247-8ddd-4ed8-80ff-be0022ec6a02 |

## Protected Bennett correction

The approved default **legacy-bennett v3** is intact. Authorize staging the exact team-only patch in the corrections file against v3. Then inspect the new stage and give a separate decision. The remaining Bennett equipment findings are outside this team-only patch.

| Team ID | Member row ID | Current → proposed |
|---|---|---|
| b8140eb3-cdb8-4941-95ee-420f48ee2e0e | 87b1ca30-4eaa-41ea-b64d-a8e9bd20735a | kazuha → kaedehara-kazuha |
| 71c8c8fc-5753-4691-bdf5-e240bd61648d | bd8e5b7c-ac18-4593-bcbf-dd0ab9828359 | kazuha → kaedehara-kazuha |
| 26ee8d9a-0fda-4a2a-a738-aad7b9b688ce | 8cb2793c-bb66-4eaa-97ae-f01a5516f791 | kazuha → kaedehara-kazuha |
| e1556187-170b-45e0-882d-cf4eec9866e4 | fa04c321-7676-4a2d-a6e5-625a5dcdd534 | kazuha → kaedehara-kazuha |

## Evidence and tooling holds

- Seven verified stat-table candidates remain blocked by the existing write path. The Stats Admin mutation schedules a full seed export and rolling-backup cleanup. Build stages cannot contain Character stats. Human approval by itself would not remove those side effects.
- Five missing builds remain evidence-blocked. Their equipment, stats, priorities and teams are documented in the exact draft readback. Each still needs the evidence described in the execution report.
- Other legacy fields stay blocked where a full safe replacement or independent role/rotation justification is missing. No archived or default build should be removed to eliminate a placeholder.

[Exact correction records](FINAL_131_CORRECTIONS_RESOLVED.json) · [Execution report](FINAL_131_CORRECTION_EXECUTION.md)
