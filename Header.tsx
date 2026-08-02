import { Video } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 border-b border-cyber-border/40 cyber-glass sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue shadow-neon text-slate-950">
            <Video className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight cyber-gradient-text">
              TikTok Utility
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Fast & Modern Metadata Inspection
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono">
            v1.0 Ready
          </span>
        </div>
      </div>
    </header>
  );
}