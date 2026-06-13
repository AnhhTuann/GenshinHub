"use client";
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-black mb-4">Dashboard</h1>
      <p className="text-white/60 mb-6">Welcome to the GenshinHub Admin Panel.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Instructions</h3>
          <ul className="list-disc pl-5 text-sm text-white/70 space-y-1">
            <li>Use the sidebar to navigate through entities.</li>
            <li>You must have <strong>Admin Mode ON</strong> to save changes.</li>
            <li>Go to the <strong>Export TS</strong> tab to save database changes permanently to the backend seed files.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
