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
    <section className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Manage Tiers</h2>
      
      {/* Add New Tier */}
      <div className="flex gap-4 mb-8 bg-black/30 p-4 rounded-lg border border-white/5 flex-wrap">
        <input 
          type="text" 
          placeholder="New Tier Name (e.g. SSS)" 
          value={newTierName}
          onChange={e => setNewTierName(e.target.value)}
          className="bg-black/50 border border-white/20 rounded px-3 py-2 flex-1 min-w-[200px]"
        />
        <select 
          value={newTierColor}
          onChange={e => setNewTierColor(e.target.value)}
          className="bg-black/50 border border-white/20 rounded px-3 py-2 w-48"
        >
          {COLOR_OPTIONS.map(c => (
            <option key={c.value} value={c.value} className="bg-[#0d0d14]">
              {c.label}
            </option>
          ))}
        </select>
        <button 
          onClick={handleAddTier}
          disabled={loading || !newTierName}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-2 rounded disabled:opacity-50 transition-colors"
        >
          Add Tier
        </button>
      </div>

      {/* List of Tiers with Drag & Drop */}
      <div className="space-y-2">
        <div className="grid grid-cols-[3rem_1fr_1fr_4rem] gap-4 px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:grid">
          <div>Drag</div>
          <div>Tier Name</div>
          <div>Theme Color</div>
          <div className="text-right">Actions</div>
        </div>

        <Reorder.Group axis="y" values={tierRanks} onReorder={handleReorder} className="space-y-2">
          {tierRanks.map((tier) => (
            <Reorder.Item 
              key={tier.id} 
              value={tier}
              className="grid grid-cols-[3rem_1fr_1fr_4rem] gap-4 items-center bg-[#0d0d14] border border-white/10 p-3 rounded-lg cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors"
            >
              <div className="text-gray-500 pl-2 cursor-grab active:cursor-grabbing">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
              </div>
              <div className="font-black text-lg text-white">
                {tier.name}
              </div>
              <div>
                <select 
                  value={tier.colorBase}
                  onChange={e => handleUpdateColor(tier.id, e.target.value)}
                  className="bg-black/50 border border-white/10 rounded px-2 py-1 text-sm text-gray-300 w-full"
                >
                  {COLOR_OPTIONS.map(c => (
                    <option key={c.value} value={c.value} className="bg-[#0d0d14]">{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="text-right pr-2">
                <button 
                  onClick={() => handleDeleteTier(tier.id)}
                  className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                  title="Delete Tier"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </Reorder.Item>
          ))}
          {tierRanks.length === 0 && (
            <div className="text-center text-gray-500 py-8 italic">No tiers created yet. Add one above.</div>
          )}
        </Reorder.Group>
      </div>
    </section>
  );
}
