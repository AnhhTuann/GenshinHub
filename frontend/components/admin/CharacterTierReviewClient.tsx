"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  fetchGraphQLAdmin,
  GET_ADMIN_CHARACTER_TIER_RANKINGS,
  GET_CHARACTER_TIER_AUDIT,
  UPSERT_CHARACTER_TIER_RANKING,
  APPROVE_CHARACTER_TIER_RANKING,
  REQUEST_CHANGES_CHARACTER_TIER_RANKING,
  REJECT_CHARACTER_TIER_RANKING,
  VERIFY_CHARACTER_TIER_RIGHTS,
} from '@/lib/graphql';

type SheetRow = {
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
  decision: Record<string, any>;
  draft: DraftDetail | null;
  reason?: string;
};

type DraftDetail = {
  characterId: string;
  characterName: string;
  role: string;
  constellation: string;
  proposedTier: string;
  explanationVi: string;
  strengths: string[];
  limitations: string[];
  teamAssumptions: string[];
  gameplayLimitations?: string[];
  evidence: Record<string, any>;
  derivation: string;
  sourceUrl: string;
  sourceName: string;
  sourceId: string;
  sourceLocale: string;
  lastReviewedDate: string;
  b25Review: { category: string; risks: string; recommendation: string };
};

type DbDraft = {
  id: string;
  characterId: string;
  role: string;
  constellation: string;
  tier: string;
  approvalStatus: string;
  derivation: string;
  explanationVi: string | null;
  evidence: Record<string, any> | null;
  rejectionReason: string | null;
  reviewedAt: string | null;
  approvedBy: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

const keyOf = (characterId: string, role: string, constellation: string, version: string) =>
  `${characterId}|${role}|${constellation}|${version}`;

function statusTone(status?: string) {
  if (status === 'APPROVED') return 'text-emerald-400';
  if (status === 'REJECTED') return 'text-rose-400';
  if (status === 'NEEDS_REVIEW') return 'text-amber-400';
  return 'text-sky-400';
}

export default function CharacterTierReviewClient({
  rows,
  excluded,
  counts,
  sourceBatchSha256,
}: {
  rows: SheetRow[];
  excluded: SheetRow[];
  counts: Record<string, number>;
  sourceBatchSha256: string;
}) {
  const [dbDrafts, setDbDrafts] = useState<DbDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [rightsNotes, setRightsNotes] = useState<Record<string, string>>({});
  const [audits, setAudits] = useState<Record<string, any[]>>({});

  const loadDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGraphQLAdmin(GET_ADMIN_CHARACTER_TIER_RANKINGS, { limit: 1000 });
      setDbDrafts(data.adminCharacterTierRankings || []);
    } catch (error) {
      toast.error(`Không tải được danh sách draft: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadDrafts(); }, [loadDrafts]);

  const draftIndex = useMemo(() => {
    const map = new Map<string, DbDraft>();
    dbDrafts.forEach((d) => map.set(keyOf(d.characterId, d.role, d.constellation, '7.2'), d));
    return map;
  }, [dbDrafts]);

  const approvedCount = dbDrafts.filter((d) => d.approvalStatus === 'APPROVED').length;
  const pendingCount = dbDrafts.filter((d) => d.approvalStatus === 'PENDING_REVIEW').length;

  const runAction = async (row: SheetRow, action: 'prepare' | 'approve' | 'request_changes' | 'reject' | 'rights' | 'audit') => {
    const db = draftIndex.get(keyOf(row.characterId, row.role, row.constellation, row.gameVersion));
    setBusyId(row.recordId);
    try {
      if (action === 'audit') {
        const data = await fetchGraphQLAdmin(GET_CHARACTER_TIER_AUDIT, { rankingId: db!.id });
        setAudits((prev) => ({ ...prev, [row.recordId]: data.characterTierAuditLog || [] }));
        return;
      }
      if (row.reason) throw new Error(row.reason);
      if (action === 'prepare') {
        const draft = row.draft;
        if (!draft) throw new Error('Không tìm thấy hồ sơ D2.');
        await fetchGraphQLAdmin(UPSERT_CHARACTER_TIER_RANKING, {
          input: {
            characterId: draft.characterId,
            role: draft.role,
            tier: draft.proposedTier,
            constellation: draft.constellation,
            gameVersion: row.gameVersion,
            explanationVi: draft.explanationVi,
            sourceUrl: draft.sourceUrl,
            sourceName: draft.sourceName,
            sourceId: draft.sourceId,
            sourceLocale: draft.sourceLocale || 'vi',
            derivation: 'INDEPENDENT',
            ...(db ? { expectedUpdatedAt: db.updatedAt, resubmitReason: 'Prepare the current D2 revised dossier.' } : {}),
            evidence: {
              ...draft.evidence,
              recordSha256: row.recordSha256,
            },
          },
        });
        toast.success('Đã chuẩn bị draft PENDING_REVIEW.');
      } else if (action === 'rights') {
        const note = (rightsNotes[row.recordId] || '').trim();
        if (!note) throw new Error('Cần ghi rõ căn cứ bản quyền trước khi xác minh.');
        if (!db) throw new Error('Chưa có draft trong DB.');
        await fetchGraphQLAdmin(VERIFY_CHARACTER_TIER_RIGHTS, {
          id: db.id, verified: true, note,
          expectedUpdatedAt: db.updatedAt,
        });
        toast.success('Đã xác minh bản quyền bởi Admin phiên hiện tại.');
      } else {
        if (!db) throw new Error('Chưa có draft trong DB.');
        const reason = (reasons[row.recordId] || '').trim();
        if (action !== 'approve' && !reason) throw new Error('Cần nhập lý do.');
        const vars: Record<string, any> = {
          id: db.id,
          expectedUpdatedAt: db.updatedAt,
          expectedChecksum: row.recordSha256,
        };
        if (action === 'request_changes') {
          await fetchGraphQLAdmin(REQUEST_CHANGES_CHARACTER_TIER_RANKING, { ...vars, reason });
          toast.success('Đã yêu cầu chỉnh sửa (NEEDS_REVIEW).');
        } else if (action === 'reject') {
          await fetchGraphQLAdmin(REJECT_CHARACTER_TIER_RANKING, { ...vars, reason });
          toast.success('Đã từ chối bản ghi.');
        } else {
          await fetchGraphQLAdmin(APPROVE_CHARACTER_TIER_RANKING, vars);
          toast.success('Đã phê duyệt. Bản ghi đã lên trang công khai.');
        }
      }
      await loadDrafts();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const renderRow = (row: SheetRow, readOnly = false) => {
    const db = draftIndex.get(keyOf(row.characterId, row.role, row.constellation, row.gameVersion));
    const isBusy = busyId === row.recordId;
    const isOpen = expanded === row.recordId;
    const draft = row.draft;
    const rightsVerified = db?.evidence?.rightsVerified === true;
    const stale = Boolean(db && db.evidence?.recordSha256 !== row.recordSha256);
    const canDecide = Boolean(db) && !stale && db?.approvalStatus === 'PENDING_REVIEW';
    const canPrepare = !db || (db.approvalStatus !== 'APPROVED' && (stale || !canDecide));

    return (
      <article key={row.recordId} className="atlas-surface border border-[var(--border-default)] rounded-lg p-4" data-record={row.recordId}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-bold">
              {row.characterName} <span className="text-[var(--text-secondary)] text-sm">({row.characterId})</span>
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {row.role} · {row.constellation} · đề xuất <strong className="text-[var(--accent, #f5c542)]">{row.proposedTier}</strong>
              {' · '}điểm {row.rubricScore} · <span className={statusTone(db?.approvalStatus)}>{db?.approvalStatus ?? 'CHƯA TRONG DB'}</span>
            </p>
          </div>
          <div className="text-right text-xs text-[var(--text-secondary)]">
            <div>{row.recordId}</div>
            <div className="font-mono">{row.recordSha256.slice(0, 16)}…</div>
          </div>
        </div>

        <div className="mt-3 grid gap-2 text-sm">
          <p><strong>Giải thích (VI):</strong> {draft?.explanationVi || '—'}</p>
          <p><strong>Giả định gameplay:</strong> {Array.isArray(draft?.teamAssumptions) ? draft.teamAssumptions.join('; ') : '—'}</p>
          {(draft?.gameplayLimitations?.length ?? 0) > 0 && (
            <p><strong>Hạn chế gameplay:</strong> {draft?.gameplayLimitations?.join('; ')}</p>
          )}
          <p><strong>Độ tin cậy:</strong> {draft?.evidence?.confidence || '—'} · <strong>Nguồn:</strong> {row.sourceName} ({draft?.derivation})</p>
          <p><strong>Checksum nguồn:</strong> <code className="text-xs break-all">{row.recordSha256}</code></p>
          <p><strong>Old → New:</strong> {db ? `${db.tier} → ${row.proposedTier}` : `chưa có bản ghi → ${row.proposedTier} (không dùng tier cũ)`}</p>
          <p><strong>Quyền phát hành:</strong> {rightsVerified ? `đã xác minh bởi ${db?.evidence?.rightsVerifiedBy}` : 'CHƯA xác minh'}</p>
          {(readOnly || row.reason) && <p className="text-rose-300"><strong>Lý do loại:</strong> {row.reason || row.risks || '—'}</p>}
        </div>

        <button
          type="button"
          className="mt-3 text-sm underline text-[var(--accent, #f5c542)]"
          aria-expanded={isOpen}
          onClick={() => setExpanded(isOpen ? null : row.recordId)}
        >
          {isOpen ? 'Ẩn chi tiết' : 'Xem bằng chứng, rủi ro & audit'}
        </button>

        {isOpen && (
          <div className="mt-3 space-y-3 rounded bg-black/20 p-3 text-sm">
            <div>
              <strong>Bằng chứng chính:</strong>
              <ul className="list-disc ps-5">
                {(draft?.evidence?.primaryEvidence || []).map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <p><strong>Điểm rubric:</strong> {JSON.stringify(draft?.evidence?.rubricScores || {})}</p>
            <p><strong>Nhu cầu năng lượng:</strong> {draft?.evidence?.energyRequirements || '—'}</p>
            <p><strong>Độ nhạy (chỉ hiệu suất):</strong> {row.sensitivity.performanceOnly} → {row.sensitivity.performanceOnlyTier}</p>
            <p><strong>Rủi ro B2.5:</strong> {row.reason || row.risks || draft?.b25Review?.risks || '—'}</p>
            <p><strong>Khuyến nghị:</strong> {row.reviewRecommendation || draft?.b25Review?.recommendation || '—'}</p>
            <div>
              <strong>Audit trail:</strong>
              <button type="button" className="ms-2 text-xs underline" disabled={!db || isBusy} onClick={() => runAction(row, 'audit')}>Tải audit</button>
              <ul className="list-disc ps-5">
                {(audits[row.recordId] || []).map((entry, i) => (
                  <li key={i}>{entry.action} · {entry.actor} · {entry.at}{entry.reason ? ` · ${entry.reason}` : ''}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!readOnly && !row.reason && (
          <div className="mt-4 space-y-2">
            {canPrepare && (
              <button type="button" className="atlas-admin-action rounded px-3 py-2" disabled={isBusy || !draft} onClick={() => runAction(row, 'prepare')}>
                {isBusy ? 'Đang xử lý…' : 'Chuẩn bị draft (PENDING_REVIEW)'}
              </button>
            )}
            {db && !rightsVerified && canDecide && (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  className="rounded border border-[var(--border-default)] bg-transparent px-2 py-1 text-sm flex-1 min-w-[220px]"
                  placeholder="Căn cứ bản quyền (bắt buộc, ghi rõ nguồn/nội dung tự viết)"
                  aria-label={`Lý do bản quyền ${row.recordId}`}
                  value={rightsNotes[row.recordId] || ''}
                  onChange={(e) => setRightsNotes((prev) => ({ ...prev, [row.recordId]: e.target.value }))}
                />
                <button type="button" className="atlas-admin-action rounded px-3 py-2" disabled={isBusy} onClick={() => runAction(row, 'rights')}>
                  Xác minh quyền phát hành
                </button>
              </div>
            )}
            {canDecide && (
              <div className="flex flex-wrap items-center gap-2">
                <input
                  className="rounded border border-[var(--border-default)] bg-transparent px-2 py-1 text-sm flex-1 min-w-[220px]"
                  placeholder="Lý do (bắt buộc cho REQUEST_CHANGES / REJECT)"
                  aria-label={`Lý do quyết định ${row.recordId}`}
                  value={reasons[row.recordId] || ''}
                  onChange={(e) => setReasons((prev) => ({ ...prev, [row.recordId]: e.target.value }))}
                />
                <button type="button" className="rounded bg-emerald-700 px-3 py-2 text-sm disabled:opacity-50" disabled={isBusy || !rightsVerified} onClick={() => runAction(row, 'approve')}>
                  APPROVE
                </button>
                <button type="button" className="rounded bg-amber-700 px-3 py-2 text-sm disabled:opacity-50" disabled={isBusy} onClick={() => runAction(row, 'request_changes')}>
                  REQUEST_CHANGES
                </button>
                <button type="button" className="rounded bg-rose-800 px-3 py-2 text-sm disabled:opacity-50" disabled={isBusy} onClick={() => runAction(row, 'reject')}>
                  REJECT
                </button>
              </div>
            )}
            {db?.approvalStatus === 'APPROVED' && (
              <p className="text-sm text-emerald-400">Đã phê duyệt bởi {db.approvedBy}; bản ghi public-only, không cho chỉnh sửa.</p>
            )}
          </div>
        )}
      </article>
    );
  };

  return (
    <main className="grid gap-6">
      <header>
        <h1 className="atlas-section-title">Admin Review · Character Tier Rankings</h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Duyệt từng bản ghi độc lập. Actor và thời gian được backend suy ra từ phiên Admin; checksum được kiểm tra trước khi phê duyệt.
          Không có tự động phê duyệt, không ghi vào development, không đổi tier để lấp UI.
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Frozen batch SHA-256: <code className="break-all">{sourceBatchSha256}</code>
        </p>
      </header>

      <section aria-label="Tóm tắt trạng thái" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="atlas-surface p-3"><strong>{counts.readyForAdminReview}</strong> sẵn sàng · {counts.sourceRankings} draft nguồn</div>
        <div className="atlas-surface p-3"><strong>{counts.excluded}</strong> bị loại (cần hiệu chỉnh)</div>
        <div className="atlas-surface p-3"><strong>{pendingCount}</strong> draft PENDING trong DB</div>
        <div className="atlas-surface p-3"><strong>{approvedCount}</strong> đã APPROVED (public)</div>
      </section>

      <section aria-label="Danh sách chờ duyệt" className="grid gap-3">
        <h2 className="text-lg font-bold">9 bản ghi READY_FOR_ADMIN_REVIEW</h2>
        {loading ? <p>Đang tải…</p> : rows.map((row) => renderRow(row))}
      </section>

      <section aria-label="Danh sách bị loại" className="grid gap-3">
        <h2 className="text-lg font-bold">6 bản ghi cần hiệu chỉnh / chưa đủ bằng chứng</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Các bản ghi này chỉ để theo dõi; nút phê duyệt bị ẩn. Không được đưa lên trang công khai.
        </p>
        {excluded.map((row) => renderRow(row, true))}
      </section>
    </main>
  );
}
