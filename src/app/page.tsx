import { parseKeyword, getFlatRegions, getFAQList, getHeroImageAlt } from "@/lib/keyword";
import { getRegionEnvType, getEnvHeroSubtitle, getEnvCheckPoint, sortRelativeServices } from "@/lib/regionEnv";
import RegionalEnvSection from "@/components/RegionalEnvSection";
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
  WorkCasesSection,
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
        canonical: "https://www.cnrainguard.co.kr"
      },
      openGraph: {
        type: "website",
        title: "충청남도 빗물누수·창틀코킹 전문 | 레인가드",
        description: siteConfig.defaultDescription,
        url: "https://www.cnrainguard.co.kr",
        ...ogCommon,
      },
      twitter: {
        card: "summary_large_image",
        title: "충청남도 빗물누수·창틀코킹 전문 | 레인가드",
        description: siteConfig.defaultDescription,
        images: [siteConfig.SEARCH_THUMBNAIL_URL],
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

  const regionName = parsed.region.displayName;
  const serviceName = parsed.service.name;

  const targetService = services.find(s => s.name === serviceName);
  const customDesc = targetService 
    ? `${regionName} 지역 ${serviceName} 전문 진단. ${targetService.metaDescription}`
    : `${regionName} ${serviceName} 전문 레인가드 충남지점.`;

  const fullUrl = `https://www.cnrainguard.co.kr/?k=${parsed.canonicalKey}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${regionName} ${serviceName} | 창틀·외벽 누수 진단 레인가드`,
      description: customDesc,
      images: [siteConfig.SEARCH_THUMBNAIL_URL],
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
          imageAlt={getHeroImageAlt()}
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
          <WorkCasesSection />
          <ProcessSection />
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
    const params = new URLSearchParams({
      k: parsed.canonicalKey,
    });
    redirect(`/?${params.toString()}`);
  }

  // 5. 정상 canonical 키워드인 경우: 동적 랜딩 렌더링
  const regionName = parsed.region.displayName;
  const serviceName = parsed.service.name;
  // 세부 정규 콘텐츠 데이터 확보
  const serviceData = services.find(s => s.name === serviceName)!;
  // 지역 환경 유형 산출 (상위 시군/구 상속)
  const envType = getRegionEnvType(parsed.region.rootParentName, regionName, parsed.region.parentName);

  // 구조화 데이터 생성 (환경 유형 FAQ #5 반영)
  const faqListForJsonLd = getFAQList(serviceData.faqs, regionName, serviceName, envType);
  const jsonLd = getJsonLd("landing", {
    regionName,
    serviceName,
    canonicalKey: parsed.canonicalKey,
    shortDescription: serviceData.shortDescription,
    faqs: faqListForJsonLd
  } as Parameters<typeof getJsonLd>[1]);

  // 상호 교차 링크 리스트 추출
  const currentFlatRegion = parsed.region;
  const allFlatRegions = getFlatRegions();
  
  // 동일한 시·군(또는 구) 내의 타 읍면동만 필터링 (최대 6개)
  const adjacentRegions = allFlatRegions
    .filter(r => r.keywordName !== currentFlatRegion.keywordName && r.rootParentName === currentFlatRegion.rootParentName)
    .slice(0, 6);

  // 환경 유형에 맞춰 정렬된 관련 서비스 5종 목록
  const relativeServices = sortRelativeServices(services, serviceName, envType);

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

        if (serviceName === "외벽방수") {
          dynamicTitle = (
            <>
              {regionName} 외벽방수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 외벽 균열과 보수 범위 확인</span>
            </>
          );
        } else if (serviceName === "옥상방수") {
          dynamicTitle = (
            <>
              {regionName} 옥상방수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 우레탄 및 방수 범위 진단</span>
            </>
          );
        } else if (serviceName === "건물방수") {
          dynamicTitle = (
            <>
              {regionName} 건물방수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 내외벽 종합 진단 후 시공</span>
            </>
          );
        } else if (serviceName === "지붕방수") {
          dynamicTitle = (
            <>
              {regionName} 지붕방수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 지붕 이음부와 고정부 점검</span>
            </>
          );
        } else if (serviceName === "우레탄방수") {
          dynamicTitle = (
            <>
              {regionName} 우레탄방수,<br className="hidden sm:inline" />
              <span className="text-brand-accent"> 하도·중도·상도 공정 관리</span>
            </>
          );
        }
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

        // 설명문 요약 분기 (최대 2~3줄 간결화)
        let dynamicSubtitle = (
          <>
            비가 올 때 반복된다면 외벽·창틀·접합부를 함께 확인해 실제 유입 가능성이 높은 곳부터 점검합니다.
          </>
        );

        if (serviceName === "외벽방수") {
          dynamicSubtitle = (
            <>
              로프 작업으로 높은 외벽 균열과 창호 테두리를 정밀 확인하고 침투 방수 범위를 점검합니다.
            </>
          );
        } else if (serviceName === "옥상방수") {
          dynamicSubtitle = (
            <>
              옥상 바닥 우레탄 들뜸과 난간 파라펫 콘크리트 균열을 체크해 방수 범위를 안내합니다.
            </>
          );
        } else if (serviceName === "건물방수") {
          dynamicSubtitle = (
            <>
              외벽·옥상·지붕·창틀을 함께 점검해 꼭 필요한 부위에 알맞은 방수 공법을 안내합니다.
            </>
          );
        } else if (serviceName === "지붕방수") {
          dynamicSubtitle = (
            <>
              판넬 지붕 용마루 겹침부와 피스 볼트 틈새를 확인해 지붕 맞춤 보수를 안내합니다.
            </>
          );
        } else if (serviceName === "우레탄방수") {
          dynamicSubtitle = (
            <>
              기존 우레탄 들뜸 상태를 점검하고 하도·중도·상도 3회 공정에 맞춰 시공 범위를 안내합니다.
            </>
          );
        }

        // 체크포인트 2개 권장
        let dynamicBulletPoints = [
          "빗물이 들어오는 위치 확인",
          "필요한 보수 범위 안내"
        ];

        if (serviceName === "외벽방수") {
          dynamicBulletPoints = [
            "외벽 균열 및 창호 테두리 점검",
            "침투 방수 시공 범위 안내"
          ];
        } else if (serviceName === "옥상방수") {
          dynamicBulletPoints = [
            "옥상 바닥 우레탄 들뜸 상태 검사",
            "난간 파라펫 균열 및 보수 범위 안내"
          ];
        } else if (serviceName === "건물방수") {
          dynamicBulletPoints = [
            "외벽·옥상·지붕 다각도 정밀 점검",
            "원인 부위별 맞춤 방수 범위 안내"
          ];
        } else if (serviceName === "지붕방수") {
          dynamicBulletPoints = [
            "판넬 용마루 및 피스 볼트 틈새 점검",
            "지붕 맞춤 보수 범위 안내"
          ];
        } else if (serviceName === "우레탄방수") {
          dynamicBulletPoints = [
            "바닥 우레탄 들뜸 및 함수율 진단",
            "하도·중도·상도 공정 범위 안내"
          ];
        }

        if (serviceName === "빗물누수") {
          dynamicBulletPoints = [
            "빗물이 들어오는 유입 위치 확인",
            "필요한 방수·코킹 범위 안내"
          ];
        } else if (serviceName === "창틀누수") {
          dynamicBulletPoints = [
            "창틀 상부·측면 유입 흔적 점검",
            "샷시 틈새 및 보수 범위 안내"
          ];
        } else if (serviceName === "외벽누수") {
          dynamicBulletPoints = [
            "외벽 균열 및 접합부 점검",
            "균열 상태별 보수 방향 안내"
          ];
        } else if (["창틀코킹", "창틀실리콘", "샷시실리콘"].includes(serviceName)) {
          dynamicBulletPoints = [
            "기존 실리콘 갈라짐·들뜸 확인",
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
            imageAlt={getHeroImageAlt(regionName, serviceName)}
          />
        );
      })()}

      {/* 동적 키워드별 세부 상세 레이아웃 섹션 구성 */}
      <main className="flex-grow bg-white">
        
        {/* 지역 환경 특성 안내 섹션 */}
        <RegionalEnvSection 
          regionName={regionName} 
          serviceName={serviceName} 
          envType={envType} 
        />

        {/* 3. 해당 서비스의 대표 증상 카드 (메인과 동일한 카드 UI 공통화) */}
        <LeakSymptoms 
          dynamicRegionName={regionName} 
          dynamicServiceName={serviceName} 
        />

        {/* 4. 누수 발생 원인 또는 유입 경로 (메인과 동일한 4단계 경로 UI 공통화) */}
        <LeakPath 
          dynamicRegionName={regionName} 
          dynamicServiceName={serviceName} 
        />

        {/* 6. 관련 서비스 안내 및 관련 서비스 */}
        <ServiceSection activeServiceName={serviceName} regionName={regionName} regionKeywordName={parsed.region.keywordName} />

        {/* 7. 실제 작업 사례 */}
        <WorkCasesSection regionName={regionName} serviceName={serviceName} />

        {/* 8. 축소된 작업 진행 과정 */}
        <ProcessSection activeServiceName={serviceName} />

        {/* 10. 인접 지역 및 관련 서비스 교차 추천 */}
        <section className="py-12 sm:py-20 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-5 sm:p-6 border border-zinc-100 rounded-2xl bg-zinc-50 space-y-5">
              <h3 className="text-base sm:text-lg font-bold text-brand-primary">
                {regionName} 및 {currentFlatRegion.rootParentName} 서비스 바로가기
              </h3>
              <div className="space-y-4">
                {adjacentRegions.length > 0 && (
                  <div>
                    <span className="block text-xs font-bold text-zinc-400 mb-2">{currentFlatRegion.rootParentName} 다른 지역</span>
                    <div className="flex flex-wrap gap-2">
                      {adjacentRegions.map((ar, idx) => (
                        <Link
                          key={idx}
                          href={`/?k=${ar.keywordName}-${serviceName}`}
                          className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-brand-primary text-xs font-semibold rounded-lg border transition-colors"
                        >
                          {ar.canonicalName} {serviceName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="block text-xs font-bold text-zinc-400 mb-2">{regionName} 관련 작업</span>
                  <div className="flex flex-wrap gap-2">
                    {relativeServices.map((rs, idx) => (
                      <Link
                        key={idx}
                        href={`/?k=${parsed.region.keywordName}-${rs.name}`}
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
        <FAQSection 
          customFaqs={faqListForJsonLd} 
          dynamicRegionName={regionName} 
          dynamicServiceName={serviceName} 
        />
        <FinalCTA activeServiceName={serviceName} regionName={regionName} />

      </main>

      <Footer />
      <InteractiveCTA />
    </div>
  );
}
export const dynamic = "force-dynamic";
