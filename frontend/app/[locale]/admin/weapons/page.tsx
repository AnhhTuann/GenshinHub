"use client";
import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';

export default function WeaponsAdmin() {
  const [weapons, setWeapons] = useState<any[]>([]);
  const [editingWeapon, setEditingWeapon] = useState<any | null>(null);
  const [jsonStr, setJsonStr] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchGraphQL(`query { weapons { id nameEn nameVi rarity type } }`);
      setWeapons(data.weapons);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleEdit = async (id: string) => {
    try {
      const data = await fetchGraphQL(`query { weapon(id: "${id}") { id nameEn nameVi rarity type baseAtk subStat subStatValue passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl } }`);
      setEditingWeapon(data.weapon);
      setJsonStr(JSON.stringify(data.weapon, null, 2));
    } catch(err) {
      alert("Error loading weapon");
    }
  };

  const handleNew = () => {
    const template = {
      id: "new-weapon", nameEn: "New Weapon", nameVi: "Vũ Khí Mới", rarity: 5, type: "Sword", 
      baseAtk: 608, subStat: "CRIT DMG", subStatValue: 66.2, iconUrl: ""
    };
    setEditingWeapon(template);
    setJsonStr(JSON.stringify(template, null, 2));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const stripTypename = (obj: any): any => {
        if (Array.isArray(obj)) return obj.map(stripTypename);
        if (obj !== null && typeof obj === 'object') {
          const { __typename, ...rest } = obj;
          const newObj: any = {};
          for (const key in rest) newObj[key] = stripTypename(rest[key]);
          return newObj;
        }
        return obj;
      };
      const parsed = stripTypename(JSON.parse(jsonStr));
      await fetchGraphQL(`mutation Upsert($input: WeaponInput!) { upsertWeapon(input: $input) { id } }`, { input: parsed });
      alert("Saved successfully!");
      setEditingWeapon(null);
      loadData();
    } catch (err: any) { alert("Error: " + err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      await fetchGraphQL(`mutation { deleteWeapon(id: "${id}") }`);
      loadData();
    } catch (err: any) { alert("Error: " + err.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">Manage Weapons</h1>
        <button onClick={handleNew} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm">+ Add New</button>
      </div>

      {editingWeapon ? (
        <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-6">
          <h2 className="text-lg font-bold mb-2">Edit Weapon (JSON)</h2>
          <textarea value={jsonStr} onChange={e => setJsonStr(e.target.value)} className="w-full h-96 bg-[#06060a] text-green-400 font-mono text-sm p-4 rounded outline-none border border-white/10 mb-4" />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="bg-blue-600 px-6 py-2 rounded font-bold">Save</button>
            <button onClick={() => setEditingWeapon(null)} className="bg-white/10 px-6 py-2 rounded font-bold">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {weapons.map(w => (
            <div key={w.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
              <div><div className="font-bold">{w.nameEn}</div><div className="text-xs text-white/50">{w.id}</div></div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(w.id)} className="text-blue-400 hover:text-blue-300">Edit</button>
                <button onClick={() => handleDelete(w.id)} className="text-red-400 hover:text-red-300">Del</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
