"use client";

import { Search } from "lucide-react";

export default function OpenSearchButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="home-search-button"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
    >
      <Search className="home-search-icon" size={16} aria-hidden="true" />
      <span>{label}</span>
      <kbd>Ctrl K</kbd>
    </button>
  );
}
