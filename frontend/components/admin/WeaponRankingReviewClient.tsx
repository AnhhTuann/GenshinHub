"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchGraphQLAdmin } from '@/lib/graphql';

/**
 * Phase D3 — read-only projection of the authoritative B3.2 weapon review
 * state. This component intentionally has NO approval/rights/tier/prepare
 * mutations. The single authoritative decision path lives on
 * `/admin/weapon-tier-review`, which writes the `WeaponTierReview` tables via
 * the guarded `adminDecideWeaponTierReview` / `adminVerify* / adminConfirm*`
 * mutations. Anything shown here is a projection of that state.
 */
type SheetRow = {
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
  candidate: CandidateDetail | null;
  tierChange: { candidateId: string; weaponName: string; change: string; reason: string; tierReReviewConfirmed: boolean } | null;
  blocked: { candidateId: string; weaponName: string; reason: string } | null;
};

type CandidateDetail = {
  weaponId: string;
  role: string;
  nameVi: string;
  dbWeaponType: string;
  explanationVi: string;
  gameplayConditions: string[];
  sensitivity: string;
  refinementContext: string;
  refinementLevel: number | null;
  versionKey: string;
  evidence: Record<string, any>;
  rubricVersion: string;
  confidence: string;
  sourceName: string;
  derivation: string;
};

/** Authoritative B3.2 candidate as returned by adminWeaponTierReviewQueue. */
type ReviewCandidate = {
  candidateId: string;
  stableCandidateId: string;
  previousCandidateId: string | null;
  weaponId: string;
  weaponName: string;
  weaponType: string;
  dbWeaponType: string;
  role: string;
  refinement: string;
  refinementLevel: number | null;
  proposedTier: string;
  previousTier: string | null;
  tierChanged: boolean;
  explanationVi: string;
  gameplayAssumptions: string[];
  exactGameFacts: string[];
  evidence: Record<string, any>;
  confidence: string;
  approvalChecksum: string;
  batchSha256: string;
  reviewGroup: string;
  decision: 'PENDING' | 'APPROVE' | 'REQUEST_CHANGES' | 'REJECT';
  decidedBy: string | null;
  decidedAt: string | null;
  decisionReason: string | null;
  rightsVerified: boolean;
  rightsVerifiedBy: string | null;
  rightsVerifiedAt: string | null;
  tierChangeConfirmed: boolean;
  evidenceAcknowledged: boolean;
  version: number;
  blockedReason: string | null;
  importEligible: boolean;
  previousVersion: string;
  currentVersion: string;
  sourceChecksum: string;
  revisedChecksum: string;
  currentChecksum: string;
  versionDiff: Array<{ field: string; before: unknown; after: unknown; reason?: string }>;
  versionReviewStatus: string;
  approvalCarriedOver: boolean;
};

const REVIEW_QUEUE = `query D1ProjectionQueue($sourceVersion: WeaponTierReviewSource) {
  adminWeaponTierReviewQueue(sourceVersion: $sourceVersion) {
    candidateId stableCandidateId previousCandidateId weaponId weaponName weaponType dbWeaponType
    role refinement refinementLevel proposedTier previousTier tierChanged explanationVi
    gameplayAssumptions exactGameFacts evidence confidence approvalChecksum batchSha256 reviewGroup
    decision decidedBy decidedAt decisionReason
    rightsVerified rightsVerifiedBy rightsVerifiedAt tierChangeConfirmed evidenceAcknowledged
    version blockedReason importEligible
    previousVersion currentVersion sourceChecksum revisedChecksum currentChecksum
    versionDiff versionReviewStatus approvalCarriedOver
  }
}`;

const REVIEW_AUDIT = `query D1ProjectionAudit($candidateId: String!, $sourceVersion: WeaponTierReviewSource) {
  adminWeaponTierReviewAudit(candidateId: $candidateId, sourceVersion: $sourceVersion) {
    id action actor changes createdAt
  }
}`;

const SOURCE_VERSION = 'D2_REVISED';
const DECISION_PATH = '/admin/weapon-tier-review';

function decisionTone(decision?: string) {
  if (decision === 'APPROVE') return 'text-emerald-400';
  if (decision === 'REJECT') return 'text-rose-400';
  if (decision === 'REQUEST_CHANGES') return 'text-amber-400';
  return 'text-sky-400';
}

export default function WeaponRankingReviewClient({
  rows,
  tierChanges,
  blocked,
  counts,
  batchSha256,
}: {
  rows: SheetRow[];
  tierChanges: SheetRow['tierChange'][];
  blocked: SheetRow['blocked'][];
  counts: Record<string, number>;
  batchSha256: string;
}) {
  const [authoritative, setAuthoritative] = useState<ReviewCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [audits, setAudits] = useState<Record<string, any[]>>({});

  const loadQueue = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGraphQLAdmin(REVIEW_QUEUE, { sourceVersion: SOURCE_VERSION });
      setAuthoritative(data.adminWeaponTierReviewQueue ?? []);
    } catch (error) {
      toast.error(`Không tải được trạng thái duyệt chính thức: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadQueue(); }, [loadQueue]);

  const authoritativeById = useMemo(() => {
    const map = new Map<string, ReviewCandidate>();
    authoritative.forEach((c) => map.set(c.stableCandidateId, c));
    return map;
  }, [authoritative]);

  const approvedCount = authoritative.filter((c) => c.decision === 'APPROVE').length;
  const pendingCount = authoritative.filter((c) => c.decision === 'PENDING').length;

  const loadAudit = async (row: SheetRow) => {
    const state = authoritativeById.get(row.candidateId);
    if (!state) return;
    try {
      const data = await fetchGraphQLAdmin(REVIEW_AUDIT, {
        candidateId: state.candidateId,
        sourceVersion: SOURCE_VERSION,
      });
      setAudits((prev) => ({ ...prev, [row.candidateId]: data.adminWeaponTierReviewAudit ?? [] }));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const renderRow = (row: SheetRow) => {
    const state = authoritativeById.get(row.candidateId);
    const detail = row.candidate;
    const isOpen = expanded === row.candidateId;
    const isBlocked = Boolean(row.blocked) || Boolean(state?.blockedReason);
    const versionDiff = state?.versionDiff ?? [];

    return (
      <article
        key={row.candidateId}
        className="atlas-surface border border-[var(--border-default)] rounded-lg p-4"
        data-record={row.candidateId}
        data-tier-change={row.tierChanged ? 'true' : 'false'}
        data-blocked={isBlocked ? 'true' : 'false'}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-bold">
              {row.weaponName} <span className="text-[var(--text-secondary)] text-sm">({row.weaponId})</span>
              {row.tierChanged && <span className="ms-2 rounded bg-amber-800 px-2 py-0.5 text-xs">THAY ĐỔI BẬC: {row.tierChange?.change}</span>}
              {isBlocked && <span className="ms-2 rounded bg-rose-900 px-2 py-0.5 text-xs">BỊ CHẶN</span>}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {row.role} · {row.refinement} · đề xuất <strong className="text-[var(--accent, #f5c542)]">{row.proposedTier}</strong>
              {' · '}tin cậy {row.confidence} · <span className={decisionTone(state?.decision)}>{state?.decision ?? 'PENDING'}</span>
            </p>
          </div>
          <div className="text-right text-xs text-[var(--text-secondary)]">
            <div>{row.candidateId}</div>
            <div className="font-mono">{row.recordSha256.slice(0, 16)}…</div>
          </div>
        </div>

        <div className="mt-3 grid gap-2 text-sm">
          <p><strong>Phiên bản:</strong> {state?.previousVersion ?? 'B3_1_FROZEN'} → {state?.currentVersion ?? 'D2_REVISED'} · v{state?.version ?? 0} · trạng thái {state?.versionReviewStatus ?? '—'}</p>
          <p><strong>Giải thích (VI):</strong> {state?.explanationVi || detail?.explanationVi || '—'}</p>
          <p><strong>Giả định gameplay:</strong> {(state?.gameplayAssumptions || detail?.gameplayConditions || row.exactGameplayAssumptions).join('; ') || '—'}</p>
          <p><strong>Độ nhạy:</strong> {detail?.sensitivity || '—'}</p>
          <p><strong>Nguồn / derivation:</strong> {detail?.sourceName} · {detail?.derivation} · rubric {detail?.rubricVersion}</p>
          <p><strong>Checksum nguồn:</strong> <code className="text-xs break-all">{state?.sourceChecksum ?? row.recordSha256}</code></p>
          <p><strong>Checksum hiện tại:</strong> <code className="text-xs break-all">{state?.currentChecksum ?? row.recordSha256}</code></p>
          <p><strong>Old → New:</strong> {row.tierChange ? `${row.oldTier} → ${row.proposedTier} (${row.tierChange.change})` : `${row.oldTier ?? 'chưa có'} → ${row.proposedTier}`}</p>
          <p><strong>Quyền phát hành:</strong> {state?.rightsVerified ? `đã xác minh bởi ${state.rightsVerifiedBy}` : 'CHƯA xác minh'}</p>
          <p><strong>Quyết định Admin:</strong> <span className={decisionTone(state?.decision)}>{state?.decision ?? 'PENDING'}</span>{state?.decidedBy ? ` · ${state.decidedBy}` : ''}</p>
          <p><strong>Sẵn sàng nhập:</strong> {state?.importEligible ? 'có' : 'không'}</p>
          {(state?.blockedReason || row.blocked) && <p className="text-rose-300"><strong>Lý do chặn:</strong> {state?.blockedReason || row.blocked?.reason}</p>}
        </div>

        <button
          type="button"
          className="mt-3 text-sm underline text-[var(--accent, #f5c542)]"
          aria-expanded={isOpen}
          onClick={() => setExpanded(isOpen ? null : row.candidateId)}
        >
          {isOpen ? 'Ẩn chi tiết' : 'Xem bằng chứng, diff & audit'}
        </button>

        {isOpen && (
          <div className="mt-3 space-y-3 rounded bg-black/20 p-3 text-sm">
            <div>
              <strong>Bằng chứng chính:</strong>
              <ul className="list-disc ps-5">
                {(detail?.evidence?.primaryEvidence || []).map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <p><strong>Facts chính xác:</strong> {(state?.exactGameFacts || detail?.evidence?.exactFacts || []).join('; ') || '—'}</p>
            <p><strong>Tiêu chí:</strong> {(detail?.evidence?.criteria || []).join('; ') || '—'}</p>
            <p><strong>Hạn chế:</strong> {(detail?.evidence?.limitations || []).join('; ') || '—'}</p>
            <p><strong>Lý do đổi bậc:</strong> {row.tierJustification || row.tierChange?.reason || 'giữ nguyên'}</p>
            <p><strong>Khuyến nghị draft:</strong> {row.reviewRecommendation || '—'} · <strong>Yêu cầu Admin:</strong> {row.adminActionRequired}</p>
            <details>
              <summary className="cursor-pointer">Version diff ({versionDiff.length} trường)</summary>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words text-xs">{JSON.stringify(versionDiff, null, 2)}</pre>
            </details>
            <div>
              <strong>Audit trail:</strong>
              <button type="button" className="ms-2 text-xs underline" onClick={() => void loadAudit(row)}>Tải audit</button>
              <ul className="list-disc ps-5">
                {(audits[row.candidateId] || []).map((entry) => (
                  <li key={entry.id}>{entry.action} · {entry.actor} · {entry.createdAt}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </article>
    );
  };

  return (
    <main className="grid gap-6">
      <header>
        <h1 className="atlas-section-title">Admin Review · Weapon Tier Rankings (chế độ xem)</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Trang này là bản chiếu chỉ-đọc của trạng thái duyệt chính thức (B3.2). Mọi quyết định, xác minh quyền và xác nhận đổi bậc
          chỉ được thực hiện tại <a className="underline text-[var(--accent, #f5c542)]" href={DECISION_PATH}>trang duyệt chính thức</a>.
          Không có luồng phê duyệt song song trên trang này; không tự động duyệt, không ghi vào development.
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">Frozen batch SHA-256: <code className="break-all">{batchSha256}</code></p>
      </header>

      <section aria-label="Tóm tắt" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="atlas-surface p-3"><strong>{counts.groupAReviewable}</strong> reviewable · {counts.candidates} ứng viên</div>
        <div className="atlas-surface p-3"><strong>{counts.groupBBlocked}</strong> bị chặn · {counts.tierChangesRequiringReReview} đổi bậc</div>
        <div className="atlas-surface p-3"><strong>{pendingCount}</strong> PENDING (chính thức)</div>
        <div className="atlas-surface p-3"><strong>{approvedCount}</strong> APPROVED (quyết định ứng viên)</div>
      </section>

      <section aria-label="Đổi bậc cần duyệt lại" className="grid gap-2">
        <h2 className="text-lg font-bold">2 thay đổi bậc cần xác nhận riêng</h2>
        {tierChanges.map((tc) => (
          <p key={tc?.candidateId} className="atlas-surface p-3 text-sm">
            <strong>{tc?.weaponName}</strong>: {tc?.change} — {tc?.reason}
          </p>
        ))}
      </section>

      <section aria-label="Ứng viên reviewable" className="grid gap-3">
        <h2 className="text-lg font-bold">13 ứng viên nhóm A (reviewable)</h2>
        {loading ? <p>Đang tải…</p> : rows.map((row) => renderRow(row))}
      </section>

      <section aria-label="Ứng viên bị chặn" className="grid gap-3">
        <h2 className="text-lg font-bold">Ứng viên bị chặn ({blocked.length})</h2>
        {blocked.filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)).map((entry) => (
          <p key={entry.candidateId} className="atlas-surface p-3 text-sm text-rose-300">
            <strong>{entry.weaponName}</strong> ({entry.candidateId}): {entry.reason}
          </p>
        ))}
      </section>
    </main>
  );
}
