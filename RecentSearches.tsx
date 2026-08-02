"use client";

import { History, Trash2 } from "lucide-react";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (url: string) => void;
  onClear: () => void;
}

export default function RecentSearches({
  searches,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3 pt-4">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-medium">
          <History className="w-3.5 h-3.5 text-cyber-cyan" />
          Pencarian Terakhir
        </span>
        <button
          onClick={onClear}
          className="hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Hapus
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((url, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(url)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-cyber-border/30 text-slate-300 max-w-[240px] truncate transition-all text-left"
            title={url}
          >
            {url}
          </button>
        ))}
      </div>
    </div>
  );
}