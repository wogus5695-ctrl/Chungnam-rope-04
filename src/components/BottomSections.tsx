import { services } from "@/data/services";
import { regions } from "@/data/regions";
import { siteConfig } from "@/config/site";
import Link from "next/link";

// 1. 서비스 안내
interface ServiceSectionProps {
  activeServiceName?: string;
  regionName?: string;
}

export function ServiceSection({ activeServiceName, regionName }: ServiceSectionProps) {
  // 메인 페이지일 경우 기존 레이아웃 그대로 출력
  if (!activeServiceName || !regionName) {
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

  // 작업명별 관련 서비스 분기 정의
  const relationMap: Record<string, string[]> = {
    "빗물누수": ["창틀누수", "외벽누수"],
    "창틀누수": ["창틀코킹", "빗물누수"],
    "외벽누수": ["빗물누수", "창틀누수"],
    "창틀코킹": ["창틀실리콘", "창틀누수"],
    "창틀실리콘": ["창틀코킹", "샷시실리콘"],
    "샷시실리콘": ["창틀실리콘", "창틀코킹"]
  };

  const relatedNames = relationMap[activeServiceName] || ["창틀누수", "외벽누수"];

  // 관련 서비스 설명 및 링크 문구 사전
  const relatedMetaMap: Record<string, { desc: string; linkText: string }> = {
    "창틀누수": {
      desc: "창틀 주변에서 물자국이 반복될 때 함께 확인합니다.",
      linkText: "창틀누수 보기"
    },
    "외벽누수": {
      desc: "벽지 상단 변색이나 외벽 균열이 함께 보일 때 확인합니다.",
      linkText: "외벽누수 보기"
    },
    "빗물누수": {
      desc: "비바람이 강한 날에만 누수가 반복될 때 확인합니다.",
      linkText: "빗물누수 보기"
    },
    "창틀코킹": {
      desc: "창틀 외부 실리콘의 갈라짐과 들뜸이 보일 때 확인합니다.",
      linkText: "창틀코킹 보기"
    },
    "창틀실리콘": {
      desc: "창틀 실리콘의 경화와 갈라짐이 확인될 때 점검합니다.",
      linkText: "창틀실리콘 보기"
    },
    "샷시실리콘": {
      desc: "샷시 프레임과 외벽 접합부에 틈이 보일 때 확인합니다.",
      linkText: "샷시실리콘 보기"
    }
  };

  // 작업명별 요약 콘텐츠 매핑 사전
  const serviceDetailMap: Record<string, { desc: string; symptom: string; target: string; scope: string }> = {
    "빗물누수": {
      desc: "비바람의 방향과 외벽·창틀 상태를 비교해 실제 빗물 유입 경로를 확인하는 서비스입니다.",
      symptom: "비바람이 강할 때 반복되는 창틀·벽면 물자국",
      target: "외벽 균열, 창틀 상부, 실리콘 접합부",
      scope: "실제 유입 가능성이 높은 부위와 필요한 보수 범위"
    },
    "창틀누수": {
      desc: "창틀 주변의 누수 흔적과 외부 접합부를 비교해 물이 들어오는 위치를 확인하는 서비스입니다.",
      symptom: "창틀 상부·측면 물자국과 주변 벽지 젖음",
      target: "창틀 접합부, 실리콘, 인접 외벽",
      scope: "창틀과 외벽 중 실제 원인 부위 구분"
    },
    "외벽누수": {
      desc: "외벽의 균열과 줄눈, 창호 접합부를 점검해 빗물 침투 가능성을 확인하는 서비스입니다.",
      symptom: "벽지 상단 변색과 외벽 균열 주변 반복 습기",
      target: "외벽 크랙, 줄눈, 창호 접합부",
      scope: "균열 보수와 방수 작업이 필요한 범위"
    },
    "창틀코킹": {
      desc: "기존 코킹의 손상 상태와 접합부 틈을 확인해 제거 및 재시공 범위를 판단하는 서비스입니다.",
      symptom: "실리콘 갈라짐, 들뜸, 창틀 주변 틈새",
      target: "기존 실리콘과 창틀·외벽 접합면",
      scope: "기존 코킹 제거 여부와 재시공 범위"
    },
    "창틀실리콘": {
      desc: "창틀 외부 실리콘의 경화와 갈라짐 상태를 확인해 필요한 보수 범위를 판단합니다.",
      symptom: "실리콘 표면 갈라짐과 접합부 들뜸",
      target: "창틀 외부 실리콘과 주변 접착면",
      scope: "손상 부위 제거 및 재시공 필요 범위"
    },
    "샷시실리콘": {
      desc: "샷시 프레임과 외벽 사이 실리콘 상태를 확인해 접합부 보수가 필요한 범위를 판단합니다.",
      symptom: "샷시 주변 실리콘 박리와 미세 틈",
      target: "샷시 프레임, 외벽 접합부, 기존 실리콘",
      scope: "접합부 보강 및 실리콘 재시공 범위"
    }
  };

  // Fallback 공통 컨텐츠
  const fallbackDetail = {
    desc: "현장 증상과 외부 마감 상태를 비교해 실제 원인과 필요한 작업 범위를 확인합니다.",
    symptom: "반복되는 물자국, 습기 또는 외부 마감 손상",
    target: "외벽, 창틀, 접합부와 기존 마감 상태",
    scope: "확인된 원인에 맞는 점검 및 보수 범위"
  };

  const activeDetail = serviceDetailMap[activeServiceName] || fallbackDetail;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-zinc-100 px-5 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        
        {/* 상단 타이틀 (모바일 좌측 정렬) */}
        <div className="text-left lg:text-center max-w-3xl lg:mx-auto mb-7 sm:mb-9 lg:mb-[44px]">
          <h2 className="text-[13px] sm:text-sm font-bold text-brand-accent tracking-wider uppercase mb-2 lg:mb-[12px] lg:text-[15px]">
            선택한 서비스 안내
          </h2>
          <p className="text-[28px] sm:text-3xl lg:text-[40px] font-black text-brand-primary tracking-tight lg:tracking-[-0.03em] leading-[1.3] lg:leading-[1.25] keep-all break-keep">
            {regionName} {activeServiceName}, 어떤 부분을 확인하나요?
          </p>
          <p className="text-zinc-500 mt-3 lg:mt-[16px] text-[15px] sm:text-base lg:text-[18px] leading-relaxed lg:leading-[1.7] keep-all break-keep max-w-[730px] lg:mx-auto">
            증상과 외부 상태를 함께 비교해 실제 원인과 필요한 작업 범위를 판단합니다.
          </p>
        </div>

        {/* 1. 현재 선택된 작업명 대형 카드 상세 영역 (PC 컴팩트 3열 구조, 모바일 콤팩트 세로 목록 통합) */}
        <div className="mb-8 lg:mb-[44px] p-5 lg:p-8 bg-zinc-50 border border-zinc-150 rounded-[16px] lg:rounded-[20px] shadow-sm space-y-4 lg:space-y-6">
          <div className="border-b border-zinc-200/80 pb-3 flex flex-col lg:flex-row lg:items-baseline lg:gap-4">
            <h3 className="text-[22px] lg:text-[28px] font-[800] text-brand-primary leading-tight">{activeServiceName}</h3>
            <p className="text-zinc-500 text-sm sm:text-base lg:text-[16px] mt-1 lg:mt-0 font-medium leading-relaxed">{activeDetail.desc}</p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3.5 lg:gap-6 text-sm lg:divide-x lg:divide-zinc-200">
            <div>
              <span className="block text-[12px] lg:text-[13px] font-bold text-zinc-400 mb-0.5 lg:mb-1.5 uppercase tracking-wider">주요 증상</span>
              <p className="text-zinc-700 leading-relaxed font-semibold lg:text-[16px] line-clamp-2">{activeDetail.symptom}</p>
            </div>
            <div className="lg:pl-6">
              <span className="block text-[12px] lg:text-[13px] font-bold text-zinc-400 mb-0.5 lg:mb-1.5 uppercase tracking-wider">확인 부위</span>
              <p className="text-zinc-700 leading-relaxed font-semibold lg:text-[16px] line-clamp-2">{activeDetail.target}</p>
            </div>
            <div className="lg:pl-6">
              <span className="block text-[12px] lg:text-[13px] font-bold text-zinc-400 mb-0.5 lg:mb-1.5 uppercase tracking-wider">안내 범위</span>
              <p className="text-zinc-700 leading-relaxed font-semibold lg:text-[16px] line-clamp-2">{activeDetail.scope}</p>
            </div>
          </div>
        </div>

        {/* 2. 함께 확인하면 좋은 관련 서비스 2종 링킹 영역 */}
        <div className="space-y-5 lg:space-y-6">
          <h4 className="text-[21px] lg:text-[20px] font-black text-brand-primary border-l-4 border-brand-accent pl-2.5 leading-[1.3]">
            함께 확인하면 좋은 관련 서비스
          </h4>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-6">
            {relatedNames.map((name) => {
              const meta = relatedMetaMap[name] || { desc: "", linkText: `${name} 보기` };
              return (
                <Link 
                  key={name} 
                  href={`/?k=${regionName}-${name}`}
                  className="p-4 lg:p-[24px] bg-white border border-zinc-150 rounded-[14px] lg:rounded-2xl hover:shadow-md hover:border-brand-accent/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/40 transition-all group flex flex-row lg:flex-col justify-between items-center lg:items-stretch h-[92px] lg:h-full"
                >
                  <div className="text-left w-[82%] lg:w-auto">
                    <h5 className="text-[17px] lg:text-[21px] font-[800] text-zinc-900 group-hover:text-brand-accent transition-colors mb-0.5 lg:mb-2 tracking-tight leading-tight">{name}</h5>
                    <p className="text-[13px] lg:text-[15px] text-zinc-500 leading-relaxed line-clamp-1 lg:line-clamp-2">{meta.desc}</p>
                  </div>
                  <div className="text-[13px] lg:text-[14px] font-extrabold text-brand-accent flex items-center justify-end w-[18%] lg:w-auto lg:pt-3 lg:border-t lg:border-zinc-100 group-hover:underline">
                    <span className="hidden lg:inline mr-1">{meta.linkText}</span>
                    <span className="text-[18px] lg:text-sm leading-none">&rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

// 2. 축소된 작업 진행 과정
export function ProcessSection() {
  const steps = [
    { num: "01", name: "현장 상태 확인", desc: "누수가 발생하는 실내 징후와 외부 마감 상태를 육안 및 장비로 정밀 점검합니다." },
    { num: "02", name: "원인 분석", desc: "빗물이 들어오는 틈새와 균열 위치를 파악하고 보수 필요한 범위를 분석합니다." },
    { num: "03", name: "맞춤 시공 진행", desc: "노후 마감재를 깨끗이 제거하고 고기밀 방수 자재를 이용해 빈틈없이 실링 처리를 완료합니다." }
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">시공 과정</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">작업 진행 과정</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, i) => (
            <div key={i} className="p-6 bg-white border border-zinc-100 rounded-2xl relative shadow-sm">
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

// 3. 실제 작업 사례 (기본 컴포넌트 구조화)
interface WorkCasesProps {
  regionName?: string;
  serviceName?: string;
}

export function WorkCasesSection({ regionName, serviceName }: WorkCasesProps) {
  // 실제 사례 데이터 흡수를 위한 구조 정의
  const mockCases = [
    {
      title: `${regionName || "충남"} 현장 시공 사례`,
      type: serviceName || "빗물방수",
      beforeSymptom: "비가 오면 발생하는 벽면 누수 흔적",
      targetArea: "외부 창틀 실리콘 및 주변 균열 부위",
      actionDesc: "노후 실리콘 제거 후 실란트 밀폐 보강",
      afterState: "우천 시에도 실내 습기 발생 없이 완전 기밀"
    }
  ];

  return (
    <section id="work-cases" className="py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">현장 기록</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">실제 작업 사례</p>
        </div>

        <div className="space-y-8">
          {mockCases.map((c, i) => (
            <div key={i} className="p-6 border border-zinc-100 bg-zinc-50 rounded-2xl">
              <h3 className="text-xl font-bold text-zinc-900 mb-4">{c.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div>
                  <span className="block text-xs font-bold text-zinc-400 mb-1">작업 전 증상</span>
                  <p className="text-zinc-700 font-semibold">{c.beforeSymptom}</p>
                </div>
                <div>
                  <span className="block text-xs font-bold text-zinc-400 mb-1">확인한 부위</span>
                  <p className="text-zinc-700 font-semibold">{c.targetArea}</p>
                </div>
                <div>
                  <span className="block text-xs font-bold text-zinc-400 mb-1">실제 작업 내용</span>
                  <p className="text-zinc-700 font-semibold">{c.actionDesc}</p>
                </div>
                <div>
                  <span className="block text-xs font-bold text-zinc-400 mb-1">작업 후 상태</span>
                  <p className="text-zinc-700 font-semibold">{c.afterState}</p>
                </div>
              </div>
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
  dynamicRegionName?: string;
  dynamicServiceName?: string;
}

export function FAQSection({ customFaqs, dynamicRegionName, dynamicServiceName }: FAQSectionProps) {
  const defaultFaqs = [
    { q: "창틀 누수가 일어나는 가장 주요한 원인은 무엇인가요?", a: "기본적으로 오랜 시간 자외선 및 기온 변화에 노출되며 마감 코킹이 노후화되어 갈라지는 현상과 함께, 주변 외벽 콘크리트에 생긴 미세한 거미줄형 균열로 빗물이 침입하는 것이 주요인입니다." },
    { q: "기존 실리콘을 제거하지 않고 그 위에 덧방(덧칠) 시공을 하나요?", a: "레인가드는 접착력이 현저히 감소한 노후 실리콘을 최대한 칼로 긁어내 완전히 걷어낸 후 새 제품으로 시공하는 것을 철칙으로 삼습니다. 접착면에 부유물이 남아 있으면 금방 다시 누수가 일어나기 때문입니다." },
    { q: "비가 오지 않는 화창한 날씨에도 누수 점검이 가능한가요?", a: "네, 가능합니다. 비가 오지 않을 때 외벽 균열 상태와 기존 실리콘의 노화 들뜸 정도를 훨씬 정밀하게 육안으로 파악하고 손으로 만져볼 수 있기 때문에 화창한 날 점검 및 진단을 받고 보수를 선점하시는 편이 현명합니다." },
    { q: "외벽 균열과 창을 둘러싼 창틀 누수는 어떤 관계가 있나요?", a: "창틀 주변 1~2m 반경 안의 외벽 균열로 투과된 빗물은 내부 옹벽 틈을 타고 흘러내려 결국 가장 약한 접합부인 샷시 틈새로 흘러나오게 됩니다. 따라서 실리콘과 함께 인접 균열도 함께 살펴 막아야 합니다." },
    { q: "시공 의뢰 상담 전 미리 확인해두면 좋은 내용은 무엇인가요?", a: "누수가 발생하는 방의 위치, 창문의 크기 및 대략적인 형태(이중창 등), 빗물이 떨어지는 구체적인 부위(상단, 하단, 모서리 등)를 대략적으로 체크해두시면 한결 신속한 대략적 안내가 가능합니다." }
  ];

  const hasDynamic = !!(dynamicRegionName && dynamicServiceName);
  let displayFaqs = customFaqs && customFaqs.length > 0 ? [...customFaqs] : [...defaultFaqs];

  // 동적 키워드 페이지일 경우 2번째(인덱스 1 또는 2) 항목에 신규 질문 주입
  if (hasDynamic) {
    const isCocking = ["창틀코킹", "창틀실리콘", "샷시실리콘"].includes(dynamicServiceName);
    const newQuestion = isCocking
      ? {
          q: `${dynamicRegionName} ${dynamicServiceName} 시공 전 어떤 부분을 점검하나요?`,
          a: "기존 실리콘의 경화와 갈라짐, 창틀·외벽 접합부의 들뜸과 틈새 상태를 확인합니다. 손상 범위와 누수 흔적을 함께 살펴 기존 코킹 제거 여부와 필요한 시공 범위를 판단합니다."
        }
      : {
          q: `${dynamicRegionName} ${dynamicServiceName} 점검 시 어떤 부분을 확인하나요?`,
          a: "누수가 발생하는 날의 바람 방향과 물자국 위치를 확인하고, 외벽 균열과 창틀 접합부, 기존 실리콘의 손상 상태를 함께 점검합니다. 실내 흔적과 외부 상태를 비교해 실제 빗물 유입 가능성이 높은 부위와 필요한 보수 범위를 판단합니다."
        };
    
    // 기존에 인덱스 2(3번째) 자리에 주입 (2번째 또는 3번째 조건 충족)
    displayFaqs.splice(2, 0, newQuestion);
  }

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
