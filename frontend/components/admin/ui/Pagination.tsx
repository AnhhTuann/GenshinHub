"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ page, totalPages, onChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const btn = (label: React.ReactNode, target: number, disabled = false, active = false) => (
    <button
      key={String(label) + target}
      onClick={() => !disabled && onChange(target)}
      disabled={disabled}
      className="min-w-[32px] h-8 px-2 rounded-lg text-xs font-bold transition-all"
      style={{
        background: active ? 'linear-gradient(135deg, rgba(200,168,75,0.25), rgba(200,168,75,0.12))' : 'rgba(255,255,255,0.04)',
        border: active ? '1px solid rgba(200,168,75,0.35)' : '1px solid rgba(255,255,255,0.06)',
        color: active ? '#f0d080' : disabled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.55)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: active ? '0 0 12px rgba(200,168,75,0.15)' : 'none',
      }}
    >
      {label}
    </button>
  );

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {btn('←', page - 1, page <= 1)}
      {pages.map((p, i) =>
        p === '...'
          ? <span key={`dot-${i}`} className="text-white/20 text-xs px-1">···</span>
          : btn(p, p as number, false, p === page)
      )}
      {btn('→', page + 1, page >= totalPages)}
    </div>
  );
}
