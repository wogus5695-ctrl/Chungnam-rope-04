import { MetadataRoute } from "next";
import { getFlatRegions } from "@/lib/keyword";
import { services } from "@/data/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.cnrainguard.co.kr";
  const flatRegions = getFlatRegions();

  // 1. 기본 페이지
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sitemap-chungnam`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // 2. 동적 canonical 랜딩 페이지
  const canonicalLinks: string[] = [];
  flatRegions.forEach((r) => {
    services.forEach((s) => {
      // canonicalKey 예시: "배방읍-창틀코킹"
      canonicalLinks.push(`${baseUrl}/?k=${r.name}-${s.name}`);
    });
  });

  // 중복 배제 안전처리
  const uniqueCanonicalLinks = Array.from(new Set(canonicalLinks));

  const dynamicRoutes = uniqueCanonicalLinks.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...dynamicRoutes];
}
