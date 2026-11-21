import { readFile } from 'node:fs/promises';
import path from 'node:path';
import CharacterTierReviewClient from '@/components/admin/CharacterTierReviewClient';
import PhaseD3PreviewPanel from '@/components/admin/PhaseD3PreviewPanel';

export const dynamic = 'force-dynamic';

type ExcludedRecord = {
  recordKey: string;
  category: string;
  reason: string;
};

type SheetRecord = {
  recordId: string;
  recordKey: string;
  characterId: string;
  characterName: string;
  role: string;
  constellation: string;
  proposedTier: string;
  rubricScore: number;
  category: string;
  reviewRecommendation: string;
  risks: string;
  sensitivity: { performanceOnly: number; performanceOnlyTier: string };
  sourceName: string;
  sourceUrl: string;
  batchId: string;
  gameVersion: string;
  recordSha256: string;
  decision: Record<string, unknown>;
};

type RevisedRecord = {
  recordKey: string;
  proposedTier: string;
  rubricScore: number;
  explanationVi: string;
  evidence: DraftRecord['evidence'];
  // D2 revisions replace the frozen string[] with an evidence object carrying
  // `teamAssumptions`, `limitations` and `originalGameplayAssumptions`.
  gameplayAssumptions: unknown;
  oldChecksum: string;
  newChecksum: string;
  reviewStatus: string;
  changeReason: string;
};

type DraftRecord = {
  characterId: string;
  characterName: string;
  role: string;
  constellation: string;
  proposedTier: string;
  rubricScore: number;
  explanationVi: string;
  strengths: string[];
  limitations: string[];
  teamAssumptions: string[];
  evidence: Record<string, any>;
  derivation: string;
  sourceUrl: string;
  sourceName: string;
  sourceId: string;
  sourceLocale: string;
  lastReviewedDate: string;
  b25Review: { category: string; risks: string; recommendation: string; sensitivity?: { performanceOnly: number; performanceOnlyTier: string } };
};

async function readJson<T>(relative: string): Promise<T> {
  const file = path.resolve(process.cwd(), '..', 'docs', relative);
  const raw = await readFile(file, 'utf8');
  return JSON.parse(raw) as T;
}

function asStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

/** D2 gameplayAssumptions may be a string[] or an evidence object. Normalize for the review UI. */
function normalizeTeamAssumptions(value: unknown, fallback: unknown): string[] {
  if (Array.isArray(value)) return asStringList(value);
  if (value && typeof value === 'object') {
    const nested = asStringList((value as { teamAssumptions?: unknown }).teamAssumptions);
    if (nested.length) return nested;
  }
  return asStringList(fallback);
}

/**
 * D2 supplies actionable character dossiers. The frozen source supplies lineage and excluded history.
 */
export default async function AdminCharacterTierReviewPage() {
  const [sheet, drafts, revised] = await Promise.all([
    readJson<{ counts: Record<string, number>; records: SheetRecord[]; excludedFromSheet: ExcludedRecord[]; sourceBatchSha256: string }>(
      'tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.json',
    ),
    readJson<{ rankings: DraftRecord[] }>('tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json'),
    readJson<{ records: RevisedRecord[] }>('tierlist/phase-d2/CHARACTER_REVISED_DRAFT.json'),
  ]);

  const draftByKey = new Map(
    drafts.rankings.map((draft) => [`${draft.characterId}|${draft.role}|${draft.constellation}`, draft]),
  );

  const revisions = new Map(revised.records.map(record => [record.recordKey, record]));
  const rows = sheet.records.map(record => {
    const revision = revisions.get(record.recordKey);
    const original = draftByKey.get(record.recordKey);
    if (!revision || !original || revision.oldChecksum !== record.recordSha256) {
      throw new Error(`CHARACTER_REVIEW_LINEAGE_MISMATCH:${record.recordKey}`);
    }
    return {
      ...record,
      proposedTier: revision.proposedTier,
      rubricScore: revision.rubricScore,
      recordSha256: revision.newChecksum,
      reviewRecommendation: revision.reviewStatus,
      reason: revision.reviewStatus.startsWith('NEEDS_MORE') ? revision.changeReason : undefined,
      draft: { ...original, proposedTier: revision.proposedTier, rubricScore: revision.rubricScore,
        explanationVi: revision.explanationVi, evidence: revision.evidence,
        teamAssumptions: normalizeTeamAssumptions(revision.gameplayAssumptions, original.teamAssumptions),
        gameplayLimitations: asStringList(
          revision.gameplayAssumptions && typeof revision.gameplayAssumptions === 'object'
            ? (revision.gameplayAssumptions as { limitations?: unknown }).limitations
            : undefined,
        ) },
    };
  });

  const excluded = sheet.excludedFromSheet.map((record) => {
    const draft = draftByKey.get(record.recordKey) ?? null;
    const [characterId, role, constellation] = record.recordKey.split('|');
    // The excluded sheet rows are intentionally terse (recordKey/category/reason).
    // Hydrate display fields from the frozen B2 draft so the review table is
    // complete without inventing any ranking value.
    return {
      recordId: `EXCLUDED-${characterId}-${role}-${constellation}`,
      recordKey: record.recordKey,
      characterId,
      characterName: draft?.characterName || characterId,
      role,
      constellation,
      proposedTier: '',
      rubricScore: draft?.rubricScore ?? 0,
      category: record.category,
      reviewRecommendation: '',
      risks: record.reason,
      sensitivity: draft?.b25Review?.sensitivity || { performanceOnly: 0, performanceOnlyTier: '' },
      sourceName: draft?.sourceName || '',
      sourceUrl: draft?.sourceUrl || '',
      batchId: 'phase-b2-independent-001',
      gameVersion: '7.2',
      recordSha256: '',
      decision: {},
      reason: record.reason,
      draft,
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <CharacterTierReviewClient
        rows={rows}
        excluded={excluded}
        counts={{ ...sheet.counts, readyForAdminReview: rows.filter(row => !row.reason).length }}
        sourceBatchSha256={sheet.sourceBatchSha256}
      />
      <PhaseD3PreviewPanel kind="CHARACTER" />
    </div>
  );
}
