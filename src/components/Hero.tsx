import Image from "next/image";
import { siteConfig } from "@/config/site";
import React from "react";

interface HeroProps {
  badge?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  showBulletPoints?: boolean;
  bulletPoints?: string[];
  imageSrc?: string;
}

export default function Hero({ badge, title, subtitle, showBulletPoints = true, bulletPoints, imageSrc }: HeroProps) {
  return (
    <section className="relative hero-gradient overflow-hidden px-5 sm:px-6 lg:px-0 pt-[72px] pb-[60px] sm:py-24 lg:py-0 lg:h-[640px] lg:min-h-[580px] flex items-center border-b border-zinc-100 w-full min-h-auto">
      {imageSrc ? (
        <>
          {/* 메인 Hero 전용 next/image 백그라운드 레이어 */}
          <div className="absolute inset-0 z-0">
            <Image
              src={imageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="object-[82%_center] lg:object-[78%_center]"
            />
            {/* PC/태블릿 오버레이: 좌측 매우 어두움(90%) -> 중앙(65%) -> 우측(30%) 자연스러운 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/92 via-[#0f172a]/65 to-[#0f172a]/30 hidden md:block" />
            
            {/* 모바일 오버레이: 배경을 조금 더 연하게 투과되도록 조율 (기본 45% + 상단/좌측 영역 55% -> 35% 자연스러운 융합) */}
            <div className="absolute inset-0 bg-[#0f172a]/45 md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/55 via-[#0f172a]/35 to-transparent md:hidden" />
          </div>
        </>
      ) : (
        /* 배경 작업 이미지 오버레이 (동적 페이지용 기존 구조 유지) */
        <div 
          className="absolute inset-0 bg-cover bg-right md:bg-right-bottom opacity-15 pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
      )}
      <div className="max-w-7xl mx-auto lg:px-8 relative z-10 w-full">
        <div className="text-left max-w-3xl lg:max-w-[680px] flex flex-col items-start">
          
          {/* 배지 태그 */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 lg:mb-[28px] max-w-full ${imageSrc ? 'bg-white/10 text-white' : 'bg-blue-50 text-brand-accent'}`}>
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${imageSrc ? 'bg-white' : 'bg-brand-accent'}`}></span>
            <span className="truncate whitespace-nowrap">{badge || "충남 전 지역 신속 진단 및 시공"}</span>
          </div>
 
          {/* 메인 H1 타이틀 */}
          <h1 className={`text-[30px] sm:text-[34px] md:text-[40px] lg:text-[46px] xl:text-[52px] font-black leading-[1.2] lg:leading-[1.14] tracking-tight mb-4 sm:mb-6 lg:mb-[26px] ${imageSrc ? 'text-white' : 'text-brand-primary'} keep-all break-keep overflow-wrap break-word`}>
            {title || (
              <>
                충청남도 빗물누수·창틀코킹,<br className="hidden sm:inline" />
                <span className={imageSrc ? 'text-brand-accent' : 'text-brand-accent'}> 전문 {siteConfig.brandName}</span>
              </>
            )}
          </h1>
 
          {/* 보조 설명 문구 */}
          <div className={`text-[15px] sm:text-base lg:text-[19px] leading-relaxed lg:leading-[1.7] font-medium mb-5 sm:mb-6 lg:mb-[24px] max-w-[650px] text-left ${imageSrc ? 'text-zinc-300' : 'text-zinc-600'} keep-all break-keep`}>
            {subtitle || (
              <>
                빗물이 집안으로 스며드는 답답함을 명확히 해결합니다. <br className="hidden md:inline" />
                콘크리트 외벽 균열부터 노후화된 샤시 프레임 사이 틈새까지 정밀한 진단과 맞춤형 코킹 공법으로 완벽히 통제합니다.
              </>
            )}
          </div>
 
          {showBulletPoints && (
            <ul className={`space-y-2 lg:space-y-[12px] text-[14px] sm:text-base font-semibold max-w-full mx-0 mb-6 sm:mb-8 lg:mb-[36px] ${imageSrc ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {(bulletPoints || [
                "외벽·창틀 누수 유입 경로 정밀 점검",
                "노후 실리콘 손상 상태 확인",
                "구조와 원인에 맞는 보수 범위 안내"
              ]).map((text, idx) => (
                <li key={idx} className="flex items-center gap-2 lg:gap-[10px]">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="break-keep">{text}</span>
                </li>
              ))}
            </ul>
          )}
 
          {/* CTA 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-[16px] w-full sm:w-auto">
            <a
              href={`tel:${siteConfig.phonePlaceholder}`}
              className="w-full sm:w-[200px] h-[54px] sm:h-[56px] lg:h-[58px] flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white text-base lg:text-[17px] font-extrabold rounded-xl shadow-lg shadow-brand-accent/20 transition-all text-center"
            >
              전화 문의
            </a>
            <a
              href={siteConfig.kakaoUrlPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[200px] h-[54px] sm:h-[56px] lg:h-[58px] flex items-center justify-center bg-[#fee500] hover:bg-[#fdd835] text-black text-base lg:text-[17px] font-extrabold rounded-xl transition-all text-center"
            >
              카카오톡 문의
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
