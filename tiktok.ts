export interface TikTokMetadata {
  title: string;
  author_name: string;
  author_unique_id: string;
  author_url: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  html: string;
  video_url: string;
}

export function isValidTikTokUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validDomains = [
      "tiktok.com",
      "www.tiktok.com",
      "m.tiktok.com",
      "vt.tiktok.com",
      "vm.tiktok.com",
    ];
    return validDomains.some((domain) => parsed.hostname.endsWith(domain));
  } catch {
    return false;
  }
}