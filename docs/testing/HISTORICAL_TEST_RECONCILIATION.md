# Historical catalog test reconciliation

The original assertions were reproduced against the current private inventory using `BUILD_AUDIT_INVENTORY=/tmp/gh-hardening-current-inventory.json node scripts/build-audit/catalog-<suite>.test.cjs` from `backend`. No history, database values, or immutable evidence were edited.

| Original failure | Investigation | Final evidence |
|---|---|---|
| A01 exact regenerated batch | Current Bennett, Xiangling, and Fischl baselines were version 3. Both archived A01 restore databases retain version 1. The assertions validate archived checksums and detailed payloads unchanged. | Resolved. Both A01 cases pass against the archive. |
| A01 drift and checksum denial | The current inventory hit the revision gate first. On the archived baseline, the unchanged content and checksum rejection assertions exercise the intended guards. | Resolved. Archived A01 suite passes 2/2. |
| Final-review regenerated R2 batch and candidate checksums | The harness restored A01 from the archive while still comparing A02 R2 output with the superseding live A02 R3 batch. `A02_ORIGINAL.json` is the checked-in R2 evidence. | Resolved. Both original batches are loaded and the full deep-equality assertion passes. |
| Final-review drift classification | Current approved history correctly classifies Bennett as `ADMIN_MANAGED_HISTORY`. The R2 archived inventory reaches the original `BASELINE_CHANGED` assertion. | Resolved. Historical final-review suite passes 3/3. Current contract separately verifies zero writes on the managed row. |
| Original completion proposal regeneration | The comparator was a separate input. Neither the original comparison fixture nor an authoritative reconstruction was available in the checked-in history and available local fixture evidence. | EVIDENCE_BLOCKED. Explicit diagnostic and the regeneration assertion remain. The two other completion checks pass. |

From `backend`, the following commands use the already-existing local archive without changing it. Supply only the original comparison fixture for the last command.

```sh
node scripts/build-audit/catalog-inventory.cjs /tmp/archived-a01-inventory.json --historical-db genshinhub_test_a01restore_1795185885237
BUILD_AUDIT_INVENTORY=/tmp/archived-a01-inventory.json node scripts/build-audit/catalog-a01.test.cjs
BUILD_AUDIT_INVENTORY=/tmp/archived-a01-inventory.json node scripts/build-audit/catalog-final-review.test.cjs
BUILD_AUDIT_INVENTORY=/tmp/archived-a01-inventory.json node scripts/build-audit/catalog-completion.test.cjs
node scripts/build-audit/catalog-inventory.cjs /tmp/current-release-inventory.json
BUILD_AUDIT_INVENTORY=/tmp/current-release-inventory.json node scripts/build-audit/catalog-current-contract.test.cjs
```

The current contract passed 3/3, covering every identity's owned public default, Aino's support build and canonical equipment and teams, and refusal to write over current Admin-managed history. Private inventories and the four previously excluded reference dossiers remain local.
