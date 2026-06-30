"use client";
import { useState, useEffect, useCallback } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { useConfirm } from '@/components/admin/ui/ConfirmModal';

interface BackupInfo {
  id: string; filename: string; createdAt: string; sizeBytes: number;
  stats: { characters: number; weapons: number; artifacts: number; materials: number; };
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024*1024) return `${(b/1024).toFixed(1)} KB`;
  return `${(b/(1024*1024)).toFixed(2)} MB`;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff/60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins/60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs/24)}d ago`;
}

export default function BackupsAdmin() {
  const [backups,   setBackups]   = useState<BackupInfo[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [creating,  setCreating]  = useState(false);
  const [restoring, setRestoring] = useState<string|null>(null);
  const { confirm, modal: confirmModal } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetchGraphQL(`query { listBackups { id filename createdAt sizeBytes stats { characters weapons artifacts materials } } }`);
      setBackups(d.listBackups ?? []);
    } catch (e: any) { toast.error('Failed to load backups: '+e.message); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    setCreating(true);
    const tid = toast.loading('Creating backup...');
    try {
      await fetchGraphQL(`mutation { createBackup { id filename } }`);
      toast.success('Backup created!', { id: tid });
      load();
    } catch (e: any) { toast.error('Backup failed: '+e.message, { id: tid }); } finally { setCreating(false); }
  };

  const handleRestore = async (b: BackupInfo) => {
    const ok = await confirm({
      title: '⚠️ Restore Database',
      message: `This will OVERWRITE the entire current database with backup "${b.filename}" (${new Date(b.createdAt).toLocaleString()}). This action cannot be undone.`,
      confirmLabel: 'Restore',
      danger: true, requireTyping: true,
    });
    if (!ok) return;
    setRestoring(b.id);
    const tid = toast.loading('Restoring database...');
    try {
      await fetchGraphQL(`mutation { restoreFromBackup(id:"${b.id}") }`);
      toast.success('Database restored successfully!', { id: tid });
      load();
    } catch (e: any) { toast.error('Restore failed: '+e.message, { id: tid }); } finally { setRestoring(null); }
  };

  const handleDelete = async (b: BackupInfo) => {
    const ok = await confirm({
      title: 'Delete Backup',
      message: `Delete backup "${b.filename}"? This cannot be undone.`,
      confirmLabel: 'Delete', danger: true,
    });
    if (!ok) return;
    try {
      await fetchGraphQL(`mutation { deleteBackup(id:"${b.id}") }`);
      toast.success('Backup deleted.');
      load();
    } catch (e: any) { toast.error(e.message); }
  };

  const handleCleanup = async () => {
    const ok = await confirm({
      title: 'Cleanup Old Backups',
      message: 'Keep only the 10 most recent backups and delete the rest.',
      confirmLabel: 'Cleanup', danger: false,
    });
    if (!ok) return;
    const tid = toast.loading('Cleaning up...');
    try {
      const d = await fetchGraphQL(`mutation { cleanupBackups(keepCount:10) }`);
      toast.success(`Cleaned up. ${d.cleanupBackups} backup(s) removed.`, { id: tid });
      load();
    } catch (e: any) { toast.error(e.message, { id: tid }); }
  };

  return (
    <div className="flex flex-col gap-6">
      {confirmModal}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily:'var(--font-cinzel,Cinzel,serif)', background:'linear-gradient(135deg,#aed581,#558b2f)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Backup Manager
          </h1>
          <p className="text-white/30 text-xs mt-0.5">{backups.length} backup{backups.length !== 1 ? 's' : ''} stored</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCleanup} className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.5)' }}>
            🧹 Cleanup Old
          </button>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider disabled:opacity-50"
            style={{ background:'linear-gradient(135deg,#aed581,#558b2f)', color:'#fff', boxShadow:'0 4px 16px rgba(174,213,129,0.25)' }}
          >
            {creating ? '...' : <>💾 Create Backup Now</>}
          </button>
        </div>
      </div>

      {/* Info box */}
      <div className="rounded-2xl p-4 flex items-start gap-4" style={{ background:'rgba(174,213,129,0.06)', border:'1px solid rgba(174,213,129,0.12)' }}>
        <span className="text-xl shrink-0">ℹ️</span>
        <div className="text-xs text-white/45 space-y-1 leading-relaxed">
          <p>Backups are <strong className="text-white/65">JSON snapshots</strong> of the entire database stored on the server.</p>
          <p><strong className="text-white/65">Restore</strong> will overwrite the current DB — always create a backup before making bulk changes.</p>
          <p>Backups are also created automatically after mutations. Use <strong className="text-white/65">Cleanup</strong> to keep only the 10 most recent.</p>
        </div>
      </div>

      {/* Backup list */}
      <div className="rounded-2xl overflow-hidden" style={{ background:'rgba(8,8,18,0.70)', border:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="grid text-[10px] font-black uppercase tracking-widest text-white/25 px-4 py-2.5" style={{ gridTemplateColumns:'1fr 80px 60px 70px 70px 70px 90px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <span>Filename</span><span>Created</span><span>Size</span><span>Chars</span><span>Weapons</span><span>Arts</span><span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-white/25 text-sm">Loading backups...</div>
        ) : backups.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-4xl mb-3 opacity-30">💾</div>
            <p className="text-white/25 text-sm">No backups yet. Create your first one!</p>
          </div>
        ) : backups.map((b, i) => (
          <div
            key={b.id}
            className="grid items-center px-4 py-3 transition-colors"
            style={{ gridTemplateColumns:'1fr 80px 60px 70px 70px 70px 90px', borderBottom: i === backups.length-1 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div>
              <div className="text-xs font-mono text-white/65 truncate max-w-[220px]">{b.filename}</div>
              <div className="text-[10px] text-white/25">{new Date(b.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-[10px] text-white/40">{timeAgo(b.createdAt)}</div>
            <div className="text-[10px] text-white/40 font-mono">{formatBytes(b.sizeBytes)}</div>
            <div className="text-[10px] font-mono text-amber-400/70">{b.stats.characters}</div>
            <div className="text-[10px] font-mono text-blue-400/70">{b.stats.weapons}</div>
            <div className="text-[10px] font-mono text-purple-400/70">{b.stats.artifacts}</div>
            <div className="flex gap-1.5 justify-end">
              <button
                onClick={() => handleRestore(b)}
                disabled={!!restoring}
                className="px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider disabled:opacity-40"
                style={{ background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.20)', color:'rgba(239,68,68,0.8)' }}
                title="Restore this backup"
              >
                {restoring === b.id ? '...' : '↩ Restore'}
              </button>
              <button onClick={()=>handleDelete(b)} className="px-2 py-1.5 rounded-lg" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.25)' }}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
