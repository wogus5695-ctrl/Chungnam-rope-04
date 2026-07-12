import { parseKeyword, getFlatRegions } from "@/lib/keyword";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import React from "react";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeakSymptoms from "@/components/LeakSymptoms";
import LeakPath from "@/components/LeakPath";
import { Metadata } from "next";
import { getJsonLd } from "@/lib/jsonld";
import {
  ServiceSection,
  ProcessSection,
  CasesSection,
  WhyUsSection,
  RegionSection,
  FAQSection,
  FinalCTA,
  Footer,
  InteractiveCTA
} from "@/components/BottomSections";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 8단계: 메타데이터 정의
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const k = typeof resolvedSearchParams.k === "string" ? resolvedSearchParams.k : undefined;

  const ogCommon = {
    images: [
      {
        url: siteConfig.SEARCH_THUMBNAIL_URL,
        secureUrl: siteConfig.SEARCH_THUMBNAIL_URL,
        type: "image/jpeg",
        width: siteConfig.SEARCH_THUMBNAIL_WIDTH,
        height: siteConfig.SEARCH_THUMBNAIL_HEIGHT,
        alt: siteConfig.SEARCH_THUMBNAIL_ALT,
      }
    ],
  };

  // 메인 페이지 메타데이터
  if (!k) {
    return {
      title: "충청남도 빗물누수·창틀코킹 전문 | 레인가드",
      description: siteConfig.defaultDescription,
      alternates: {
        canonical: "https://rainguard-chungnam.co.kr"
      },
      openGraph: {
        type: "website",
        title: "충청남도 빗물누수·창틀코킹 전문 | 레인가드",
        description: siteConfig.defaultDescription,
        url: "https://rainguard-chungnam.co.kr",
        ...ogCommon,
      }
    };
  }

  const parsed = parseKeyword(k);
  if (!parsed || parsed.isAlias) {
    return {
      title: "올바르지 않은 요청 | 레인가드",
      robots: "noindex, nofollow"
    };
  }

  const regionName = parsed.region.name;
  const serviceName = parsed.service.name;

  const targetService = services.find(s => s.name === serviceName);
  const customDesc = targetService 
    ? `${regionName} 지역 ${serviceName} 전문 진단. ${targetService.metaDescription}`
    : `${regionName} ${serviceName} 전문 레인가드 충남지점.`;

  const fullUrl = `https://rainguard-chungnam.co.kr/?k=${parsed.canonicalKey}`;

  return {
    title: `${regionName} ${serviceName} | 창틀·외벽 누수 진단 레인가드`,
    description: customDesc,
    alternates: {
      canonical: fullUrl
    },
    openGraph: {
      type: "website",
      title: `${regionName} ${serviceName} | 창틀·외벽 누수 진단 레인가드`,
      description: customDesc,
      url: fullUrl,
      ...ogCommon,
    }
  };
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const k = typeof resolvedSearchParams.k === "string" ? resolvedSearchParams.k : undefined;

  // 1. k 파라미터가 없는 경우: 메인 페이지
  if (!k) {
    const jsonLd = getJsonLd("main");

    return (
      <div className="pb-16 md:pb-0 min-h-screen flex flex-col">
        {/* 구조화 데이터 주입 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <Hero 
          imageSrc={siteConfig.MAIN_HERO_IMAGE} 
          badge="충남 전 지역 빗물누수·창틀코킹 대응" 
          title={
            <>
              충청남도 빗물누수·창틀코킹,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 정확한 진단과 보수, 레인가드</span>
            </>
          }
          subtitle={
            <>
              비가 올 때 반복되는 누수 원인을 외벽 균열, 창틀 틈새, 노후 실리콘 상태까지 함께 점검하고 현장에 맞는 보수 범위를 안내합니다.
            </>
          }
        />
        <main className="flex-grow">
          <LeakSymptoms />
          <LeakPath />
          <ServiceSection />
          <ProcessSection />
          <CasesSection />
          <WhyUsSection />
          <RegionSection />
          <FAQSection />
          <FinalCTA />
        </main>
        <Footer />
        <InteractiveCTA />
      </div>
    );
  }

  // 2. k 파라미터 파싱
  const parsed = parseKeyword(k);

  // 3. 유효하지 않은 키워드인 경우 404 처리
  if (!parsed) {
    notFound();
  }

  // 4. Alias인 경우 Canonical 주소로 308 영구 리디렉션
  if (parsed.isAlias) {
    redirect(`/?k=${parsed.canonicalKey}`);
  }

  // 5. 정상 canonical 키워드인 경우: 동적 랜딩 렌더링
  const regionName = parsed.region.name;
  const serviceName = parsed.service.name;
  const parentRegion = parsed.region.parentName;

  // 세부 정규 콘텐츠 데이터 확보
  const serviceData = services.find(s => s.name === serviceName)!;

  // 구조화 데이터 생성
  const jsonLd = getJsonLd("landing", {
    regionName,
    serviceName,
    canonicalKey: parsed.canonicalKey,
    shortDescription: serviceData.shortDescription
  });

  // 상호 교차 링크 리스트 추출
  const currentFlatRegion = parsed.region;
  const allFlatRegions = getFlatRegions();
  
  // 동일한 시·군(또는 구) 내의 타 읍면동만 필터링 (최대 6개)
  const adjacentRegions = allFlatRegions
    .filter(r => r.name !== regionName && r.rootParentName === currentFlatRegion.rootParentName)
    .slice(0, 6);

  // 현재 서비스를 제외한 5종 서비스 목록
  const relativeServices = services.filter(s => s.name !== serviceName).slice(0, 5);

  return (
    <div className="pb-16 md:pb-0 min-h-screen flex flex-col">
      {/* 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      {/* 2. 동적 Hero 적용 */}
      {(() => {
        // H1 타이틀 작업별 분기 템플릿
        let dynamicTitle = (
          <>
            {regionName} {serviceName},<br className="hidden sm:inline" />
            <span className="text-brand-accent"> 현장 상태부터 정확히 확인</span>
          </>
        );
        if (serviceName === "빗물누수") {
          dynamicTitle = (
            <>
              {regionName} 빗물누수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 원인부터 정확히 진단</span>
            </>
          );
        } else if (serviceName === "창틀누수") {
          dynamicTitle = (
            <>
              {regionName} 창틀누수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 유입 경로부터 꼼꼼히 점검</span>
            </>
          );
        } else if (serviceName === "외벽누수") {
          dynamicTitle = (
            <>
              {regionName} 외벽누수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 균열과 접합부부터 확인</span>
            </>
          );
        } else if (serviceName === "창틀코킹") {
          dynamicTitle = (
            <>
              {regionName} 창틀코킹,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 노후 상태부터 꼼꼼히 확인</span>
            </>
          );
        } else if (serviceName === "창틀실리콘") {
          dynamicTitle = (
            <>
              {regionName} 창틀실리콘,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 갈라짐과 들뜸부터 점검</span>
            </>
          );
        } else if (serviceName === "샷시실리콘") {
          dynamicTitle = (
            <>
              {regionName} 샷시실리콘,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 접합부 상태부터 정확히 확인</span>
            </>
          );
        }

        // 설명문 요약 분기
        let dynamicSubtitle = (
          <>
            기존 실리콘의 갈라짐과 들뜸, 접합부 손상 상태를 확인한 뒤 현장에 맞는 시공 범위를 안내합니다.
          </>
        );
        if (serviceName === "빗물누수") {
          dynamicSubtitle = (
            <>
              비가 올 때 반복되는 누수 원인을 외벽·창틀·실리콘 상태까지 함께 점검하고 필요한 보수 범위를 안내합니다.
            </>
          );
        } else if (serviceName === "창틀누수") {
          dynamicSubtitle = (
            <>
              창틀 상부와 측면, 샷시 틈새와 주변 외벽을 함께 확인하여 실제 물 유입 경로를 점검합니다.
            </>
          );
        } else if (serviceName === "외벽누수") {
          dynamicSubtitle = (
            <>
              외벽 균열과 줄눈, 창호 접합부를 점검하여 빗물이 스며드는 원인과 필요한 보수 범위를 확인합니다.
            </>
          );
        }

        // 체크포인트 3종 분기
        let dynamicBulletPoints = [
          "외벽·창틀 누수 유입 경로 점검",
          "노후 실리콘과 균열 상태 확인",
          "현장에 필요한 보수 범위 안내"
        ];
        if (serviceName === "빗물누수") {
          dynamicBulletPoints = [
            "비바람 방향별 누수 반응 확인",
            "외벽·창틀 누수 유입 경로 점검",
            "必要な 방수·코킹 범위 안내"
          ];
        } else if (serviceName === "창틀누수") {
          dynamicBulletPoints = [
            "창틀 상부·측면 누수 흔적 확인",
            "샷시 틈새와 외벽 접합부 점검",
            "원인에 맞는 보수 범위 안내"
          ];
        } else if (serviceName === "외벽누수") {
          dynamicBulletPoints = [
            "외벽 균열과 줄눈 손상 점검",
            "창호 접합부 주변 유입 흔적 확인",
            "균열 상태에 맞는 보수 방향 안내"
          ];
        } else if (["창틀코킹", "창틀실리콘", "샷시실리콘"].includes(serviceName)) {
          dynamicBulletPoints = [
            "기존 실리콘 갈라짐과 들뜸 확인",
            "창호와 외벽 접합부 상태 점검",
            "제거 및 재시공 필요 범위 안내"
          ];
        }

        return (
          <Hero
            badge={`${regionName} 현장 진단 가능`}
            title={dynamicTitle}
            subtitle={dynamicSubtitle}
            showBulletPoints={true}
            bulletPoints={dynamicBulletPoints}
            imageSrc={siteConfig.MAIN_HERO_IMAGE}
          />
        );
      })()}

      {/* 동적 키워드별 세부 상세 레이아웃 섹션 구성 */}
      <main className="flex-grow bg-white">
        
        {/* 3. 해당 서비스의 대표 증상 카드 (메인과 동일한 카드 UI 공통화) */}
        <LeakSymptoms 
          symptomList={serviceData.symptomObjects} 
          dynamicRegionName={regionName} 
          dynamicServiceName={serviceName} 
        />

        {/* 4. 누수 발생 원인 또는 유입 경로 (메인과 동일한 4단계 경로 UI 공통화) */}
        <LeakPath pathList={serviceData.pathSteps} />

        {/* 5. 점검해야 할 부위 (체크리스트 카드 구조화) */}
        <section className="py-16 sm:py-24 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">정밀 스캔</h2>
              <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">{regionName} {serviceName} 점검 항목</p>
              <p className="text-zinc-500 mt-3 text-sm sm:text-base">
                현장 마모도 상태에 맞추어 시공 범위를 합리적으로 설계하기 위한 주요 4대 체크리스트 부위입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {serviceData.checkPoints.map((cp, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-accent flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-semibold pt-0.5">{cp}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. 관련 서비스 안내 */}
        <ServiceSection activeServiceName={serviceName} regionName={regionName} />

        {/* 7. 진단 및 시공 절차 */}
        <ProcessSection />

        {/* 8. 관련 현장 사례 */}
        <CasesSection customCases={serviceData.caseObjects} />

        {/* 9. 레인가드 선택 이유 */}
        <WhyUsSection />

        {/* 10. 인접 지역 및 관련 서비스 교차 추천 */}
        <section className="py-16 sm:py-24 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 border border-zinc-100 rounded-2xl bg-zinc-50 space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-brand-primary">
                {regionName} 및 {currentFlatRegion.rootParentName} 서비스 바로가기
              </h3>
              <div className="space-y-4">
                {adjacentRegions.length > 0 && (
                  <div>
                    <span className="block text-xs font-bold text-zinc-400 mb-2">{currentFlatRegion.rootParentName}의 다른 서비스 지역 ({serviceName})</span>
                    <div className="flex flex-wrap gap-2">
                      {adjacentRegions.map((ar, idx) => (
                        <Link
                          key={idx}
                          href={`/?k=${ar.name}-${serviceName}`}
                          className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-brand-primary text-xs font-semibold rounded-lg border transition-colors"
                        >
                          {ar.name} {serviceName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="block text-xs font-bold text-zinc-400 mb-2">{regionName}의 다른 누수·코킹 서비스</span>
                  <div className="flex flex-wrap gap-2">
                    {relativeServices.map((rs, idx) => (
                      <Link
                        key={idx}
                        href={`/?k=${regionName}-${rs.name}`}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-brand-primary text-xs font-semibold rounded-lg border transition-colors"
                      >
                        {regionName} {rs.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ 및 12. 최종 상담 CTA */}
        <FAQSection customFaqs={serviceData.faqs} />
        <FinalCTA />

      </main>

      <Footer />
      <InteractiveCTA />
    </div>
  );
}
export const dynamic = "force-dynamic";
