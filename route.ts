import { NextRequest, NextResponse } from "next/server";
import { isValidTikTokUrl, TikTokMetadata } from "@/lib/tiktok";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "URL parameter wajib diisi." },
      { status: 400 }
    );
  }

  if (!isValidTikTokUrl(targetUrl)) {
    return NextResponse.json(
      { error: "URL TikTok tidak valid. Pastikan format link benar." },
      { status: 400 }
    );
  }

  try {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(
      targetUrl
    )}`;
    
    const response = await fetch(oembedUrl, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Video tidak ditemukan atau disetel ke pribadi." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Gagal mengambil data dari TikTok." },
        { status: response.status }
      );
    }

    const data = await response.json();

    const metadata: TikTokMetadata = {
      title: data.title || "TikTok Video",
      author_name: data.author_name || "Unknown Author",
      author_unique_id: data.author_unique_id || "",
      author_url: data.author_url || "https://www.tiktok.com",
      thumbnail_url: data.thumbnail_url || "",
      thumbnail_width: data.thumbnail_width || 720,
      thumbnail_height: data.thumbnail_height || 1280,
      html: data.html || "",
      video_url: targetUrl,
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}