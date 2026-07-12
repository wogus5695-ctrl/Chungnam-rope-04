import { siteConfig } from "@/config/site";
import React from "react";

interface HeroProps {
  badge?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  showBulletPoints?: boolean;
}

export default function Hero({ badge, title, subtitle, showBulletPoints = true }: HeroProps) {
  return (
    <section className="relative hero-gradient overflow-hidden py-16 sm:py-24 md:py-32 border-b border-zinc-100">
      {/* 배경 작업 이미지 오버레이 */}
      <div 
        className="absolute inset-0 bg-cover bg-right md:bg-right-bottom opacity-15 pointer-events-none z-0"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:text-left max-w-3xl space-y-6 sm:space-y-8">
          
          {/* 배지 태그 */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-accent text-xs sm:text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            {badge || "충남 전 지역 신속 진단 및 시공"}
          </div>

          {/* 메인 H1 타이틀 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary leading-tight sm:leading-none tracking-tight">
            {title || (
              <>
                충청남도 빗물누수·창틀코킹<br className="hidden sm:inline" />
                <span className="text-brand-accent"> 전문 {siteConfig.brandName}</span>
              </>
            )}
          </h1>

          {/* 보조 설명 문구 */}
          <div className="text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed font-medium">
            {subtitle || (
              <>
                빗물이 집안으로 스며드는 답답함을 명확히 해결합니다. <br className="hidden md:inline" />
                콘크리트 외벽 균열부터 노후화된 샤시 프레임 사이 틈새까지 정밀한 진단과 맞춤형 코킹 공법으로 완벽히 통제합니다.
              </>
            )}
          </div>

          {showBulletPoints && (
            <ul className="space-y-2 text-sm text-zinc-500 font-semibold max-w-md mx-auto md:mx-0">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>외벽과 창틀 주변 누수 유입 경로 정밀 분석</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>기존 노후 실리콘의 마모 및 벌어짐 진단</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>구조물의 상태에 가장 알맞은 보수 방향 설계</span>
              </li>
            </ul>
          )}

          {/* CTA 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <a
              href={`tel:${siteConfig.phonePlaceholder}`}
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-extrabold rounded-xl shadow-lg shadow-brand-accent/20 transition-all text-center"
            >
              전화 문의 (1순위)
            </a>
            <a
              href={siteConfig.kakaoUrlPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#fee500] hover:bg-[#fdd835] text-black text-base font-extrabold rounded-xl transition-all text-center"
            >
              카카오톡 문의 (2순위)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
