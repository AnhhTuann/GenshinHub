"use client";

export default function OpenSearchButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="home-search-button"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
    >
      <span className="home-search-icon" aria-hidden="true">⌕</span>
      <span>{label}</span>
      <kbd>Ctrl K</kbd>
    </button>
  );
}
