"use client";
import { useState } from 'react';
import { fetchGraphQL } from '@/lib/graphql';

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setResult(null);
    try {
      await fetchGraphQL(`
        mutation ExportData {
          exportDatabaseToSeeds
        }
      `);
      setResult('✅ Successfully exported database to TS Seed files!');
    } catch (err: any) {
      setResult('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black mb-4">Export to Source Code</h1>
      <p className="text-white/60 mb-6 text-sm">
        Clicking the button below will take the current Character database and serialize it back into 
        <code className="bg-white/10 px-1 py-0.5 rounded mx-1">backend/prisma/seeds/characters/*.ts</code> files.
        This permanently saves any edits you made through the Admin Panel to the codebase.
      </p>

      <button 
        onClick={handleExport}
        disabled={loading}
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
      >
        {loading ? 'Exporting...' : 'Export DB to TS Files'}
      </button>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-black/50 border border-white/10 text-sm font-bold">
          {result}
        </div>
      )}
    </div>
  );
}
