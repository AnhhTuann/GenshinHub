export default function StatCard({ label, value, colorClass }: { label: string; value: string | number; colorClass: string }) {
  return (
    <div className="bg-[#171410] border border-gray-800 p-4 rounded-xl flex flex-col items-center shadow-inner">
      <span className={`${colorClass} font-black text-xl mb-1`}>{value.toLocaleString()}</span>
      <span className="text-[var(--text-secondary)] text-xs uppercase font-bold tracking-wider">{label}</span>
    </div>
  );
}
