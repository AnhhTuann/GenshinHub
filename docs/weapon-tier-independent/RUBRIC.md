# GenshinHub Independent Weapon Ranking Rubric v1.1

**Status:** Phase B2.6 validated rubric. No candidate in this directory is approved or published. This rubric is a decision framework, not a scoring formula.

## 1. Scope and provenance

- Applies only to the 14 `INDEPENDENT` candidates in `independent-candidates.json`.
- The 296 `SOURCE_DERIVED` records under `docs/weapon-tier-audit/` remain research artifacts: never relabelled, never imported, never used as a ranking algorithm, never used as a tier target.
- `genshin-db@5.2.15` is used **only** to verify game facts (passive text, values, substats). It never auto-derives a tier. Every verified fact is captured in `game-facts.json`.
- Rarity, base ATK, popularity and the number of recommended characters are **not** tier inputs.

## 2. Separate gameplay strength from evidence confidence

A ranking record carries two independent judgements:

| Field | Meaning | Allowed values |
|---|---|---|
| `tier` | Editorial judgement of in-game strength **for the stated role, refinement and team assumptions** | SS, S, A, B, C, D |
| `confidence` | How complete and stable the supporting evidence is for that judgement | HIGH, MEDIUM, LOW |

A strong weapon can have LOW confidence (e.g. Favonius Greatsword sub-DPS depends on on-field CRIT uptime that was not quantified). A weak weapon can have HIGH confidence. Confidence must never be used to inflate or deflate a tier automatically.

## 3. Evaluation criteria by role

### Main DPS
1. Personal damage during sustained field time.
2. Compatibility between passive and the character's actual damage sources.
3. Effective stat distribution after artifact constraints.
4. Refinement scaling.
5. Character/team assumptions.
6. Practical passive uptime.

### Sub DPS
1. Off-field effectiveness.
2. Passive trigger conditions (including whether on-field time is required).
3. Energy considerations.
4. Rotation assumptions.
5. Reaction/team synergy.

### Support
1. Team buff quality and magnitude.
2. Energy generation (and whether it is team-wide or wielder-only).
3. Utility beyond damage (healing, cleansing, etc.).
4. Buff uptime versus cooldown.
5. Passive conditions.
6. Refinement dependence.
7. Role universality (does it work for characters with different scaling stats?).

## 4. Tier thresholds

`SS` = defines the role under the recorded assumptions; near-universal within that weapon type and role, with no hard scaling restriction.
`S` = strong, but with a stated condition or a narrower scaling profile.
`A` = solid and usable, with a clear condition, partial uptime or a cheaper alternative.
`B` = workable but conditional; `C` = niche; `D` = not recommended for the role.

**Threshold checks applied in B2.6:**
- `SS` requires role universality. Thrilling Tales (48% ATK, ATK-scalers only, 10s/20s) therefore does **not** meet the `SS` threshold for general Support and was moved to `S`.
- `S` requires expected value, not best-case value. The Widsith (1/3 random EM theme, 10s/30s) does **not** meet the `S` threshold for general Sub DPS and was moved to `A`.
- Tier is never assigned to match an external list. No comparison with Genshin-Builds tiers was used as a decision input.

## 5. Sensitivity analysis

Every record must state what would change the conclusion:

- **Trigger sensitivity** — what if the passive condition is not met (no crit, no on-field recast, target above HP threshold, enemies out of range, fewer than 3 stacks)?
- **Refinement sensitivity** — what differs between R1 and R5? A tier validated at R5 is not automatically valid at R1 and vice versa.
- **Role sensitivity** — if the same weapon were evaluated in a different role, would the tier change? Examples recorded in B2.6: Aqua Simulacra is evaluated only as Main DPS here; its off-field DMG buff would need a separate Sub DPS record rather than reusing this tier. Prototype Amber Support A relies on healing/burst utility, not on damage.
- **Team-assumption sensitivity** — every assumed team condition is written explicitly in `evidence.assumptions` and `gameplayConditions`.

## 6. Refinement policy

- Each record states exactly one `refinementContext` (`R1`–`R5`) with a written reason.
- No implicit R1 for 5★ or R5 for 4★. No silent R1↔R5 promotion.
- If passive scaling changes the assessed property, the R1 and R5 conclusions must be separate records in a future batch; this batch does not fabricate them.
- Current batch: 11 × R1, 3 × R5 (11403 reliability, 14302 maximum buff, 14406 craftable maximum).

## 7. Tier-change protocol

When a correction changes a tier, the record must store:

- `oldTier` — the tier before correction.
- `tier` — the proposed tier after correction.
- `tierReason` — a human-readable reason tied to game facts and threshold rules.
- `evidence.exactFacts` — the exact passive facts that justify the change.
- `adminReviewRequired: true` in the approval package.

B2.6 uses this for `14302` (SS→S) and `14402` (S→A). Tiers kept unchanged still store `oldTier = tier` with a reason, so no change is silent.

## 8. Rights separation

Gameplay validity and publish rights are evaluated separately. A correct, well-evidenced draft still has `publishRightsVerified = false` until an Admin explicitly verifies rights. Explanation text must be original GenshinHub content; external editorial text is never translated, reworded or relabelled as internal.
