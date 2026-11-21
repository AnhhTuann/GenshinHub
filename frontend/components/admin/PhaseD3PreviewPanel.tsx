"use client";

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchGraphQLAdmin } from '@/lib/graphql';

/**
 * Phase D3 read-only version bridge. This panel never mutates review state; it
 * shows the D2 source/revision checksums, diff and per-version status that the
 * Admin needs before making a separate decision in the guarded workflow.
 */
type D3Record = {
  kind: 'CHARACTER' | 'WEAPON';
  candidateId: string;
  previousVersion: string;
  currentVersion: string;
  targetId: string;
  targetName: string;
  role: string;
  conditionLabel: string;
  conditionValue: string;
  previousTier: string;
  proposedTier: string;
  explanation: string;
  evidence: unknown;
  gameplayConditions: unknown;
  confidence: string;
  diff: Array<{ field: string; before: unknown; after: unknown; reason?: string }>;
  currentChecksum: string;
  sourceChecksum: string;
  reviewStatus: string;
  rightsStatus: Record<string, unknown>;
  approval: { adminDecision: string; rightsVerified: boolean };
  missingEvidence: string[];
};

const PREVIEW = `query AdminD3VersionedReviewPreview {
  adminD3VersionedReviewPreview {
    artifactSha256
    counts
    records
    excludedCharacterDrafts
  }
}`;

const json = (value: unknown) => JSON.stringify(value, null, 2);

export default function PhaseD3PreviewPanel({ kind }: { kind: 'CHARACTER' | 'WEAPON' }) {
  const [records, setRecords] = useState<D3Record[]>([]);
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void fetchGraphQLAdmin(PREVIEW)
      .then(data => {
        if (!active) return;
        setRecords((data.adminD3VersionedReviewPreview?.records ?? []).filter((r: D3Record) => r.kind === kind));
        setCounts(data.adminD3VersionedReviewPreview?.counts ?? null);
      })
      .catch(error => {
        if (active) toast.error(error instanceof Error ? error.message : String(error));
      });
    return () => { active = false; };
  }, [kind]);

  return (
    <section className="rounded-lg p-4" style={{ background: 'rgba(8,12,28,0.82)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h2 className="text-sm font-black uppercase tracking-wide text-white/80">
        Phase D3 — {kind === 'CHARACTER' ? 'Character' : 'Weapon'} revised version bridge
      </h2>
      <p className="text-white/35 text-xs mt-1">
        Read-only preview of the D2 revised dossiers. Source and revised checksums, diff and per-version status are
        shown before any Admin decision. This panel never approves or imports anything.
      </p>
      {counts && (
        <p className="text-white/30 text-[11px] mt-1">
          In scope: {counts.inScope} · Character: {counts.character} · Weapon: {counts.weapon} · importable now: {counts.importableNow}
        </p>
      )}
      <div className="grid gap-2 mt-3">
        {records.map(record => (
          <div key={record.candidateId} className="rounded-md" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <button type="button" className="w-full text-left px-3 py-2" onClick={() => setOpenId(current => current === record.candidateId ? null : record.candidateId)}>
              <div className="flex flex-wrap justify-between gap-2 text-xs">
                <span className="font-semibold text-white/85">
                  {record.candidateId} · {record.targetName} ({record.targetId})
                </span>
                <span className="text-white/45">
                  {record.previousTier} → {record.proposedTier} · {record.reviewStatus}
                </span>
              </div>
              <div className="text-white/30 text-[11px] mt-0.5 break-all">
                {record.previousVersion} → {record.currentVersion} · {record.role} · {record.conditionLabel} {record.conditionValue} · checksum {record.currentChecksum}
              </div>
            </button>
            {openId === record.candidateId && (
              <div className="px-3 pb-3 grid gap-2 text-[11px] text-white/60">
                <div><b className="text-white/45">Candidate ID:</b> {record.candidateId}</div>
                <div><b className="text-white/45">Previous / current version:</b> {record.previousVersion} → {record.currentVersion}</div>
                <div><b className="text-white/45">Target ID:</b> {record.targetId} · <b className="text-white/45">Role:</b> {record.role} · <b className="text-white/45">{record.conditionLabel}:</b> {record.conditionValue}</div>
                <div><b className="text-white/45">Proposed tier:</b> {record.proposedTier} · <b className="text-white/45">Confidence:</b> {record.confidence}</div>
                <pre className="whitespace-pre-wrap break-words rounded p-2" style={{ background: 'rgba(5,8,20,0.8)' }}>{record.explanation}</pre>
                <pre className="whitespace-pre-wrap break-words rounded p-2" style={{ background: 'rgba(5,8,20,0.8)' }}>Evidence: {json(record.evidence)}</pre>
                <pre className="whitespace-pre-wrap break-words rounded p-2" style={{ background: 'rgba(5,8,20,0.8)' }}>Gameplay conditions: {json(record.gameplayConditions)}</pre>
                <pre className="whitespace-pre-wrap break-words rounded p-2" style={{ background: 'rgba(5,8,20,0.8)' }}>Diff: {json(record.diff)}</pre>
                <div className="break-all"><b className="text-white/45">Source checksum:</b> {record.sourceChecksum}</div>
                <div className="break-all"><b className="text-white/45">Current checksum:</b> {record.currentChecksum}</div>
                <div><b className="text-white/45">Review status:</b> {record.reviewStatus} · <b className="text-white/45">Decision:</b> {record.approval.adminDecision}</div>
                <div><b className="text-white/45">Rights status:</b> {json(record.rightsStatus)}</div>
                {record.missingEvidence.length > 0 && (
                  <div><b className="text-white/45">Missing evidence:</b> {record.missingEvidence.join(', ')}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
