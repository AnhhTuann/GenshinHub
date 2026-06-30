"use client";
import { useState } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';

export default function ExportPage() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    const tid = toast.loading('Exporting database to TS files...');
    try {
      await fetchGraphQL(`mutation { exportDatabaseToSeeds }`);
      toast.success('Successfully exported database to TS Seed files!', { id: tid });
    } catch (err: any) {
      toast.error('Error: ' + err.message, { id: tid });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily:'var(--font-cinzel,Cinzel,serif)', background:'linear-gradient(135deg,#ce93d8,#8e24aa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          Export Source Code
        </h1>
        <p className="text-white/30 text-xs mt-0.5">Persist database changes back to the filesystem.</p>
      </div>

      <div className="rounded-2xl p-5 flex flex-col gap-5" style={{ background:'rgba(8,8,18,0.7)', border:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background:'rgba(206,147,216,0.12)', border:'1px solid rgba(206,147,216,0.20)' }}>
            📤
          </div>
          <div>
            <h2 className="text-sm font-bold text-white/90 mb-2">Export DB to TS Seed Files</h2>
            <p className="text-xs text-white/50 leading-relaxed font-medium mb-4">
              Clicking the button below will take the current database (Characters, Weapons, Artifacts, Materials, Tiers) and serialize it back into 
              <code className="bg-white/10 px-1.5 py-0.5 rounded mx-1 text-[11px] font-mono border border-white/5">backend/prisma/seeds/*.ts</code> files.
              This permanently saves any edits you made through the Admin Panel to the codebase, allowing you to safely re-seed or migrate the database in the future.
            </p>
            <button 
              onClick={handleExport}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide disabled:opacity-50"
              style={{ background:'linear-gradient(135deg, #ce93d8, #8e24aa)', color:'#fff', boxShadow:'0 4px 16px rgba(206,147,216,0.25)' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Exporting...
                </>
              ) : "Export DB to TS Files"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
