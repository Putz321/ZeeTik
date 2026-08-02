import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tiktok-utility.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0a0f1d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TikTok Video Utility - Modern & Fast Metadata Viewer",
    template: "%s | TikTok Video Utility",
  },
  description: "Alat bantu modern untuk melihat thumbnail, metadata, dan embed video TikTok secara cepat dan aman.",
  keywords: ["TikTok", "TikTok Viewer", "TikTok Metadata", "TikTok Embed", "Video Utility"],
  authors: [{ name: "TikTok Utility Team" }],
  openGraph: {
    title: "TikTok Video Utility - Modern & Fast Metadata Viewer",
    description: "Lihat rincian metadata dan embed resmi video TikTok dalam satu tempat.",
    url: baseUrl,
    siteName: "TikTok Video Utility",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "TikTok Video Utility",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Video Utility",
    description: "Lihat rincian metadata dan embed resmi video TikTok.",
    images: [`${baseUrl}/og-image.jpg`],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`dark ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-[#0a0f1d] text-slate-100">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,242,254,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}