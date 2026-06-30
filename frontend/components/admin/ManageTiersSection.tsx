"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import { fetchGraphQL, ADD_TIER_RANK, UPDATE_TIER_RANK, DELETE_TIER_RANK, REORDER_TIER_RANKS } from "@/lib/graphql";
import toast from "react-hot-toast";

type TierRank = {
  id: string;
  name: string;
  order: number;
  colorBase: string;
};

const COLOR_OPTIONS = [
  { value: "amber", label: "Amber (SS)", bg: "bg-amber-500" },
  { value: "red", label: "Red (S)", bg: "bg-red-500" },
  { value: "blue", label: "Blue (A)", bg: "bg-blue-500" },
  { value: "gray", label: "Gray (B)", bg: "bg-gray-500" },
  { value: "emerald", label: "Emerald (C)", bg: "bg-emerald-500" },
  { value: "orange", label: "Orange (D)", bg: "bg-orange-500" },
  { value: "purple", label: "Purple", bg: "bg-purple-500" },
  { value: "cyan", label: "Cyan", bg: "bg-cyan-500" },
  { value: "pink", label: "Pink", bg: "bg-pink-500" },
];

export default function ManageTiersSection({
  tierRanks,
  setTierRanks
}: {
  tierRanks: TierRank[];
  setTierRanks: (tiers: TierRank[]) => void;
}) {
  const [newTierName, setNewTierName] = useState("");
  const [newTierColor, setNewTierColor] = useState("amber");
  const [loading, setLoading] = useState(false);

  const handleAddTier = async () => {
    if (!newTierName.trim()) return;
    setLoading(true);
    try {
      const res = await fetchGraphQL(ADD_TIER_RANK, { name: newTierName, colorBase: newTierColor });
      setTierRanks([...tierRanks, res.addTierRank]);
      setNewTierName("");
    } catch (err: any) {
      toast.error(err.message || "Failed to add tier");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTier = async (id: string) => {
    if (!confirm("Are you sure? Characters using this tier will become unranked.")) return;
    setLoading(true);
    try {
      await fetchGraphQL(DELETE_TIER_RANK, { id });
      setTierRanks(tierRanks.filter(t => t.id !== id));
      toast.success("Tier deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete tier");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (newOrder: TierRank[]) => {
    // Optimistic update
    setTierRanks(newOrder);
    try {
      await fetchGraphQL(REORDER_TIER_RANKS, { tierIds: newOrder.map(t => t.id) });
    } catch (err: any) {
      toast.error("Failed to reorder: " + err.message);
    }
  };

  const handleUpdateColor = async (id: string, colorBase: string) => {
    setTierRanks(tierRanks.map(t => t.id === id ? { ...t, colorBase } : t));
    try {
      await fetchGraphQL(UPDATE_TIER_RANK, { id, colorBase });
    } catch (err: any) {
      toast.error("Failed to update color: " + err.message);
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-[3px] h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #a78bfa, #8b5cf6)' }} />
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35">Manage Tiers</h2>
      </div>
      
      {/* Add New Tier */}
      <div className="flex gap-3 mb-6 p-4 rounded-2xl flex-wrap items-end" style={{ background:'rgba(8,8,18,0.7)', border:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <label className="text-[9px] font-bold uppercase tracking-wider text-white/30">New Tier Name</label>
          <input 
            type="text" placeholder="e.g. SSS" value={newTierName} onChange={e => setNewTierName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm outline-none font-bold"
            style={{ background:'rgba(4,4,10,0.8)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.85)' }}
          />
        </div>
        <div className="flex flex-col gap-1.5 w-48 shrink-0">
          <label className="text-[9px] font-bold uppercase tracking-wider text-white/30">Theme Color</label>
          <select 
            value={newTierColor} onChange={e => setNewTierColor(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm outline-none font-bold appearance-none"
            style={{ background:'rgba(4,4,10,0.8)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.85)' }}
          >
            {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <button 
          onClick={handleAddTier} disabled={loading || !newTierName}
          className="px-5 py-2 rounded-xl text-sm font-black uppercase tracking-wide disabled:opacity-40 h-[38px] shrink-0"
          style={{ background:'linear-gradient(135deg, #a78bfa, #8b5cf6)', color:'#fff', boxShadow:'0 4px 12px rgba(139,92,246,0.25)' }}
        >
          Add Tier
        </button>
      </div>

      {/* List of Tiers with Drag & Drop */}
      <div className="space-y-2 rounded-2xl overflow-hidden" style={{ background:'rgba(8,8,18,0.4)', border:'1px solid rgba(255,255,255,0.03)' }}>
        <div className="grid gap-4 px-4 py-2.5 text-[10px] font-black text-white/25 uppercase tracking-widest hidden sm:grid border-b" style={{ gridTemplateColumns: '40px 1fr 1fr 60px', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div>Drag</div>
          <div>Tier Name</div>
          <div>Theme Color</div>
          <div className="text-right">Actions</div>
        </div>

        <Reorder.Group axis="y" values={tierRanks} onReorder={handleReorder} className="w-full">
          {tierRanks.map((tier) => (
            <Reorder.Item 
              key={tier.id} 
              value={tier}
              className="grid gap-4 items-center px-4 py-3 cursor-grab active:cursor-grabbing hover:bg-white/5 transition-colors border-b last:border-b-0"
              style={{ gridTemplateColumns: '40px 1fr 1fr 60px', borderColor: 'rgba(255,255,255,0.04)' }}
            >
              <div className="text-white/20 pl-2 cursor-grab active:cursor-grabbing">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
              </div>
              <div className="font-black text-sm text-white/90">
                {tier.name}
              </div>
              <div>
                <select 
                  value={tier.colorBase} onChange={e => handleUpdateColor(tier.id, e.target.value)}
                  className="px-2 py-1.5 rounded-lg text-xs font-bold outline-none appearance-none w-full"
                  style={{ background:'rgba(4,4,10,0.8)', border:'1px solid rgba(255,255,255,0.07)', color:'rgba(255,255,255,0.7)' }}
                >
                  {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="text-right pr-2">
                <button 
                  onClick={() => handleDeleteTier(tier.id)}
                  className="p-1.5 rounded-lg text-red-400/50 hover:bg-red-400/10 hover:text-red-400 transition-colors"
                  title="Delete Tier"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </Reorder.Item>
          ))}
          {tierRanks.length === 0 && (
            <div className="text-center text-white/30 text-xs py-8 italic">No tiers created yet. Add one above.</div>
          )}
        </Reorder.Group>
      </div>
    </section>
  );
}
