# Main merge and system verification

The GitHub default branch is `main`. It was unprotected according to the GitHub branch API. The local two-parent merge was created in a separate worktree before the integration tests. No conflicts were found.

| Ref | SHA |
|---|---|
| Initial origin/main | `c5a54ff7b75b0161107ec21fb5673b58c7a8a8f1` |
| Source feat/balanced-fantasy-motion | `d8939fac3e9ab25e5d66fccf4707dbbeeb426864` |
| Merge commit | `cd6aecc14f5190bd7b62a7ce39764dcad70e5d5f` |

The initial merge tree matched the feature tree. Historical whitespace and migration checksums were preserved. The main worktree received the sync fix `8609d5a4c97e0e3dab84004b781a6c8811a5d4c6` and workflow fix `8892baa71b517bbe1c5573a7e3fefc3568723b64`. The four source-derived reference dossiers remain local to the original feature workspace.

Development remained at 131 characters and 347 builds, with one public default per identity. Protected data digests matched on either side of verification. Test Admin decisions were limited to synthetic builds in a disposable local restore. No development sync writes were warranted from the two zero-change reports.

The [system matrix](../testing/FULL_SYSTEM_TEST_MATRIX.md) records the tested behavior and coverage limits. The [sync validation](../data-sync/FINAL_CLI_SYNC_VALIDATION.md) records upstream evidence, backup, restore, rollback, and scheduling.

## Future release sequence

Git on main carries code and migrations. Development PostgreSQL carries the synchronized game data and previously applied curated corrections. Git delivery does not transfer those database rows or Admin history. For a future authorized environment, confirm the target, back up and restore-test it, apply the checked migrations, and check the pinned upstream version and dry-run. Compare protected data before deciding whether to run sync. Use the separately guarded [character-build replay tooling](../FINAL_GITHUB_HANDOFF.md) for curated maintenance data. Build the services, verify the protected routes and independently validate SMTP and the production approval gate before deployment.

The exact verified remote tip including this delivery report is recorded in the delivery response. Production access and deployment were outside this execution.
