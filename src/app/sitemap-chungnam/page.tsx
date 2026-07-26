import { Metadata } from "next";
import Link from "next/link";
import { getFlatRegions } from "@/lib/keyword";
import { services } from "@/data/services";
import { regions } from "@/data/regions";
import Header from "@/components/Header";
import { getJsonLd } from "@/lib/jsonld";
import { Footer, InteractiveCTA } from "@/components/BottomSections";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "충청남도·대전·세종 누수·코킹·방수 서비스 지역 | 레인가드",
  description: "충청남도와 대전·세종의 시·구·읍·면·동별 창틀코킹, 누수 점검, 외벽·옥상·지붕 방수 서비스 페이지를 안내합니다.",
  alternates: {
    canonical: "https://www.cnrainguard.co.kr/sitemap-chungnam"
  },
  openGraph: {
    type: "website",
    title: "충청남도·대전·세종 누수·코킹·방수 서비스 지역 | 레인가드",
    description: "충청남도와 대전·세종의 시·구·읍·면·동별 창틀코킹, 누수 점검, 외벽·옥상·지붕 방수 서비스 페이지를 안내합니다.",
    url: "https://www.cnrainguard.co.kr/sitemap-chungnam",
    images: [
      {
        url: siteConfig.SEARCH_THUMBNAIL_URL,
        secureUrl: siteConfig.SEARCH_THUMBNAIL_URL,
        type: "image/jpeg",
        width: siteConfig.SEARCH_THUMBNAIL_WIDTH,
        height: siteConfig.SEARCH_THUMBNAIL_HEIGHT,
        alt: siteConfig.SEARCH_THUMBNAIL_ALT,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "충청남도·대전·세종 누수·코킹·방수 서비스 지역 | 레인가드",
    description: "충청남도와 대전·세종의 시·구·읍·면·동별 창틀코킹, 누수 점검, 외벽·옥상·지붕 방수 서비스 페이지를 안내합니다.",
    images: [siteConfig.SEARCH_THUMBNAIL_URL],
  }
};

export default function SitemapChungnamPage() {
  const flatRegions = getFlatRegions();
  const jsonLd = getJsonLd("hub");
  
  const canonicalLinks: { key: string; regionName: string; serviceName: string; fullName: string }[] = [];

  flatRegions.forEach(r => {
    services.forEach(s => {
      canonicalLinks.push({
        key: `${r.keywordName}-${s.name}`,
        regionName: r.displayName,
        serviceName: s.name,
        fullName: `${r.fullName} ${s.name}`
      });
    });
  });

  const activeServicesCount = services.length;

  const chungnamFlat = flatRegions.filter(r => r.rootParentName !== "대전" && r.rootParentName !== "세종");
  const daejeonFlat = flatRegions.filter(r => r.rootParentName === "대전");
  const sejongFlat = flatRegions.filter(r => r.rootParentName === "세종");

  const chungnamRegionsData = regions.filter(r => r.name !== "대전" && r.name !== "세종");
  const daejeonRegionData = regions.find(r => r.name === "대전");
  const sejongRegionData = regions.find(r => r.name === "세종");

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      {/* 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-brand-accent tracking-wider uppercase">통합 서비스 지역 안내</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-primary tracking-tight">
              레인가드 충청남도·대전·세종 지역별 서비스
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base">
              충청남도와 대전·세종의 시·구·읍·면·동별 창틀코킹, 누수 점검, 외벽·옥상·지붕 방수 서비스 페이지를 안내합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-zinc-400">충청남도 지역</span>
              <span className="text-lg font-black text-brand-primary">{chungnamFlat.length}개 지역</span>
            </div>
            <div className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-zinc-400">대전광역시 지역</span>
              <span className="text-lg font-black text-brand-primary">{daejeonFlat.length}개 지역</span>
            </div>
            <div className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-zinc-400">세종특별자치시 지역</span>
              <span className="text-lg font-black text-brand-primary">{sejongFlat.length}개 지역</span>
            </div>
            <div className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-zinc-400">전체 동적 링크 수</span>
              <span className="text-lg font-black text-brand-accent">{canonicalLinks.length}개 링크</span>
            </div>
          </div>

          {/* 권역 바로 가기 바 */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
            <span className="block text-xs font-bold text-zinc-400 mb-2 text-center">권역 바로 가기</span>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="#zone-chungnam" className="px-4 py-1.5 bg-zinc-50 hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-700 font-bold rounded-lg border text-xs transition-colors">
                충청남도 (15개 시·군)
              </a>
              <a href="#zone-daejeon" className="px-4 py-1.5 bg-zinc-50 hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-700 font-bold rounded-lg border text-xs transition-colors">
                대전광역시 (5개 자치구)
              </a>
              <a href="#zone-sejong" className="px-4 py-1.5 bg-zinc-50 hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-700 font-bold rounded-lg border text-xs transition-colors">
                세종특별자치시 (읍·면·동)
              </a>
            </div>
          </div>

          {/* 1. 충청남도 섹션 */}
          <div id="zone-chungnam" className="bg-white border border-zinc-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 scroll-mt-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-black text-brand-primary">1. 충청남도 시·군별 서비스 지역</h2>
              <p className="text-xs text-zinc-500 mt-1">충청남도 15개 시·군 및 세부 읍·면·동별 서비스 페이지</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chungnamRegionsData.map((r, rIdx) => {
                const subFlat = chungnamFlat.filter(fr => fr.fullName.startsWith(r.name));

                return (
                  <div key={rIdx} id={`region-${r.name}`} className="space-y-3 scroll-mt-6">
                    <h3 className="text-base font-bold text-brand-accent border-l-4 border-brand-accent pl-2.5">
                      {r.name}
                    </h3>
                    <div className="space-y-4">
                      {subFlat.map((sf, sfIdx) => {
                        const isCheonan = sf.fullName.includes("천안시");
                        const districtPrefix = isCheonan 
                          ? (sf.fullName.includes("동남구") ? "동남구 " : "서북구 ") 
                          : "";

                        return (
                          <div key={sfIdx} className="pl-4 border-l border-zinc-200 space-y-2">
                            <span className="text-xs font-bold text-zinc-700">
                              {districtPrefix}{sf.displayName}
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {services.map((s, sIdx) => (
                                <Link
                                  key={sIdx}
                                  href={`/?k=${sf.keywordName}-${s.name}`}
                                  className="px-2 py-1 bg-zinc-50 hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-600 font-medium rounded text-[11px] border border-zinc-100 transition-colors"
                                >
                                  {s.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. 대전광역시 섹션 */}
          {daejeonRegionData && (
            <div id="zone-daejeon" className="bg-white border border-zinc-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 scroll-mt-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-black text-brand-primary">2. 대전광역시 구별 서비스 지역</h2>
                <p className="text-xs text-zinc-500 mt-1">대전광역시 시 대표 및 5개 자치구, 66개 통합 동별 서비스 페이지</p>
              </div>

              {/* 대전 시 대표 링크 */}
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2">
                <span className="text-xs font-bold text-brand-accent">대전 대표 서비스</span>
                <div className="flex flex-wrap gap-2">
                  {services.map((s, sIdx) => (
                    <Link
                      key={sIdx}
                      href={`/?k=대전-${s.name}`}
                      className="px-2.5 py-1 bg-white hover:bg-brand-accent hover:text-white text-zinc-700 font-semibold rounded text-xs border border-blue-200 transition-colors shadow-sm"
                    >
                      대전 {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {daejeonRegionData.subRegions?.map((dist, distIdx) => {
                  const distFlat = daejeonFlat.filter(fr => fr.parentName === dist.name || fr.name === dist.name);

                  return (
                    <div key={distIdx} id={`region-${dist.name}`} className="space-y-3 scroll-mt-6">
                      <h3 className="text-base font-bold text-brand-accent border-l-4 border-brand-accent pl-2.5">
                        대전광역시 {dist.name}
                      </h3>
                      <div className="space-y-4">
                        {distFlat.map((sf, sfIdx) => (
                          <div key={sfIdx} className="pl-4 border-l border-zinc-200 space-y-2">
                            <span className="text-xs font-bold text-zinc-700">
                              {sf.name}
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {services.map((s, sIdx) => (
                                <Link
                                  key={sIdx}
                                  href={`/?k=${sf.keywordName}-${s.name}`}
                                  className="px-2 py-1 bg-zinc-50 hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-600 font-medium rounded text-[11px] border border-zinc-100 transition-colors"
                                >
                                  {s.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. 세종특별자치시 섹션 */}
          {sejongRegionData && (
            <div id="zone-sejong" className="bg-white border border-zinc-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 scroll-mt-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-black text-brand-primary">3. 세종특별자치시 읍·면·동별 서비스 지역</h2>
                <p className="text-xs text-zinc-500 mt-1">세종특별자치시 시 대표 및 조치원읍, 9개 면, 15개 행정동별 서비스 페이지</p>
              </div>

              {/* 세종 시 대표 링크 */}
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2">
                <span className="text-xs font-bold text-brand-accent">세종 대표 서비스</span>
                <div className="flex flex-wrap gap-2">
                  {services.map((s, sIdx) => (
                    <Link
                      key={sIdx}
                      href={`/?k=세종-${s.name}`}
                      className="px-2.5 py-1 bg-white hover:bg-brand-accent hover:text-white text-zinc-700 font-semibold rounded text-xs border border-blue-200 transition-colors shadow-sm"
                    >
                      세종 {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-brand-accent border-l-4 border-brand-accent pl-2.5">
                  세종 읍·면·동 세부 지역
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {sejongFlat.filter(sf => sf.name !== "세종").map((sf, sfIdx) => (
                    <div key={sfIdx} className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-zinc-800 block">
                        {sf.displayName}
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {services.map((s, sIdx) => (
                          <Link
                            key={sIdx}
                            href={`/?k=${sf.keywordName}-${s.name}`}
                            className="px-2 py-1 bg-white hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-600 font-medium rounded text-[11px] border border-zinc-100 transition-colors"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <InteractiveCTA />
    </div>
  );
}

