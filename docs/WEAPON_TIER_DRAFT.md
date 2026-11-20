# Weapon Tier List — draft for Admin review (NOT PUBLISHED)

Status: **DRAFT / DATA PENDING**. Nothing in this file is written to the database or shown as an
official tier on the public page. The public page currently shows every weapon under
**Chưa xếp hạng** because the development database has 279 weapons and **0 approved weapon tiers**.

## Why this draft exists

- `Weapon.tier` and `Weapon.role` exist in Prisma and are editable at `/admin/tierlist`.
- There is no field for review status, version, notes, source or display order, so the system cannot
  currently distinguish a draft from an approved ranking.
- This document is an independent starting point for Admin review. It is not a copy of any site's
  tier chart. For ongoing meta research, consult primary guides (e.g. KeqingMains, Icy Veins)
  within their usage terms, then record the reasoning in your own words.

## Evaluation scope

- Per weapon type: Sword / Claymore / Polearm / Bow / Catalyst.
- Tier is relative to the weapon's type and to realistic characters/builds, not a global absolute.
- Assumptions: refinement R1 unless stated, correct stat sticks/artifacts, C0 characters,
 current Spiral Abyss / endgame-style rotations.
- A 4★ weapon can be placed above a 5★ weapon when it fits the role better; rarity, base ATK and
 popularity are not ranking criteria.

## Candidate shortlist (not exhaustive, not approved)

| Type | Candidate | Suggested context | Rationale to verify |
| --- | --- | --- | --- |
| Sword | Mistsplitter Reforged | Main DPS, elemental damage carries | High personal DMG with consistent uptime on its passive. |
| Sword | Favonius Sword | Support/energy batteries | Team energy generation often outweighs raw stats. |
| Claymore | Redhorn Stonethresher | DEF-scaling Main DPS | Strong fit only for specific DEF-scaling kits; not universal. |
| Claymore | Serpent Spine (R5) | On-field Main DPS with shield/uptime | Excellent value, but conditional on avoiding damage taken. |
| Polearm | Staff of Homa | HP-scaling / crit-oriented DPS | Broad stat efficiency; verify against newer options each patch. |
| Polearm | The Catch | F2P burst DPS | High burst value for a 4★; fishing availability is not a power argument. |
| Bow | Aqua Simulacra | Crit-based Main DPS | Strong general stat profile; positioning condition matters. |
| Bow | Favonius Warbow | Support/energy batteries | Reliable team-wide energy for rotation-dependent teams. |
| Catalyst | A Thousand Floating Dreams | Elemental Mastery / reaction teams | Strong EM support value in reaction-focused compositions. |
| Catalyst | The Widsith | F2P Main DPS (short rotations) | High burst windows, less reliable in long sustained rotations. |

These are **examples of how to reason**, not a complete 279-weapon ranking and not a publishable tier
chart. Admin should adjust tiers after checking current guides and in-game conditions.

## Schema change proposal (requires Admin approval, NOT applied)

To store Weapon Tier data safely, add review metadata rather than overloading `Character.tier`:

```prisma
model WeaponTierReview {
  id           String    @id @default(uuid())
  weapon       Weapon    @relation(fields: [weaponId], references: [id], onDelete: Cascade)
  weaponId     String    @unique
  tier         String?
  context      String?   // Main DPS / Support / F2P / character or build
  displayOrder Int       @default(0)
  version      String?   // game version this evaluation targets
  notes        String?
  source       String?
  status       String    @default("DRAFT") // DRAFT | APPROVED
  reviewedBy   String?
  reviewedAt   DateTime?
  updatedAt    DateTime  @updatedAt
}
```

A matching `CharacterTierReview` (or explicit fields on `Character`) is needed for version, notes,
source, display order and approval of character rankings. Without it, the public page can only
distinguish "tier present" from "tier absent" — it cannot verify that a ranking was reviewed.

GraphQL consequences: new queries filtered by `status: APPROVED`, admin-only mutations to
create/update reviews, and a guard so the public page never receives DRAFT rows. Existing Admin
values in `Character.tier`, `Character.role` and `Weapon.tier` must be migrated into the new model
without overwriting them.

## Admin workflow until approval

1. Open `/admin/tierlist`.
2. For a weapon, set **Tier** and **Context** (Main DPS / Sub DPS / Support / F2P or a build note).
3. Saving through the Admin proxy is an explicit Admin action; the public page then reads the
   updated value after ISR revalidation.
4. Do not import this draft file into the database as a bulk "approved" ranking.
