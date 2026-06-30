"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/graphql';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { useConfirm } from '@/components/admin/ui/ConfirmModal';
import Pagination from '@/components/admin/ui/Pagination';

const CharacterFormModal = dynamic(() => import('./CharacterFormModal'), { ssr: false });

const ELEM_COLOR: Record<string, string> = {
  Pyro:'#ff6b4a', Hydro:'#4fc3f7', Cryo:'#80deea',
  Electro:'#ce93d8', Anemo:'#4db6ac', Geo:'#ffd54f', Dendro:'#aed581',
};
const ELEMENTS = ['Pyro','Hydro','Anemo','Electro','Dendro','Cryo','Geo'];

interface CharRow { id: string; nameEn: string; nameVi: string; element: string; rarity: number; weapon: string; tier: string | null; avatarUrl: string; }

const PER_PAGE = 20;

export default function CharactersAdmin() {
  const [all,         setAll]         = useState<CharRow[]>([]);
  const [search,      setSearch]      = useState('');
  const [elemFilter,  setElemFilter]  = useState('');
  const [rarFilter,   setRarFilter]   = useState<number | 0>(0);
  const [page,        setPage]        = useState(1);
  const [loading,     setLoading]     = useState(true);
  const [editingId,   setEditingId]   = useState<string | null>(null);
  const [modalOpen,   setModalOpen]   = useState(false);
  const { confirm, modal: confirmModal } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetchGraphQL(`query { characters { id nameEn nameVi element rarity weapon tier avatarUrl } }`);
      setAll(d.characters ?? []);
    } catch (e: any) {
      toast.error('Failed to load characters: ' + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Filter + paginate client-side (fast enough for ~100 chars)
  const filtered = all.filter(c => {
    const name = c.nameEn.toLowerCase();
    return (
      (!search      || name.includes(search.toLowerCase())) &&
      (!elemFilter  || c.element === elemFilter) &&
      (!rarFilter   || c.rarity  === rarFilter)
    );
  });
  const totalPages  = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({
      title: 'Delete Character',
      message: `Delete "${name}"? This will permanently remove all their data including builds, teams, and weapon recommendations.`,
      confirmLabel: 'Delete',
      danger: true,
      requireTyping: true,
    });
    if (!ok) return;
    try {
      await fetchGraphQL(`mutation { deleteCharacter(id: "${id}") }`);
      toast.success(`${name} deleted.`);
      load();
    } catch (e: any) {
      toast.error('Delete failed: ' + e.message);
    }
  };

  const handleEdit = (id: string) => { setEditingId(id); setModalOpen(true); };
  const handleNew  = ()           => { setEditingId(null); setModalOpen(true); };
  const handleSaved = () => { setModalOpen(false); setEditingId(null); load(); };

  // Reset page on filter change
  useEffect(() => setPage(1), [search, elemFilter, rarFilter]);

  return (
    <div className="flex flex-col gap-5">
      {confirmModal}

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-xl font-black uppercase tracking-wide"
            style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              background: 'linear-gradient(135deg, #f0d080, #c8a84b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            Characters
          </h1>
          <p className="text-white/30 text-xs mt-0.5">
            {loading ? 'Loading...' : `${filtered.length} of ${all.length} characters`}
          </p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #f0d080, #c8a84b)',
            color: '#080812',
            boxShadow: '0 4px 16px rgba(200,168,75,0.30)',
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          Add Character
        </button>
      </div>

      {/* Filter bar */}
      <div
        className="flex gap-2 flex-wrap p-3.5 rounded-2xl"
        style={{ background: 'rgba(8,8,18,0.80)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text" placeholder="Search by name..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl text-xs font-medium outline-none"
            style={{ background: 'rgba(4,4,10,0.8)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.85)' }}
          />
        </div>

        {/* Element filter */}
        <select
          value={elemFilter} onChange={e => setElemFilter(e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-bold outline-none"
          style={{ background: 'rgba(4,4,10,0.8)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}
        >
          <option value="">All Elements</option>
          {ELEMENTS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>

        {/* Rarity filter */}
        <select
          value={rarFilter} onChange={e => setRarFilter(Number(e.target.value))}
          className="px-3 py-2 rounded-xl text-xs font-bold outline-none"
          style={{ background: 'rgba(4,4,10,0.8)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}
        >
          <option value={0}>All Rarities</option>
          <option value={5}>⭐⭐⭐⭐⭐ 5-Star</option>
          <option value={4}>⭐⭐⭐⭐ 4-Star</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(8,8,18,0.70)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Table header */}
        <div
          className="grid items-center text-[10px] font-black uppercase tracking-widest text-white/25 px-4 py-2.5"
          style={{ gridTemplateColumns: '40px 1fr 100px 80px 90px 80px 90px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span />
          <span>Name</span>
          <span>Element</span>
          <span>Rarity</span>
          <span>Weapon</span>
          <span>Tier</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="py-16 text-center text-white/25 text-sm">
            <div className="inline-block w-6 h-6 border-2 border-white/10 border-t-amber-400/60 rounded-full animate-spin mb-3" />
            <p>Loading characters...</p>
          </div>
        ) : pageItems.length === 0 ? (
          <div className="py-16 text-center text-white/25 text-sm">No characters match your filters.</div>
        ) : (
          pageItems.map((c, i) => {
            const ec = ELEM_COLOR[c.element] ?? '#c8a84b';
            const isLast = i === pageItems.length - 1;
            return (
              <div
                key={c.id}
                className="grid items-center px-4 py-2.5 transition-colors group"
                style={{
                  gridTemplateColumns: '40px 1fr 100px 80px 90px 80px 90px',
                  borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Avatar */}
                <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0"
                  style={{ border: `1px solid ${ec}30` }}>
                  {c.avatarUrl && (
                    <Image src={c.avatarUrl} alt={c.nameEn} fill className="object-cover object-top" sizes="32px" />
                  )}
                </div>

                {/* Name */}
                <div>
                  <div className="text-sm font-bold text-white/85">{c.nameEn}</div>
                  <div className="text-[10px] text-white/25 font-mono">{c.id}</div>
                </div>

                {/* Element */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ec, boxShadow: `0 0 4px ${ec}` }} />
                  <span className="text-xs font-medium" style={{ color: ec }}>{c.element}</span>
                </div>

                {/* Rarity */}
                <div className="text-xs font-bold" style={{ color: c.rarity === 5 ? '#ffd54f' : '#ce93d8' }}>
                  {'★'.repeat(c.rarity)}
                </div>

                {/* Weapon */}
                <div className="text-xs text-white/40 font-medium">{c.weapon}</div>

                {/* Tier */}
                <div>
                  {c.tier ? (
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] font-black"
                      style={{
                        background: c.tier === 'SS' ? 'rgba(255,107,74,0.15)' : c.tier === 'S' ? 'rgba(255,213,79,0.12)' : 'rgba(255,255,255,0.06)',
                        color: c.tier === 'SS' ? '#ff6b4a' : c.tier === 'S' ? '#ffd54f' : 'rgba(255,255,255,0.45)',
                        border: `1px solid ${c.tier === 'SS' ? 'rgba(255,107,74,0.25)' : c.tier === 'S' ? 'rgba(255,213,79,0.20)' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >{c.tier}</span>
                  ) : <span className="text-white/15 text-xs">—</span>}
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 justify-end">
                  <button
                    onClick={() => handleEdit(c.id)}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all"
                    style={{ background: 'rgba(79,195,247,0.10)', border: '1px solid rgba(79,195,247,0.20)', color: '#4fc3f7' }}
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.nameEn)}
                    className="px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: 'rgba(239,68,68,0.7)' }}
                    title="Delete"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1">
        <span className="text-white/25 text-xs">
          Showing {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
        </span>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      {/* Character Form Modal */}
      <CharacterFormModal
        open={modalOpen}
        characterId={editingId}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
      />
    </div>
  );
}
