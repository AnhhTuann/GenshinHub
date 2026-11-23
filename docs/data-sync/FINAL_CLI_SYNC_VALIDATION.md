# Final game-data CLI validation

The development database was confirmed on loopback before inspection. A fresh custom-format backup restored in a network-isolated PostgreSQL container. Its SHA-256 was `c8f5ec4c7efcc573d0bf0ad27341a16d56f43bf9624946aa6717db4eaecbc972`. A second disposable local database restored from the same backup was used for write tests.

The installed and pinned core package is `genshin-db@5.2.15`. The npm registry's stable `latest` tag still selects that version, whose published dataset is Genshin 7.2. The upstream repository also has a v5.2.16 tag. The core package at that tag is not the npm stable distribution used by this project. No dependency change was necessary. [npm version history](https://www.npmjs.com/package/genshin-db?activeTab=versions) · [Upstream v5.2.16 tag](https://github.com/theBowja/genshin-db/releases/tag/v5.2.16)

## Development dry runs

The existing `npm run sync:validate` command completed twice. The reports matched after removing their timestamps. The supplemental Yatta catalog supplied 832 valid entries. These are detector report counts, distinct from raw database counts.

| Entity | Create | Update | Unchanged | Pending | Existing unmatched |
|---|---:|---:|---:|---:|---:|
| Characters | 0 | 0 | 124 | 0 | 7 |
| Weapons | 0 | 0 | 253 | 0 | 26 |
| Artifact sets | 0 | 0 | 63 | 0 | 0 |
| Materials | 0 | 0 | 860 | 5 | 2 |

The pending materials were Crimson Agate (Display), Cryoculus, Lumenspar, Moonchase Charm, and Spirit Carp. Their source records lacked rarity. The detector proposed no translations, icons, canonical corrections, or asset changes for existing records. Existing unmatched records remained in the database. There were no supported writes to apply in development.

## Apply and rollback

The real `--sync` command ran twice on the disposable restore. Both runs completed with zero creates, zero updates, and zero new snapshots. The 34-case synthetic suite passed, including invalid-batch rollback, duplicate prevention, protected fields, unplanned translation preservation, stale plans, idempotence, and restoring a snapshot. The new assertions reproduced three failures before the fix. A previously applied create now leaves the matching record alone. Updates are confined to planned fields and rejected when the recorded prior value has changed.

The 41-case asset suite passed using a local mock CDN and temporary storage. It covered decoded WebP output, atomic writes, retries and fallback, absent icons, persistence, duplicate skipping, and preserving an existing file after replacement failure. In the live Aino test, the official icon URL returned 404. The existing fallback downloaded the corresponding Enka image and decoded the converted WebP in temporary storage. No persistent game assets were modified by this execution.

## Scheduler

The existing GitHub dry-run schedule runs at 03:00 UTC and uses the backend working directory and the configured database secret. Use a read-only reporting database credential for this job. The workflow now serializes check runs, runs validated dry-runs, propagates failed CLI exits, and pins its action references. YAML structure, action pins, Bash syntax, and a simulated failing CLI exit were verified locally. The production apply workflow remains a separately dispatched workflow and was never invoked. No VPS timer was installed and no hosted scheduler run with credentials was verified.
