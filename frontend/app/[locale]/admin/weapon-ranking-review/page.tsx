import { readFile } from 'node:fs/promises';
import path from 'node:path';
import WeaponRankingReviewClient from '@/components/admin/WeaponRankingReviewClient';

export const dynamic = 'force-dynamic';

type SheetRecord = {
  candidateId: string;
  weaponId: string;
  weaponName: string;
  weaponType: string;
  role: string;
  refinement: string;
  proposedTier: string;
  oldTier: string | null;
  tierChanged: boolean;
  confidence: string;
  reviewStatus: string;
  reviewGroup: string;
  reviewRecommendation: string | null;
  tierJustification: string | null;
  exactGameplayAssumptions: string[];
  rightsStatus: Record<string, any>;
  adminActionRequired: string;
  recordSha256: string;
  decision: Record<string, any>;
};

type CandidateRecord = {
  id: string;
  weaponId: string;
  role: string;
  nameEn: string;
  nameVi: string;
  dbWeaponType: string;
  rarity: number;
  explanationVi: string;
  gameplayConditions: string[];
  sensitivity: string;
  refinementContext: string;
  refinementLevel: number | null;
  versionKey: string;
  gameVersion: string;
  gameVersionStatus: string;
  evidence: Record<string, any>;
  rubricVersion: string;
  confidence: string;
  sourceName: string;
  sourceUrl: string | null;
  sourceLocale: string;
  derivation: string;
};

async function readJson<T>(relative: string): Promise<T> {
  const raw = await readFile(path.resolve(process.cwd(), '..', 'docs', relative), 'utf8');
  return JSON.parse(raw) as T;
}

/** Read-only projection of the authoritative D2 weapon review queue and frozen history. */
export default async function AdminWeaponRankingReviewPage() {
  const [sheet, candidates] = await Promise.all([
    readJson<{
      counts: Record<string, number>;
      records: SheetRecord[];
      blocked: { candidateId: string; weaponName: string; reason: string }[];
      tierChanges: { candidateId: string; weaponName: string; change: string; reason: string; tierReReviewConfirmed: boolean }[];
      source: { batchSha256: string; freezeManifestSha256: string };
    }>('weapon-tier-independent/PHASE_D_WEAPON_APPROVAL_SHEET.json'),
    readJson<{ records: CandidateRecord[] }>('weapon-tier-independent/independent-candidates.json'),
  ]);

  const candidateById = new Map(candidates.records.map((c) => [c.id, c]));
  const tierChangeById = new Map(sheet.tierChanges.map((t) => [t.candidateId, t]));
  const blockedById = new Map(sheet.blocked.map((b) => [b.candidateId, b]));

  const rows = sheet.records.map((record) => ({
    ...record,
    candidate: candidateById.get(record.candidateId) ?? null,
    tierChange: tierChangeById.get(record.candidateId) ?? null,
    blocked: blockedById.get(record.candidateId) ?? null,
  }));

  return (
    <WeaponRankingReviewClient
      rows={rows}
      tierChanges={sheet.tierChanges}
      blocked={sheet.blocked}
      counts={sheet.counts}
      batchSha256={sheet.source.batchSha256}
    />
  );
}
