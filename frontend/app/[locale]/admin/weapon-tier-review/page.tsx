"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchGraphQLAdmin } from "@/lib/graphql";
import PhaseD3PreviewPanel from "@/components/admin/PhaseD3PreviewPanel";

/**
 * Phase B3.2 - real Admin review workflow for the frozen Weapon Tier Ranking
 * dossier. Every decision, rights confirmation and tier re-review is an
 * explicit Admin action sent through the authenticated admin GraphQL proxy.
 * This page never edits JSON, never imports rankings and never auto-approves.
 */

type Decision = "PENDING" | "APPROVE" | "REQUEST_CHANGES" | "REJECT";

type Candidate = {
  candidateId: string;
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
  tierJustification: string | null;
  explanationVi: string;
  gameplayAssumptions: string[];
  exactGameFacts: string[];
  evidence: any;
  confidence: string;
  approvalChecksum: string;
  batchSha256: string;
  reviewGroup: string;
  draftRecommendation: string | null;
  rightsStatus: any;
  decision: Decision;
  decisionReason: string | null;
  decidedAt: string | null;
  decidedBy: string | null;
  rightsVerified: boolean;
  rightsVerifiedAt: string | null;
  rightsVerifiedBy: string | null;
  rightsBasis: any;
  tierChangeConfirmed: boolean;
  tierChangeConfirmedAt: string | null;
  tierChangeConfirmedBy: string | null;
  evidenceAcknowledged: boolean;
  evidenceSupplement: any;
  version: number;
  blockedReason: string | null;
  importEligible: boolean;
  published: boolean;
  stableCandidateId: string;
  previousCandidateId: string | null;
  previousVersion: string;
  currentVersion: string;
  sourceChecksum: string;
  revisedChecksum: string;
  currentChecksum: string;
  versionDiff: Array<{ field: string; before: unknown; after: unknown; reason?: string }>;
  versionReviewStatus: string;
  approvalCarriedOver: boolean;
};

type SourceVersion = "FROZEN" | "D2_REVISED";

type AuditEntry = {
  id: string;
  action: string;
  actor: string;
  changes: any;
  createdAt: string;
};

const QUEUE = `query WeaponTierReviewQueue($sourceVersion: WeaponTierReviewSource) {
  adminWeaponTierReviewQueue(sourceVersion: $sourceVersion) {
    candidateId stableCandidateId previousCandidateId weaponId weaponName weaponType dbWeaponType role refinement refinementLevel
    proposedTier previousTier tierChanged tierJustification explanationVi
    gameplayAssumptions exactGameFacts evidence confidence approvalChecksum batchSha256
    reviewGroup draftRecommendation rightsStatus
    decision decisionReason decidedAt decidedBy
    rightsVerified rightsVerifiedAt rightsVerifiedBy rightsBasis
    tierChangeConfirmed tierChangeConfirmedAt tierChangeConfirmedBy
    evidenceAcknowledged evidenceSupplement version blockedReason importEligible published
    previousVersion currentVersion sourceChecksum revisedChecksum currentChecksum
    versionDiff versionReviewStatus approvalCarriedOver
  }
}`;

const AUDIT = `query WeaponTierReviewAudit($candidateId: String!, $sourceVersion: WeaponTierReviewSource) {
  adminWeaponTierReviewAudit(candidateId: $candidateId, sourceVersion: $sourceVersion) {
    id action actor changes createdAt
  }
}`;

const DECIDE = `mutation Decide(
  $candidateId: String!, $decision: WeaponTierDecision!, $reason: String!,
  $batchSha256: String!, $recordSha256: String!, $expectedVersion: Int!,
  $evidenceAcknowledged: Boolean, $evidenceSupplement: JSON,
  $sourceVersion: WeaponTierReviewSource
) {
  adminDecideWeaponTierReview(
    candidateId: $candidateId, decision: $decision, reason: $reason,
    batchSha256: $batchSha256, recordSha256: $recordSha256, expectedVersion: $expectedVersion,
    evidenceAcknowledged: $evidenceAcknowledged, evidenceSupplement: $evidenceSupplement,
    sourceVersion: $sourceVersion
  ) { candidateId decision version importEligible published blockedReason }
}`;

const VERIFY_RIGHTS = `mutation Rights(
  $candidateId: String!, $batchSha256: String!, $recordSha256: String!, $expectedVersion: Int!,
  $independentRanking: Boolean!, $originalExplanation: Boolean!, $noGenshinBuildsEditorialCopy: Boolean!,
  $gameFactsAttributionCorrect: Boolean!, $evidenceValid: Boolean!, $note: String!,
  $sourceVersion: WeaponTierReviewSource
) {
  adminVerifyWeaponTierReviewRights(
    candidateId: $candidateId, batchSha256: $batchSha256, recordSha256: $recordSha256,
    expectedVersion: $expectedVersion, independentRanking: $independentRanking,
    originalExplanation: $originalExplanation, noGenshinBuildsEditorialCopy: $noGenshinBuildsEditorialCopy,
    gameFactsAttributionCorrect: $gameFactsAttributionCorrect, evidenceValid: $evidenceValid, note: $note,
    sourceVersion: $sourceVersion
  ) { candidateId rightsVerified rightsVerifiedBy version }
}`;

const CONFIRM_TIER = `mutation Tier(
  $candidateId: String!, $batchSha256: String!, $recordSha256: String!,
  $expectedVersion: Int!, $confirmed: Boolean!, $sourceVersion: WeaponTierReviewSource
) {
  adminConfirmWeaponTierChange(
    candidateId: $candidateId, batchSha256: $batchSha256, recordSha256: $recordSha256,
    expectedVersion: $expectedVersion, confirmed: $confirmed, sourceVersion: $sourceVersion
  ) { candidateId tierChangeConfirmed tierChangeConfirmedBy version }
}`;

const RIGHTS_GROUNDS = [
  ["independentRanking", "Independent ranking / xếp hạng độc lập"],
  ["originalExplanation", "Original explanation / giải thích gốc"],
  ["noGenshinBuildsEditorialCopy", "No GenshinBuilds editorial copy / không chép biên tập"],
  ["gameFactsAttributionCorrect", "Game-facts attribution correct / ghi nguồn đúng"],
  ["evidenceValid", "Evidence valid / bằng chứng hợp lệ"],
] as const;

const SUPPLEMENT_FIELDS = [
  "critRateAssumptions",
  "passiveProcConditions",
  "rotation",
  "fieldTimeRequirements",
  "energyGenerationAssumptions",
  "rubricJustification",
] as const;

const decisionColor = (decision: Decision) =>
  decision === "APPROVE" ? "#4ade80"
    : decision === "REJECT" ? "#f87171"
      : decision === "REQUEST_CHANGES" ? "#fbbf24" : "rgba(255,255,255,0.45)";

const surface: React.CSSProperties = {
  background: "rgba(8,12,28,0.82)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export default function WeaponTierReviewPage() {
  const [rows, setRows] = useState<Candidate[]>([]);
  const [sourceVersion, setSourceVersion] = useState<SourceVersion>("D2_REVISED");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [reason, setReason] = useState("");
  const [evidenceAcknowledged, setEvidenceAcknowledged] = useState(false);
  const [supplement, setSupplement] = useState("{}");
  const [rightsChecks, setRightsChecks] = useState<Record<string, boolean>>({});
  const [rightsNote, setRightsNote] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGraphQLAdmin(QUEUE, { sourceVersion });
      const list: Candidate[] = data.adminWeaponTierReviewQueue ?? [];
      setRows(list);
      setSelectedId(current => current && list.some(r => r.candidateId === current) ? current : null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, [sourceVersion]);

  useEffect(() => { void load(); }, [load]);

  const selected = rows.find(row => row.candidateId === selectedId) ?? null;

  const loadAudit = useCallback(async (candidateId: string) => {
    try {
      const data = await fetchGraphQLAdmin(AUDIT, { candidateId, sourceVersion });
      setAudit(data.adminWeaponTierReviewAudit ?? []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [sourceVersion]);

  const switchSourceVersion = (version: SourceVersion) => {
    if (version === sourceVersion) return;
    setSelectedId(null);
    setSourceVersion(version);
  };

  const selectCandidate = (candidateId: string) => {
    setSelectedId(candidateId);
    setReason("");
    setEvidenceAcknowledged(false);
    setSupplement("{}");
    setRightsChecks({});
    setRightsNote("");
    void loadAudit(candidateId);
  };

  const runMutation = async (label: string, query: string, variables: Record<string, unknown>) => {
    setBusy(true);
    try {
      await fetchGraphQLAdmin(query, variables);
      toast.success(label);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      // Always refetch: even a rejected mutation may have initialised the row
      // (REVIEW_CREATED) or another Admin may have advanced the version. Keeping
      // a stale expectedVersion would block every subsequent action.
      await load();
      if (selectedId) await loadAudit(selectedId);
      setBusy(false);
    }
  };

  const castDecision = (decision: Exclude<Decision, "PENDING">) => {
    if (!selected) return;
    if (reason.trim().length < 10) {
      toast.error("Hãy nhập lý do quyết định (tối thiểu 10 ký tự).");
      return;
    }
    let evidenceSupplement: Record<string, string> | null = null;
    if (selected.reviewGroup === "B") {
      try {
        const parsed = JSON.parse(supplement);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) ||
            SUPPLEMENT_FIELDS.some(field => typeof parsed[field] !== "string" || parsed[field].trim().length < 10)) {
          throw new Error("Thiếu một hoặc nhiều trường bằng chứng bắt buộc.");
        }
        evidenceSupplement = parsed;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
        return;
      }
    }
    void runMutation(`Đã ghi quyết định ${decision}`, DECIDE, {
      candidateId: selected.candidateId,
      decision,
      reason: reason.trim(),
      batchSha256: selected.batchSha256,
      recordSha256: selected.approvalChecksum,
      expectedVersion: selected.version,
      evidenceAcknowledged,
      evidenceSupplement,
      sourceVersion,
    });
  };

  const verifyRights = () => {
    if (!selected) return;
    if (RIGHTS_GROUNDS.some(([field]) => rightsChecks[field] !== true)) {
      toast.error("Hãy xác nhận đầy đủ 5 căn cứ phát hành.");
      return;
    }
    if (rightsNote.trim().length < 10) {
      toast.error("Hãy nhập ghi chú căn cứ (tối thiểu 10 ký tự).");
      return;
    }
    void runMutation("Đã xác minh quyền phát hành", VERIFY_RIGHTS, {
      candidateId: selected.candidateId,
      batchSha256: selected.batchSha256,
      recordSha256: selected.approvalChecksum,
      expectedVersion: selected.version,
      ...Object.fromEntries(RIGHTS_GROUNDS.map(([field]) => [field, true])),
      note: rightsNote.trim(),
      sourceVersion,
    });
  };

  const confirmTier = (confirmed: boolean) => {
    if (!selected) return;
    void runMutation(confirmed ? "Đã xác nhận thay đổi tier" : "Đã hủy xác nhận tier", CONFIRM_TIER, {
      candidateId: selected.candidateId,
      batchSha256: selected.batchSha256,
      recordSha256: selected.approvalChecksum,
      expectedVersion: selected.version,
      confirmed,
      sourceVersion,
    });
  };

  const reviewable = rows.filter(row => row.reviewGroup === "A").length;
  const pending = rows.filter(row => row.decision === "PENDING").length;
  const approved = rows.filter(row => row.decision === "APPROVE").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-black uppercase tracking-wide" style={{
          fontFamily: "var(--font-cinzel,Cinzel,serif)",
          background: "linear-gradient(135deg,#ffdf9e,#e8b64c)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>Weapon Tier Review</h1>
        <p className="text-white/30 text-xs mt-0.5">
          Phê duyệt từng xếp hạng vũ khí đã đóng băng. Mọi quyết định là hành động Admin riêng biệt, có nhật ký; trang này không tự động duyệt hay nhập dữ liệu.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["FROZEN", "D2_REVISED"] as SourceVersion[]).map(version => (
          <button key={version} type="button" onClick={() => switchSourceVersion(version)}
            className="rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
            style={{
              background: sourceVersion === version ? "rgba(232,182,76,0.16)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${sourceVersion === version ? "rgba(232,182,76,0.5)" : "rgba(255,255,255,0.08)"}`,
              color: sourceVersion === version ? "#fde68a" : "rgba(255,255,255,0.55)",
            }}>
            {version === "FROZEN" ? "B3.1 Frozen" : "D2 Revised"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ["Tổng ứng viên", rows.length],
          ["Có thể review (A)", reviewable],
          ["Chờ quyết định", pending],
          ["Đã APPROVE", approved],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-lg p-3" style={surface}>
            <div className="text-white/35 text-[10px] uppercase tracking-wider">{label}</div>
            <div className="text-lg font-bold text-white/85">{String(value)}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="p-10 text-white/40 text-sm">Đang tải dữ liệu review...</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
          <section className="rounded-lg p-3" style={surface}>
            <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/35 mb-3">Danh sách ứng viên</h2>
            <ul className="grid gap-1.5 max-h-[70vh] overflow-auto pr-1">
              {rows.map(row => (
                <li key={row.candidateId}>
                  <button type="button" onClick={() => selectCandidate(row.candidateId)}
                    className="w-full text-left rounded-md px-2.5 py-2 text-xs"
                    style={{
                      background: row.candidateId === selectedId ? "rgba(232,182,76,0.14)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${row.candidateId === selectedId ? "rgba(232,182,76,0.5)" : "rgba(255,255,255,0.06)"}`,
                    }}>
                    <div className="flex justify-between gap-2">
                      <span className="text-white/85 font-semibold">{row.weaponName}</span>
                      <span className="font-bold" style={{ color: decisionColor(row.decision) }}>{row.decision}</span>
                    </div>
                    <div className="text-white/35 mt-0.5">
                      {row.weaponId} · {row.role} · {row.refinement} · {row.previousTier ?? "—"} → {row.proposedTier}
                    </div>
                    <div className="text-white/25 mt-0.5 break-all">
                      {row.candidateId}
                    </div>
                    <div className="text-white/25 mt-0.5">
                      Nhóm {row.reviewGroup} · v{row.version} · {row.previousVersion} → {row.currentVersion}
                      {row.importEligible ? " · sẵn sàng nhập" : ""}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg p-4 min-w-0" style={surface}>
            {!selected ? (
              <p className="text-white/30 text-sm">Chọn một ứng viên để xem hồ sơ và thực hiện quyết định.</p>
            ) : (
              <div className="grid gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-white/90">{selected.weaponName}</h2>
                    <p className="text-white/35 text-xs break-all">
                      Candidate {selected.candidateId} · Weapon ID {selected.weaponId} · {selected.weaponType} ({selected.dbWeaponType})
                      <br />Role {selected.role} · Refinement {selected.refinement}{selected.refinementLevel ? ` (R${selected.refinementLevel})` : ""}
                      <br />Version {selected.previousVersion} → {selected.currentVersion} · Review status {selected.versionReviewStatus}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <Badge label={`Tier: ${selected.previousTier ?? "—"} → ${selected.proposedTier}`} tone={selected.tierChanged ? "warn" : "muted"} />
                    <Badge label={`Confidence: ${selected.confidence}`} tone="muted" />
                    <Badge label={`Quyền phát hành: ${selected.rightsVerified ? "đã xác minh" : "chưa"}`} tone={selected.rightsVerified ? "good" : "warn"} />
                    <Badge label={`Quyết định: ${selected.decision}`} tone={selected.decision === "APPROVE" ? "good" : selected.decision === "PENDING" ? "muted" : "warn"} />
                  </div>
                </div>

                {selected.blockedReason && (
                  <p className="rounded-md px-3 py-2 text-xs" style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#fca5a5" }}>
                    Bị chặn: {selected.blockedReason}
                  </p>
                )}

                <Section title="Giải thích xếp hạng" body={selected.explanationVi} />
                <Section title="Lý do thay đổi tier" body={selected.tierJustification || "Không thay đổi tier."} />
                <ListSection title="Giả định gameplay chính xác" items={selected.gameplayAssumptions} />
                <ListSection title="Sự kiện game có trong genshin-db" items={selected.exactGameFacts} />
                <Section title="Bằng chứng" body={JSON.stringify(selected.evidence, null, 2)} mono />

                <div className="rounded-md px-3 py-2 text-[10px] break-all text-white/30" style={{ background: "rgba(255,255,255,0.02)" }}>
                  Candidate ID: {selected.candidateId} · Stable ID: {selected.stableCandidateId}
                  <br />Previous version: {selected.previousVersion} · Current version: {selected.currentVersion}
                  <br />Source checksum: {selected.sourceChecksum}
                  <br />Current checksum: {selected.currentChecksum}
                  <br />Batch checksum: {selected.batchSha256}
                  <br />Review status: {selected.versionReviewStatus} · Approval carried over: {String(selected.approvalCarriedOver)}
                  <br />Rights status: {JSON.stringify(selected.rightsStatus)}
                </div>

                <details className="rounded-md px-3 py-2 text-[10px] text-white/30" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <summary className="cursor-pointer">Version diff ({selected.versionDiff.length} fields)</summary>
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words">{JSON.stringify(selected.versionDiff, null, 2)}</pre>
                </details>

                {sourceVersion === "FROZEN" || selected.published ? (
                  <p className="text-xs text-white/60">{selected.published ? "Đã công bố." : "Bản đóng băng · chỉ xem lịch sử."}</p>
                ) : (
                  <>
                <div className="rounded-lg p-3 grid gap-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/35">1. Quyết định Admin</h3>
                  <label className="flex items-start gap-2 text-xs text-white/70">
                    <input type="checkbox" checked={evidenceAcknowledged} disabled={busy}
                      onChange={event => setEvidenceAcknowledged(event.target.checked)} className="mt-0.5" />
                    Tôi đã xem xét đầy đủ giải thích, giả định gameplay và bằng chứng ở trên.
                  </label>
                  {selected.reviewGroup === "B" && (
                    <label className="grid gap-1 text-xs text-white/55">
                      Bổ sung 6 trường bằng chứng còn thiếu (JSON):
                      <textarea rows={9} spellCheck={false} value={supplement} disabled={busy}
                        onChange={event => setSupplement(event.target.value)}
                        className="w-full min-w-0 rounded p-2 font-mono text-[11px] text-white/80"
                        style={{ background: "rgba(5,8,20,0.8)", border: "1px solid rgba(255,255,255,0.07)" }} />
                    </label>
                  )}
                  <label className="grid gap-1 text-xs text-white/55">
                    Lý do quyết định (bắt buộc):
                    <textarea rows={2} value={reason} disabled={busy}
                      onChange={event => setReason(event.target.value)}
                      className="w-full min-w-0 rounded p-2 text-xs text-white/80"
                      style={{ background: "rgba(5,8,20,0.8)", border: "1px solid rgba(255,255,255,0.07)" }} />
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <ActionButton label="APPROVE" tone="good" busy={busy} onClick={() => castDecision("APPROVE")} />
                    <ActionButton label="REQUEST_CHANGES" tone="warn" busy={busy} onClick={() => castDecision("REQUEST_CHANGES")} />
                    <ActionButton label="REJECT" tone="bad" busy={busy} onClick={() => castDecision("REJECT")} />
                  </div>
                  {selected.decidedBy && (
                    <p className="text-white/30 text-[11px]">
                      Quyết định hiện tại bởi {selected.decidedBy} · {selected.decidedAt ? new Date(selected.decidedAt).toLocaleString() : ""}
                    </p>
                  )}
                </div>

                <div className="rounded-lg p-3 grid gap-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/35">2. Xác minh quyền phát hành (riêng biệt)</h3>
                  {RIGHTS_GROUNDS.map(([field, label]) => (
                    <label key={field} className="flex items-center gap-2 text-xs text-white/70">
                      <input type="checkbox" disabled={busy || selected.rightsVerified}
                        checked={rightsChecks[field] === true}
                        onChange={event => setRightsChecks(checks => ({ ...checks, [field]: event.target.checked }))} />
                      {label}
                    </label>
                  ))}
                  <label className="grid gap-1 text-xs text-white/55">
                    Ghi chú căn cứ xác minh:
                    <textarea rows={2} value={rightsNote} disabled={busy || selected.rightsVerified}
                      onChange={event => setRightsNote(event.target.value)}
                      className="w-full min-w-0 rounded p-2 text-xs text-white/80"
                      style={{ background: "rgba(5,8,20,0.8)", border: "1px solid rgba(255,255,255,0.07)" }} />
                  </label>
                  <div>
                    <ActionButton label={selected.rightsVerified ? "Đã xác minh quyền" : "Xác minh quyền phát hành"}
                      tone="good" busy={busy} disabled={selected.rightsVerified} onClick={verifyRights} />
                  </div>
                  {selected.rightsVerified && (
                    <p className="text-[11px] text-white/30">
                      {selected.rightsVerifiedBy} · {selected.rightsVerifiedAt ? new Date(selected.rightsVerifiedAt).toLocaleString() : ""}
                    </p>
                  )}
                </div>

                {selected.tierChanged && (
                  <div className="rounded-lg p-3 grid gap-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/35">3. Xác nhận lại thay đổi tier (riêng biệt)</h3>
                    <p className="text-xs text-white/60">
                      Thay đổi {selected.previousTier} → {selected.proposedTier} cần xác nhận riêng trước khi APPROVE.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <ActionButton label="Xác nhận thay đổi tier" tone="warn" busy={busy}
                        disabled={selected.tierChangeConfirmed} onClick={() => confirmTier(true)} />
                      <ActionButton label="Hủy xác nhận" tone="muted" busy={busy}
                        disabled={!selected.tierChangeConfirmed} onClick={() => confirmTier(false)} />
                    </div>
                    {selected.tierChangeConfirmed && (
                      <p className="text-[11px] text-white/30">
                        {selected.tierChangeConfirmedBy} · {selected.tierChangeConfirmedAt ? new Date(selected.tierChangeConfirmedAt).toLocaleString() : ""}
                      </p>
                    )}
                  </div>
                )}

                  </>
                )}

                <details className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <summary className="text-[11px] font-black uppercase tracking-[0.18em] text-white/35 cursor-pointer">Nhật ký kiểm duyệt</summary>
                  <ul className="grid gap-2 mt-3">
                    {audit.length === 0 && <li className="text-white/25 text-xs">Chưa có nhật ký.</li>}
                    {audit.map(entry => (
                      <li key={entry.id} className="text-[11px] text-white/60 border-b border-white/5 pb-1">
                        <span className="text-white/80 font-semibold">{entry.action}</span> · {entry.actor} · {new Date(entry.createdAt).toLocaleString()}
                        {entry.changes != null && <pre className="overflow-x-auto text-white/35 mt-1">{JSON.stringify(entry.changes)}</pre>}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            )}
          </section>
        </div>
      )}

      <PhaseD3PreviewPanel kind="WEAPON" />
    </div>
  );
}

function Badge({ label, tone }: { label: string; tone: "good" | "warn" | "muted" }) {
  const colors = tone === "good" ? ["rgba(74,222,128,0.12)", "#86efac"]
    : tone === "warn" ? ["rgba(251,191,36,0.12)", "#fcd34d"]
      : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.5)"];
  return (
    <span className="rounded-full px-2 py-0.5" style={{ background: colors[0], color: colors[1] }}>{label}</span>
  );
}

function Section({ title, body, mono }: { title: string; body: string; mono?: boolean }) {
  return (
    <div>
      <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/35 mb-1">{title}</h3>
      <pre className={`rounded-md p-3 text-xs text-white/70 whitespace-pre-wrap break-words ${mono ? "font-mono" : ""}`}
        style={{ background: "rgba(255,255,255,0.02)" }}>{body}</pre>
    </div>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white/35 mb-1">{title}</h3>
      <ul className="grid gap-1 rounded-md p-3 text-xs text-white/60" style={{ background: "rgba(255,255,255,0.02)" }}>
        {(items ?? []).map((item, index) => <li key={index}>• {item}</li>)}
      </ul>
    </div>
  );
}

function ActionButton({ label, tone, busy, disabled, onClick }: {
  label: string; tone: "good" | "warn" | "bad" | "muted"; busy: boolean; disabled?: boolean; onClick: () => void;
}) {
  const colors = tone === "good" ? ["rgba(74,222,128,0.16)", "rgba(74,222,128,0.45)", "#bbf7d0"]
    : tone === "warn" ? ["rgba(251,191,36,0.16)", "rgba(251,191,36,0.45)", "#fde68a"]
      : tone === "bad" ? ["rgba(248,113,113,0.16)", "rgba(248,113,113,0.45)", "#fecaca"]
        : ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.14)", "rgba(255,255,255,0.6)"];
  return (
    <button type="button" disabled={busy || disabled} onClick={onClick}
      className="rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide disabled:opacity-40"
      style={{ background: colors[0], border: `1px solid ${colors[1]}`, color: colors[2] }}>
      {label}
    </button>
  );
}
