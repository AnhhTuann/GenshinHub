"use client";
import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';

export default function ArtifactsAdmin() {
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [editingArtifact, setEditingArtifact] = useState<any | null>(null);
  const [jsonStr, setJsonStr] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchGraphQL(`query { artifacts { id nameEn nameVi rarityList } }`);
      setArtifacts(data.artifacts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleEdit = async (id: string) => {
    try {
      const data = await fetchGraphQL(`query { artifactSet(id: "${id}") { id nameEn nameVi rarityList piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl } }`);
      setEditingArtifact(data.artifactSet);
      setJsonStr(JSON.stringify(data.artifactSet, null, 2));
    } catch(err) {
      alert("Error loading artifact");
    }
  };

  const handleNew = () => {
    const template = {
      id: "new-artifact", nameEn: "New Set", nameVi: "Bộ Mới", rarityList: [4, 5], 
      piece2DescEn: "", piece2DescVi: "", piece4DescEn: "", piece4DescVi: "", iconUrl: ""
    };
    setEditingArtifact(template);
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
      await fetchGraphQL(`mutation Upsert($input: ArtifactSetInput!) { upsertArtifactSet(input: $input) { id } }`, { input: parsed });
      alert("Saved successfully!");
      setEditingArtifact(null);
      loadData();
    } catch (err: any) { alert("Error: " + err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      await fetchGraphQL(`mutation { deleteArtifactSet(id: "${id}") }`);
      loadData();
    } catch (err: any) { alert("Error: " + err.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">Manage Artifacts</h1>
        <button onClick={handleNew} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm">+ Add New</button>
      </div>

      {editingArtifact ? (
        <div className="bg-black/50 p-4 rounded-xl border border-white/10 mb-6">
          <h2 className="text-lg font-bold mb-2">Edit Artifact Set (JSON)</h2>
          <textarea value={jsonStr} onChange={e => setJsonStr(e.target.value)} className="w-full h-96 bg-[#06060a] text-green-400 font-mono text-sm p-4 rounded outline-none border border-white/10 mb-4" />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="bg-blue-600 px-6 py-2 rounded font-bold">Save</button>
            <button onClick={() => setEditingArtifact(null)} className="bg-white/10 px-6 py-2 rounded font-bold">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artifacts.map(a => (
            <div key={a.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
              <div><div className="font-bold">{a.nameEn}</div><div className="text-xs text-white/50">{a.id}</div></div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(a.id)} className="text-blue-400 hover:text-blue-300">Edit</button>
                <button onClick={() => handleDelete(a.id)} className="text-red-400 hover:text-red-300">Del</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
