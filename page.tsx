"use client";

import { useState, useEffect, FormEvent } from "react";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import SkeletonCard from "@/components/SkeletonCard";
import RecentSearches from "@/components/RecentSearches";
import { TikTokMetadata } from "@/lib/tiktok";
import { Search, Sparkles, AlertCircle } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TikTokMetadata | null>(null);
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tiktok_recent_searches");
    if (saved) {
      try {
        setRecents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recents", e);
      }
    }
  }, []);

  const saveToRecents = (newUrl: string) => {
    const updated = [newUrl, ...recents.filter((u) => u !== newUrl)].slice(0, 5);
    setRecents(updated);
    localStorage.setItem("tiktok_recent_searches", JSON.stringify(updated));
  };

  const fetchTikTok = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/tiktok?url=${encodeURIComponent(targetUrl)}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal memproses URL TikTok.");
      }

      setData(result);
      saveToRecents(targetUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan tidak terduga.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchTikTok(url);
  };

  const handleClearRecents = () => {
    setRecents([]);
    localStorage.removeItem("tiktok_recent_searches");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12 space-y-10">
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Vercel Ready & Official API
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Inspect TikTok Videos <br />
            <span className="cyber-gradient-text">Instantly & Securely</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Tempelkan URL video TikTok untuk mendapatkan rincian thumbnail, judul, pembuat, serta embed resmi.
          </p>
        </section>

        <section className="max-w-2xl mx-auto w-full space-y-4">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@user/video/..."
              className="w-full pl-4 pr-32 py-4 rounded-2xl cyber-glass border border-cyber-border/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-slate-950 font-semibold text-sm hover:shadow-neon disabled:opacity-50 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {loading ? "Proses..." : "Inspect"}
            </button>
          </form>

          <RecentSearches
            searches={recents}
            onSelect={(selectedUrl) => {
              setUrl(selectedUrl);
              fetchTikTok(selectedUrl);
            }}
            onClear={handleClearRecents}
          />
        </section>

        <section className="w-full">
          {loading && <SkeletonCard />}

          {error && (
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {data && !loading && <VideoCard data={data} />}
        </section>
      </main>

      <footer className="py-6 border-t border-cyber-border/20 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} TikTok Video Utility. Built with Next.js 15 & Tailwind CSS.
      </footer>
    </div>
  );
}