export default function StatCard({ label, value, colorClass }: { label: string; value: string | number; colorClass: string }) {
  return (
    <div className="bg-[#0b0b0e] border border-gray-800 p-4 rounded-xl flex flex-col items-center shadow-inner">
      <span className={`${colorClass} font-black text-xl mb-1`}>{value.toLocaleString()}</span>
      <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{label}</span>
    </div>
  );
}
