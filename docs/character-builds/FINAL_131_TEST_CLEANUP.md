# Character catalog test-data cleanup

The confirmed test artifact is the Albedo team `268f1329-b6d6-471d-9f90-ff093c718464`. Its gibberish name and description are recorded in the prior import checkpoint. Its members are Albedo, Aino, Aloy and Alhaitham. It now belongs to the rejected non-default `baseline-albedo` archive, separate from the approved build. The before-and-after snapshots show that the archive remains intact. [Prior import checkpoint](FINAL_ALL_BUILDS_IMPORT_CHECKPOINTS.json)

The audit found **83 generic artifact placeholders** named `Thánh Di Vật Đề Cử`. Sixty are already archived and 23 are in legacy builds. The label also appears in seed fallback data and does not name an artifact set. These recommendations are invalid as artifact options. Their presence alone does not make a whole build test data. The corrections file lists exact row and owner IDs and default flags.

The existing archive operation rejects legacy and default builds. There is no standalone archive action for these placeholder recommendation rows. Removing them would require replacing or explicitly clearing the affected field through Build review. Existing archives and defaults were preserved.

Two teams-related legacy build patches were staged to fix Kazuha aliases. The counterpart in approved Bennett data is prepared for human review. **Confirmed test records: one, already quarantined. New archive writes: zero.**

[Exact records and rollback data](FINAL_131_CORRECTIONS.json)
