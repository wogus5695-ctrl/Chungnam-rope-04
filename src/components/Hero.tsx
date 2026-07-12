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
    <section className="relative hero-gradient overflow-hidden py-16 sm:py-24 md:py-32 border-b border-zinc-100 min-h-[480px]">
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
              className="object-[68%_center] md:object-[72%_center]"
            />
            {/* 왼쪽에서 오른쪽으로 옅어지는 브랜드 다크블루(#0f172a) 그라데이션 오버레이 */}
            {/* 데스크톱은 글자 영역만 투명하게 지탱하고, 모바일에서는 조금 더 강한 불투명 레이어로 텍스트 가독성을 완전 수호 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/96 via-[#0f172a]/80 md:via-[#0f172a]/60 to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/96 via-[#0f172a]/90 to-[#0f172a]/40 md:hidden" />
          </div>
        </>
      ) : (
        /* 배경 작업 이미지 오버레이 (동적 페이지용 기존 구조 유지) */
        <div 
          className="absolute inset-0 bg-cover bg-right md:bg-right-bottom opacity-15 pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:text-left max-w-3xl space-y-6 sm:space-y-8">
          
          {/* 배지 태그 */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${imageSrc ? 'bg-white/10 text-white' : 'bg-blue-50 text-brand-accent'}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${imageSrc ? 'bg-white' : 'bg-brand-accent'}`}></span>
            {badge || "충남 전 지역 신속 진단 및 시공"}
          </div>

          {/* 메인 H1 타이틀 */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight sm:leading-none tracking-tight ${imageSrc ? 'text-white' : 'text-brand-primary'}`}>
            {title || (
              <>
                충청남도 빗물누수·창틀코킹<br className="hidden sm:inline" />
                <span className={imageSrc ? 'text-brand-accent' : 'text-brand-accent'}> 전문 {siteConfig.brandName}</span>
              </>
            )}
          </h1>

          {/* 보조 설명 문구 */}
          <div className={`text-base sm:text-lg md:text-xl leading-relaxed font-medium ${imageSrc ? 'text-zinc-300' : 'text-zinc-600'}`}>
            {subtitle || (
              <>
                빗물이 집안으로 스며드는 답답함을 명확히 해결합니다. <br className="hidden md:inline" />
                콘크리트 외벽 균열부터 노후화된 샤시 프레임 사이 틈새까지 정밀한 진단과 맞춤형 코킹 공법으로 완벽히 통제합니다.
              </>
            )}
          </div>

          {showBulletPoints && (
            <ul className={`space-y-2 text-sm font-semibold max-w-md mx-auto md:mx-0 ${imageSrc ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {(bulletPoints || [
                "외벽·창틀 누수 유입 경로 정밀 점검",
                "노후 실리콘 손상 상태 확인",
                "구조와 원인에 맞는 보수 범위 안내"
              ]).map((text, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <a
              href={`tel:${siteConfig.phonePlaceholder}`}
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-extrabold rounded-xl shadow-lg shadow-brand-accent/20 transition-all text-center"
            >
              전화 문의
            </a>
            <a
              href={siteConfig.kakaoUrlPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#fee500] hover:bg-[#fdd835] text-black text-base font-extrabold rounded-xl transition-all text-center"
            >
              카카오톡 문의
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
