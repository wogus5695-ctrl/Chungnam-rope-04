import { Metadata } from "next";
import Link from "next/link";
import { getFlatRegions } from "@/lib/keyword";
import { services } from "@/data/services";
import { regions } from "@/data/regions";
import Header from "@/components/Header";
import { getJsonLd } from "@/lib/jsonld";
import { Footer, InteractiveCTA } from "@/components/BottomSections";
import { siteConfig } from "@/config/site";

// 8단계 메타데이터 수정
export const metadata: Metadata = {
  title: "충청남도 지역별 창틀코킹·누수 서비스 | 레인가드",
  description: "레인가드 충청남도 지점의 시·군·읍·면·동별 세부 서비스 안내 링크 허브입니다. 원하시는 지역과 작업명을 선택해 주세요.",
  alternates: {
    canonical: "https://rainguard-chungnam.co.kr/sitemap-chungnam"
  },
  openGraph: {
    type: "website",
    title: "충청남도 지역별 창틀코킹·누수 서비스 | 레인가드",
    description: "레인가드 충청남도 지점의 시·군·읍·면·동별 세부 서비스 안내 링크 허브입니다. 원하시는 지역과 작업명을 선택해 주세요.",
    url: "https://rainguard-chungnam.co.kr/sitemap-chungnam",
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
  }
};

export default function SitemapChungnamPage() {
  const flatRegions = getFlatRegions();
  const jsonLd = getJsonLd("hub");
  
  const canonicalLinks: { key: string; regionName: string; serviceName: string; fullName: string }[] = [];

  flatRegions.forEach(r => {
    services.forEach(s => {
      canonicalLinks.push({
        key: `${r.name}-${s.name}`,
        regionName: r.name,
        serviceName: s.name,
        fullName: `${r.fullName} ${s.name}`
      });
    });
  });



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
            <span className="text-xs font-bold text-brand-accent tracking-wider uppercase">충청남도 출장 안내</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-primary tracking-tight">
              레인가드 충청남도 지역별 누수·창틀코킹 서비스
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base">
              충청남도 시·군과 읍·면·동을 선택해 필요한 누수 및 창틀 서비스를 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-zinc-400">시·군 수</span>
              <span className="text-lg font-black text-brand-primary">충청남도 15개 시·군</span>
            </div>
            <div className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-zinc-400">서비스 가능 지역</span>
              <span className="text-lg font-black text-brand-primary">{flatRegions.length}개 읍·면·동</span>
            </div>
            <div className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-zinc-400">제공 서비스</span>
              <span className="text-lg font-black text-brand-accent">11종 전문 코킹·방수</span>
            </div>
          </div>

          {/* 시·군 빠른 이동 바 */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
            <span className="block text-xs font-bold text-zinc-400 mb-2 text-center">시·군 바로 가기</span>
            <div className="flex flex-wrap justify-center gap-2">
              {regions.map((r, idx) => (
                <a
                  key={idx}
                  href={`#region-${r.name}`}
                  className="px-3 py-1.5 bg-zinc-50 hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-600 font-semibold rounded-lg border text-xs transition-colors"
                >
                  {r.name}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            <h2 className="text-xl font-bold text-brand-primary border-b pb-4">충청남도 세부 행정구역별 탐색</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regions.map((r, rIdx) => {
                const subFlat = flatRegions.filter(fr => fr.fullName.startsWith(r.name));

                return (
                  <div key={rIdx} id={`region-${r.name}`} className="space-y-3 scroll-mt-6">
                    <h3 className="text-lg font-bold text-brand-accent border-l-4 border-brand-accent pl-2.5">
                      {r.name}
                    </h3>
                    
                    {subFlat.length === 0 ? (
                      <p className="text-xs text-zinc-400 font-semibold italic">읍·면·동 데이터 로딩 대기</p>
                    ) : (
                      <div className="space-y-4">
                        {subFlat.map((sf, sfIdx) => {
                          // 구 계층을 가진 시 (천안시)일 경우 구 분류 정보를 텍스트에 부가하여 가독성 강화
                          const isCheonan = sf.fullName.includes("천안시");
                          const districtPrefix = isCheonan 
                            ? (sf.fullName.includes("동남구") ? "동남구 " : "서북구 ") 
                            : "";

                          return (
                            <div key={sfIdx} className="pl-4 border-l border-zinc-200 space-y-2">
                              <span className="text-sm font-bold text-zinc-700">
                                {districtPrefix}{sf.name}
                              </span>
                              <div className="grid grid-cols-2 gap-1.5">
                                {services.map((s, sIdx) => {
                                  const kParam = `${sf.name}-${s.name}`;
                                  return (
                                    <Link
                                      key={sIdx}
                                      href={`/?k=${kParam}`}
                                      className="px-2 py-1.5 bg-zinc-50 hover:bg-brand-accent/5 hover:text-brand-accent text-zinc-500 font-medium rounded text-xs border border-zinc-100 transition-colors"
                                    >
                                      {s.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>


        </div>
      </main>

      <Footer />
      <InteractiveCTA />
    </div>
  );
}
