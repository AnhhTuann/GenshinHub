"use client";
import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';

export default function CharactersAdmin() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [editingChar, setEditingChar] = useState<any | null>(null);
  const [jsonStr, setJsonStr] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchGraphQL(`
        query {
          characters {
            id nameEn nameVi element rarity avatarUrl weapon region
          }
        }
      `);
      setCharacters(data.characters);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = async (id: string) => {
    try {
      const data = await fetchGraphQL(`
        query { 
          character(id: "${id}") { 
            id nameEn nameVi titleEn titleVi rarity element weapon region avatarUrl splashArtUrl descriptionEn descriptionVi baseHp baseAtk baseDef talentPriority bestTeams
            bestWeapons { id nameEn nameVi rank isF2P iconUrl subStat passiveDescEn passiveDescVi refinement rarity }
            bestArtifacts { setNameEn setNameVi pieces sands goblet circlet subStatsPriority rarity iconUrl artifactSetId }
          } 
        }
      `);
      setEditingChar(data.character);
      setJsonStr(JSON.stringify(data.character, null, 2));
    } catch(err) {
      alert("Error loading character");
    }
  };

  const handleNew = () => {
    const template = {
      id: "new-character", nameEn: "New", nameVi: "Mới", titleEn: "", titleVi: "", 
      rarity: 5, element: "Pyro", weapon: "Polearm", region: "Liyue", 
      avatarUrl: "", splashArtUrl: "", descriptionEn: "", descriptionVi: "",
      baseHp: 10000, baseAtk: 300, baseDef: 700
    };
    setEditingChar(template);
    setJsonStr(JSON.stringify(template, null, 2));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const stripTypename = (obj: any): any => {
        if (Array.isArray(obj)) return obj.map(stripTypename);
        if (obj !== null && typeof obj === 'object') {
          const { __typename, id: childId, ...rest } = obj; 
          // Note: we remove id from nested weapons/artifacts because it's a relation ID, not needed for input.
          // Wait, 'id' is used in the main character obj, but the nested ones shouldn't have 'id' if the input doesn't define it.
          const newObj: any = {};
          for (const key in rest) newObj[key] = stripTypename(rest[key]);
          return newObj;
        }
        return obj;
      };

      const parsed = JSON.parse(jsonStr);
      const cleanInput = stripTypename(parsed);
      cleanInput.id = parsed.id; // Keep main ID

      await fetchGraphQL(`
        mutation Upsert($input: CharacterInput!) {
          upsertCharacter(input: $input) { id }
        }
      `, { input: cleanInput });
      
      alert("Saved successfully!");
      setEditingChar(null);
      loadData();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      await fetchGraphQL(`mutation { deleteCharacter(id: "${id}") }`);
      loadData();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">Manage Characters</h1>
        <button onClick={handleNew} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm">
          + Add New
        </button>
      </div>

      {editingChar ? (
        <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-6">
          <h2 className="text-lg font-bold mb-2">Edit Character (JSON)</h2>
          <textarea 
            value={jsonStr}
            onChange={e => setJsonStr(e.target.value)}
            className="w-full h-96 bg-[#06060a] text-green-400 font-mono text-sm p-4 rounded outline-none border border-white/10 mb-4"
          />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="bg-blue-600 px-6 py-2 rounded font-bold">Save</button>
            <button onClick={() => setEditingChar(null)} className="bg-white/10 px-6 py-2 rounded font-bold">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {characters.map(c => (
            <div key={c.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold">{c.nameEn}</div>
                <div className="text-xs text-white/50">{c.id}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(c.id)} className="text-blue-400 hover:text-blue-300">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300">Del</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
