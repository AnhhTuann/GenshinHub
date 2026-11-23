# A01 R3 development import result

**SUCCESS.** The rotated local Admin credentials loaded after restarting the GenshinHub frontend and backend. The existing browser login and authenticated GraphQL proxy passed. An invalid password, an anonymous proxy request, and missing or invalid backend Admin credentials were rejected. The website remains available at http://localhost:3010/en and the backend at http://localhost:4000/graphql.

## Scope and preflight

- Development target was `127.0.0.1:5434/genshinhub`. Read-only PostgreSQL verification confirmed the database name and the container-side port of 5432.
- Manifest version was `character-build-catalog-7.2-r3-a01`.
- Recalculated batch SHA-256 was `0cddce86d77d542f15cbc6ad59a9282591b5db1033efa70c6728e27f31f58ae1`. All three candidate payload hashes and live version 1 baseline fingerprints matched. There were no pending drafts on the selected builds.
- The complete development backup was restored successfully into isolated PostgreSQL database `genshinhub_test_a01restore_1795185946668`. The restore contained 127 builds, 127 build audit rows, and five applied migrations. The archive and protected-data snapshot are stored in a private directory outside the repository. Backup path is `/tmp/genshinhub-a01-backup-9uTgNC/genshinhub-2026-11-20T14-45-46-421Z.dump`.

| Candidate | Verified candidate SHA-256 | Staged | Approved | Verified |
|---|---|---|---|---|
| `bennett:1` | `6c5527ba0bf9fc768bb41db2e2313ddd277fa3c85824f56c19b99e9bbced5744` | YES | YES | PASS |
| `fischl:1` | `1207015e89a97db353d5331a1b0ad8dc7b21e48e3b0226fd0dc54a8c93759744` | YES | YES | PASS |
| `xiangling:1` | `774f141372764dccc0ea67ea042012939be490d80d1b152d901eee875fc62056` | YES | YES | PASS |

The existing Admin GraphQL mutations staged each default at version 2 and published it as `APPROVED` at version 3. The pending draft matched its authorized payload before approval. Each published audit entry contains that exact patch and the server-derived `authenticated-admin` actor. Earlier audit rows were preserved. The read-only repeat check found each publication complete with no pending draft.

## Preservation and browser verification

- Bennett retained the exact eight team rows and their IDs, 12 weapons, and four artifact options. The four pre-existing Kazuha aliases were untouched.
- Fischl’s approved recommendations have five weapons, two artifact options, and one `EXPERIMENTAL` team. The existing approval workflow archived the original recommendation rows under the non-default, non-public `baseline-fischl` build.
- Xiangling retained the exact eight team rows and their IDs, 19 weapons, and five artifact options.
- Before/after comparison passed for all existing default assignments, Mitya, unrelated builds and relationships, previous audit rows, Character and Weapon Tier Ranking data, and all five Prisma migration records.
- All three Character Detail pages returned HTTP 200 and displayed the selected build, revised notes, and expected weapon, artifact, and team content with no uncaught browser errors. The initial Bennett browser assertion used an English artifact name. The stored legacy row uses the Vietnamese label, which the final test confirmed rendered unchanged.

**Total approved 3. Candidate execution failures 0. Production unchanged.**
