"use client";

import { useState } from "react";
import Image from "next/image";
import { TikTokMetadata } from "@/lib/tiktok";
import { ExternalLink, Copy, Share2, Check, User } from "lucide-react";
import EmbedScript from "./EmbedScript";

interface VideoCardProps {
  data: TikTokMetadata;
}

export default function VideoCard({ data }: VideoCardProps) {
  const [copied, setCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.video_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Gagal menyalin URL.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          url: data.video_url,
        });
      } catch (e) {
        console.error("Share failed", e);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto cyber-glass rounded-2xl p-6 space-y-6 shadow-neon border border-cyber-border">
      <EmbedScript />
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative w-full sm:w-48 aspect-[9/16] rounded-xl overflow-hidden border border-cyber-border/50 group bg-slate-900">
          {data.thumbnail_url ? (
            <Image
              src={data.thumbnail_url}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 192px"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              No Preview
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <h2 className="text-lg font-bold text-slate-100 line-clamp-2 leading-snug">
              {data.title}
            </h2>
            <a
              href={data.author_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-cyber-cyan hover:underline mt-2 font-medium"
            >
              <User className="w-4 h-4" />
              @{data.author_unique_id || data.author_name}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <a
              href={data.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-slate-950 font-semibold text-sm hover:shadow-neon transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Open in TikTok
            </a>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-medium text-sm border border-slate-700/60 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 text-sm border border-slate-800 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Bagikan Video
          </button>
        </div>
      </div>

      <div className="border-t border-cyber-border/40 pt-4">
        <button
          onClick={() => setShowEmbed(!showEmbed)}
          className="text-xs font-semibold uppercase tracking-wider text-cyber-cyan hover:text-cyan-300 transition-colors"
        >
          {showEmbed ? "Sembunyikan Official Embed" : "Tampilkan Official Embed TikTok"}
        </button>

        {showEmbed && data.html && (
          <div className="mt-4 flex justify-center overflow-x-auto rounded-xl p-2 bg-slate-950/50">
            <div
              dangerouslySetInnerHTML={{ __html: data.html }}
              className="max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}