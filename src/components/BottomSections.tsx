import { services } from "@/data/services";
import { regions } from "@/data/regions";
import { siteConfig } from "@/config/site";
import Link from "next/link";

// 1. 서비스 안내
export function ServiceSection() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">시공 범위</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">제공하는 전문 서비스</p>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base">
            빗물이 유입될 수 있는 모든 경로를 차단하며 균열 및 접합부 기밀 성능을 완벽 복구합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.id} className="p-8 bg-zinc-50 border border-zinc-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-zinc-900 mb-3">{s.name}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6 h-12 overflow-hidden">{s.shortDescription}</p>
              
              <div className="space-y-3 pt-4 border-t border-zinc-200/60">
                <div>
                  <span className="inline-block text-xs font-bold text-zinc-400 mb-1">관련 대표 증상</span>
                  <div className="flex flex-wrap gap-1.5">
                    {s.symptoms.map((sym, i) => (
                      <span key={i} className="px-2 py-0.5 bg-zinc-200/50 text-zinc-700 text-xs font-semibold rounded">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 2. 진단 및 시공 절차
export function ProcessSection() {
  const steps = [
    { num: "01", name: "증상 및 현장 조건 확인", desc: "누수가 발생하는 실내외 징후와 건물의 구조적 특성을 경청하고 사전 판단합니다." },
    { num: "02", name: "누수 예상 경로 점검", desc: "빗물이 침입할 수 있는 다양한 외벽 크랙, 조인트 틈새 등을 육안 및 장비로 상세히 짚어냅니다." },
    { num: "03", name: "기존 실리콘과 균열 상태 확인", desc: "도포되어 있던 오래된 실리콘의 탈락 깊이와 콘크리트 박리 크기를 정밀 분석합니다." },
    { num: "04", name: "필요한 범위의 보수 작업 진행", desc: "불필요한 과잉 공사를 막고 원인이 되는 지점을 타겟팅하여 고기밀 코킹 마감을 선사합니다." }
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">투명한 프로세스</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">진단 및 시공 절차</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st, i) => (
            <div key={i} className="p-6 bg-white border border-zinc-100 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
              <span className="text-4xl font-black text-brand-accent/20 absolute right-6 top-6">{st.num}</span>
              <h3 className="text-lg font-bold text-zinc-900 mb-3 pr-8">{st.name}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. 현장 사례
export function CasesSection() {
  const cases = [
    { title: "아파트 외부 창틀 누수 보수", type: "공동주택", desc: "노화되어 들뜬 아파트 샷시 외부의 기존 마감재를 깨끗이 긁어낸 후 외장 우레탄 실란트로 균열을 밀폐 시공하였습니다." },
    { title: "상업 빌딩 샷시 실리콘 노후 보강", type: "상가건물", desc: "유리와 금속 틈새의 벌어짐 부위를 샌딩하고 접착력을 올려주는 기밀 프라이머 처리 후 탄성 마감을 전개하였습니다." },
    { title: "외벽 균열 유입 차단 실링", type: "주택외벽", desc: "창문 주변의 콘크리트 외벽 미세 균열을 조기에 메워 다가오는 우기 시 물 고임 경로를 예방 및 봉쇄하였습니다." }
  ];

  return (
    <section id="cases" className="py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">시공 실적</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">대표 현장 사례</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="p-6 border border-zinc-100 bg-zinc-50 rounded-2xl">
              <span className="inline-block px-2.5 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-md mb-4">{c.type}</span>
              <h3 className="text-lg font-bold text-zinc-900 mb-3">{c.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. 선택 이유
export function WhyUsSection() {
  const points = [
    { title: "원인을 먼저 확인하는 진단 방식", desc: "단순히 실리콘을 덮어씌우는 공사가 아닙니다. 어디서 어떻게 빗물이 투과되는지 누수 이동 통로를 정밀 분석합니다." },
    { title: "작업 범위를 과도하게 넓히지 않는 안내", desc: "정확한 균열 지점과 코킹 탈락 지점만 집중 공략하여, 불필요한 전체 재시공 요구나 비용 부풀리기를 배제합니다." },
    { title: "창틀과 외벽을 함께 살피는 점검 구조", desc: "샤시 내부 틈새만 메우면 외벽 크랙으로 타고 흐르는 물을 막지 못합니다. 창틀 주변 콘크리트 옹벽을 총체적으로 점검합니다." }
  ];

  return (
    <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">차별화 가치</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">레인가드를 선택하는 이유</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((p, i) => (
            <div key={i} className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-brand-primary mb-3">{p.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. 서비스 지역
export function RegionSection() {
  // 15개 시군
  const list = regions.map(r => r.name);

  return (
    <section id="regions" className="py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">신속한 출장</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">충남 전 지역 서비스 안내</p>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base">
            충청남도 15개 시·군 전역에서 누수 점검 및 코킹 시공 요청에 대응합니다.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {list.map((r, i) => (
              <span key={i} className="px-4 py-2 bg-zinc-100 text-zinc-800 text-sm font-semibold rounded-lg border border-zinc-200/50">
                {r}
              </span>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/sitemap-chungnam"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white font-bold rounded-xl transition-all"
            >
              충남 지역별 상세 서비스 안내 바로가기 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. FAQ
interface FAQSectionProps {
  customFaqs?: { q: string; a: string }[];
}

export function FAQSection({ customFaqs }: FAQSectionProps) {
  const defaultFaqs = [
    { q: "창틀 누수가 일어나는 가장 주요한 원인은 무엇인가요?", a: "기본적으로 오랜 시간 자외선 및 기온 변화에 노출되며 마감 코킹이 노후화되어 갈라지는 현상과 함께, 주변 외벽 콘크리트에 생긴 미세한 거미줄형 균열로 빗물이 침입하는 것이 주요인입니다." },
    { q: "기존 실리콘을 제거하지 않고 그 위에 덧방(덧칠) 시공을 하나요?", a: "레인가드는 접착력이 현저히 감소한 노후 실리콘을 최대한 칼로 긁어내 완전히 걷어낸 후 새 제품으로 시공하는 것을 철칙으로 삼습니다. 접착면에 부유물이 남아 있으면 금방 다시 누수가 일어나기 때문입니다." },
    { q: "비가 오지 않는 화창한 날씨에도 누수 점검이 가능한가요?", a: "네, 가능합니다. 비가 오지 않을 때 외벽 균열 상태와 기존 실리콘의 노화 들뜸 정도를 훨씬 정밀하게 육안으로 파악하고 손으로 만져볼 수 있기 때문에 화창한 날 점검 및 진단을 받고 보수를 선점하시는 편이 현명합니다." },
    { q: "외벽 균열과 창을 둘러싼 창틀 누수는 어떤 관계가 있나요?", a: "창틀 주변 1~2m 반경 안의 외벽 균열로 투과된 빗물은 내부 옹벽 틈을 타고 흘러내려 결국 가장 약한 접합부인 샷시 틈새로 흘러나오게 됩니다. 따라서 실리콘과 함께 인접 균열도 함께 살펴 막아야 합니다." },
    { q: "시공 의뢰 상담 전 미리 확인해두면 좋은 내용은 무엇인가요?", a: "누수가 발생하는 방의 위치, 창문의 크기 및 대략적인 형태(이중창 등), 빗물이 떨어지는 구체적인 부위(상단, 하단, 모서리 등)를 대략적으로 체크해두시면 한결 신속한 대략적 안내가 가능합니다." }
  ];

  const displayFaqs = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;

  return (
    <section id="faq" className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">도움말</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">자주 묻는 질문 (FAQ)</p>
        </div>

        <div className="space-y-6">
          {displayFaqs.map((faq, i) => (
            <div key={i} className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2 flex items-start gap-2">
                <span className="text-brand-accent font-black">Q.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed pl-5 whitespace-pre-line">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. 최종 CTA
export function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 bg-brand-primary text-white relative overflow-hidden">
      {/* 장식용 그라데이션 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.15),transparent_70%)]"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <p className="text-sm font-bold text-brand-accent tracking-wider uppercase">상담 센터 운영 중</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
          더 이상의 물 고임과 벽지 젖음 방치 금지!<br />
          지금 레인가드에 정밀 진단을 문의하세요.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
          친절한 상담원이 빗물 누수가 일어나는 현재 양상과 조건에 맞추어 현명한 조치 방법을 상담해 드립니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href={`tel:${siteConfig.phonePlaceholder}`}
            className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-extrabold rounded-xl shadow-lg shadow-brand-accent/20 transition-all text-center"
          >
            전화 상담원 바로 연결
          </a>
          <a
            href={siteConfig.kakaoUrlPlaceholder}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#fee500] hover:bg-[#fdd835] text-black text-base font-extrabold rounded-xl transition-all text-center"
          >
            카카오톡 1:1 대화
          </a>
        </div>
      </div>
    </section>
  );
}

// 8. Footer
export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-12 sm:py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div>
            <span className="text-lg font-black text-white tracking-tight">{siteConfig.brandName}</span>
            <span className="text-zinc-600 text-xs font-semibold ml-2">충남 전역 서비스 지점</span>
          </div>

          <div className="flex gap-6 text-sm font-semibold">
            <Link href="/sitemap-chungnam" className="hover:text-white transition-colors">
              충남 지역별 서비스
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>지점명: {siteConfig.branchName}</span>
            <span>&bull;</span>
            <span>문의처: {siteConfig.phonePlaceholder}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// 9. Floating / Fixed CTA
export function InteractiveCTA() {
  return (
    <>
      {/* 모바일 하단 고정 CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-zinc-200/50 bg-white/95 backdrop-blur-md">
        <a
          href={`tel:${siteConfig.phonePlaceholder}`}
          className="flex justify-center items-center py-4 bg-brand-accent text-white font-black text-sm transition-colors text-center"
        >
          📞 전화 문의
        </a>
        <a
          href={siteConfig.kakaoUrlPlaceholder}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center py-4 bg-[#fee500] text-black font-black text-sm transition-colors text-center"
        >
          💬 카카오톡
        </a>
      </div>

      {/* PC 우하단 미니 플로팅 CTA */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col gap-3">
        <a
          href={`tel:${siteConfig.phonePlaceholder}`}
          className="flex items-center gap-2 px-5 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-white font-extrabold rounded-full shadow-lg shadow-brand-accent/20 transition-all hover:-translate-y-0.5 text-sm"
        >
          <span className="text-base">📞</span>
          <span>전화 상담</span>
        </a>
        <a
          href={siteConfig.kakaoUrlPlaceholder}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3.5 bg-[#fee500] hover:bg-[#fdd835] text-black font-extrabold rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-sm"
        >
          <span className="text-base">💬</span>
          <span>카카오톡</span>
        </a>
      </div>
    </>
  );
}
