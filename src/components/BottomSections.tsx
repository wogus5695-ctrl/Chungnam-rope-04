"use client";

import { services } from "@/data/services";
import { regions } from "@/data/regions";
import { siteConfig } from "@/config/site";
import { workCases } from "@/data/workCases";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { getFAQList } from "@/lib/keyword";

// 1. 서비스 안내
interface ServiceSectionProps {
  activeServiceName?: string;
  regionName?: string;
  regionKeywordName?: string;
}

export function ServiceSection({ activeServiceName, regionName, regionKeywordName }: ServiceSectionProps) {
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
    "샷시실리콘": ["창틀실리콘", "창틀코킹"],
    "외벽방수": ["외벽누수", "건물방수"],
    "옥상방수": ["우레탄방수", "건물방수"],
    "건물방수": ["옥상방수", "외벽방수"],
    "지붕방수": ["건물방수", "옥상방수"],
    "우레탄방수": ["옥상방수", "건물방수"]
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
    },
    "외벽방수": {
      desc: "로프를 타고 높은 외벽의 미세 균열을 코킹하고 침투 발수 처리를 합니다.",
      linkText: "외벽방수 보기"
    },
    "옥상방수": {
      desc: "옥상 바닥 균열과 파라펫 벽면 옹벽의 손상 상태를 정밀 체크합니다.",
      linkText: "옥상방수 보기"
    },
    "건물방수": {
      desc: "외벽·옥상·지붕·창호를 종합 점검해 꼭 필요한 부위에 방수를 시공합니다.",
      linkText: "건물방수 보기"
    },
    "지붕방수": {
      desc: "판넬 및 지붕 용마루 틈새, 고정 볼트 캡 손상 상태를 파악해 보강합니다.",
      linkText: "지붕방수 보기"
    },
    "우레탄방수": {
      desc: "함수율 측정 후 바탕 연삭 면정리부터 우레탄 3회 도포 공정을 실시합니다.",
      linkText: "우레탄방수 보기"
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
    },
    "외벽방수": {
      desc: "외벽 균열부 코킹 마감 및 전체 침투 방수재 도포 공정을 점검해 방수 범위를 설계합니다.",
      symptom: "외벽 미세 균열 주변 습기 및 마감 탈락 흔적",
      target: "외벽 옹벽 균열, 타일 줄눈, 창호 테두리",
      scope: "로프 작업 및 크랙 코킹 범위 구분"
    },
    "옥상방수": {
      desc: "옥상 바닥 우레탄 들뜸과 난간 파라펫 옹벽의 손상 상태를 체크해 방수 계획을 매칭합니다.",
      symptom: "옥상 바닥 우레탄 들뜸 및 갈라짐 틈새 물고임",
      target: "옥상 슬래브 바닥, 파라펫 옹벽, 배수구 드레인",
      scope: "부분 보수와 전체 재시공 판단 범위"
    },
    "건물방수": {
      desc: "외벽·옥상·지붕·창호를 종합 진단해 누수가 발생하는 부위에 적합한 보수 방안을 설계합니다.",
      symptom: "실내 다발성 빗물 누출 및 곰팡이 피해",
      target: "건물 내외벽, 지붕 구조체, 옥상 슬래브",
      scope: "건물 구조별 최적의 국소 방수 범위 구분"
    },
    "지붕방수": {
      desc: "조립식 판넬 지붕의 볼트 노후화 및 용마루 겹침부 조인트를 점검해 실링 보강 범위를 설계합니다.",
      symptom: "지붕 판넬 고정 피스 녹슴 및 용마루 이음새 틈",
      target: "지붕 이음새, 고정용 볼트 캡, 처마 물동이",
      scope: "피스 캡 교체 및 이음새 특수 시트 보수 범위"
    },
    "우레탄방수": {
      desc: "우레탄 3회 시공에 따른 연삭 면처리 상태 및 균열 조인트 보강 상태를 점검합니다.",
      symptom: "시멘트 바닥 모래화 및 기존 방수층 박리 부품",
      target: "콘크리트 함수율, 바닥 팽창 조인트, 배수 플랜지",
      scope: "연삭 면처리 범위 및 하도·중도·상도 도막층 두께"
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
  const linkKey = regionKeywordName || regionName;

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
                  href={`/?k=${linkKey}-${name}`}
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
interface ProcessSectionProps {
  activeServiceName?: string;
}

export function ProcessSection({ activeServiceName }: ProcessSectionProps) {
  const isDynamic = !!activeServiceName;
  const targetService = activeServiceName ? services.find(s => s.name === activeServiceName) : null;
  
  const label = isDynamic ? `${activeServiceName} 작업 진행 과정` : "작업 진행 과정";
  const h2Text = isDynamic ? `${activeServiceName} 정석 시공 공정` : "원인을 확인한 뒤 필요한 범위만 작업합니다";
  const description = isDynamic
    ? "현장 상태 진단부터 계면 정리, 기밀 충진 및 마감까지 정석 공정으로 진행됩니다."
    : "보이는 흔적만 막지 않고 외벽과 창틀 상태를 함께 확인한 뒤 필요한 작업 범위를 안내합니다.";

  const defaultSteps = [
    {
      num: "01",
      name: "증상과 현장 확인",
      desc: "물자국 위치와 발생 시점, 건물 구조와 외부 상태를 함께 확인합니다."
    },
    {
      num: "02",
      name: "유입 가능 부위 점검",
      desc: "외벽 균열, 창틀 접합부와 기존 실리콘 손상 여부를 살펴봅니다."
    },
    {
      num: "03",
      name: "필요한 범위 보수",
      desc: "확인된 원인을 기준으로 불필요한 범위를 제외하고 필요한 작업을 진행합니다."
    }
  ];

  const stepTitles = [
    "1단계: 정밀 상태 진단",
    "2단계: 불량재 제거 & 연삭",
    "3단계: 접착 프라이머 도포",
    "4단계: 기밀 충진 & 탑코트"
  ];

  const dynamicSteps = targetService?.processDesc ? targetService.processDesc.map((desc, idx) => ({
    num: String(idx + 1).padStart(2, "0"),
    name: stepTitles[idx] || `공정 0${idx + 1}`,
    desc
  })) : defaultSteps;

  const steps = isDynamic ? dynamicSteps : defaultSteps;

  return (
    <section id="process" className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100 px-5 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        
        {/* 상단 타이틀 */}
        <div className="text-left lg:text-center max-w-3xl lg:mx-auto mb-10 sm:mb-12 lg:mb-[44px]">
          <h2 className="text-[13px] sm:text-sm font-bold text-brand-accent tracking-wider uppercase mb-2 lg:mb-[12px] lg:text-[15px]">
            {label}
          </h2>
          <p className="text-[28px] sm:text-3xl lg:text-[40px] font-black text-brand-primary tracking-tight lg:tracking-[-0.03em] leading-[1.3] lg:leading-[1.25] keep-all break-keep">
            {h2Text}
          </p>
          <p className="text-zinc-500 mt-3 lg:mt-[16px] text-[15px] sm:text-base lg:text-[18px] leading-relaxed lg:leading-[1.7] keep-all break-keep max-w-[730px] lg:mx-auto">
            {description}
          </p>
        </div>

        {/* 반응형 통합 과정 레이아웃 (HTML 1회 출력, CSS 제어) */}
        <div className={`grid grid-cols-1 ${steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6 lg:gap-8 relative items-stretch`}>
          {steps.map((st, i) => (
            <div key={i} className="p-5 sm:p-6 bg-white border border-zinc-150 rounded-2xl relative shadow-sm flex flex-col justify-between min-h-[110px] lg:min-h-[160px]">
              <div>
                {/* 상부 번호 및 단계명 */}
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-black select-none">
                      {st.num}
                    </span>
                    <h3 className="text-[17px] lg:text-[19px] font-extrabold text-zinc-900 leading-tight">{st.name}</h3>
                  </div>
                </div>
                <p className="text-[14px] lg:text-sm text-zinc-500 leading-relaxed font-semibold">{st.desc}</p>
              </div>
              
              {/* 단계 간 수평 점선 연결 흐름 (lg 이상에서만 노출) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-4 border-t border-dashed border-zinc-300" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// 3. 실제 작업 사례 (모바일 캐러셀 + PC 고정형 하이브리드)
interface WorkCasesProps {
  regionName?: string;
  serviceName?: string;
}

import { useEffect, useRef } from "react";

export function WorkCasesSection({ regionName, serviceName }: WorkCasesProps) {
  const isDynamic = !!serviceName;
  const [activeIdx, setActiveIdx] = useState(0);
  
  // 모바일 전용 슬라이드 상태 (0: 작업 전, 1: 작업 후)
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 터치 스와이프 감지용 ref
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeCase = workCases[activeIdx] || workCases[0];
  const isLocationVerified = !!activeCase.verifiedLocation;
  const label = isDynamic ? "유사 현장 작업 사례" : "실제 작업 사례";
  const h2Text = isDynamic 
    ? `${regionName} ${serviceName} 상담 전, 유사 작업 사례를 확인하세요`
    : "사진으로 확인하는 작업 전·후 상태";
  const description = isDynamic
    ? "실제 작업 정보가 확인된 사례와 유사 작업 예시를 구분해 안내합니다. 선택한 서비스와 관련된 유사 현장의 작업 전·후 상태를 사진으로 안내합니다."
    : "실제 작업 정보가 확인된 사례와 유사 작업 예시를 구분해 안내합니다. 실제 현장에서 촬영한 작업 전·후 이미지를 통해 외부 마감과 접합부의 변화를 확인할 수 있습니다.";

  // 사례 탭 클릭 핸들러 (작업 전 이미지부터 재시작)
  const handleCaseSelect = (idx: number) => {
    setActiveIdx(idx);
    setSlideIdx(0);
    resetUserInteractionTimer();
  };

  // 수동 제어 타이머 초기화 (8~10초 후 자동 재생 재개)
  const resetUserInteractionTimer = () => {
    setIsPaused(true);
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 9000); // 9초 대기
  };

  // 모바일 수동 슬라이드 토글
  const handlePrev = () => {
    setSlideIdx((prev) => (prev === 0 ? 1 : 0));
    resetUserInteractionTimer();
  };

  const handleNext = () => {
    setSlideIdx((prev) => (prev === 0 ? 1 : 0));
    resetUserInteractionTimer();
  };

  // 터치 스와이프 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      // 50px 이상 스와이프 시 전환
      setSlideIdx((prev) => (prev === 0 ? 1 : 0));
      resetUserInteractionTimer();
    }
  };

  // 모바일 전용 5초 자동 재생 로직 (다양한 정지 조건 검증)
  useEffect(() => {
    // 1. prefers-reduced-motion 체크
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const tick = () => {
      // 2. 일시 정지 상태 체크
      if (isPaused) return;

      // 3. 브라우저 탭 활성화 여부
      if (document.hidden) return;

      // 4. 뷰포트 내 교차 영역(Intersection Observer) 확인
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inViewport) return;
      }

      // 상태 전환
      setSlideIdx((prev) => (prev === 0 ? 1 : 0));
    };

    const intervalId = setInterval(tick, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="work-cases" ref={containerRef} className="py-16 sm:py-24 bg-white border-b border-zinc-100 px-5 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        
        {/* 상단 타이틀 */}
        <div className="text-left lg:text-center max-w-3xl lg:mx-auto mb-8 lg:mb-[44px]">
          <h2 className="text-[13px] sm:text-sm font-bold text-brand-accent tracking-wider uppercase mb-2 lg:mb-[12px] lg:text-[15px]">
            {isLocationVerified ? `${activeCase.verifiedLocation} 작업 사례` : "유사 작업 예시"}
          </h2>
          <p className="text-[28px] sm:text-3xl lg:text-[40px] font-black text-brand-primary tracking-tight lg:tracking-[-0.03em] leading-[1.3] lg:leading-[1.25] keep-all break-keep">
            {h2Text}
          </p>
          <p className="text-zinc-500 mt-3 lg:mt-[16px] text-[15px] sm:text-base lg:text-[18px] leading-relaxed lg:leading-[1.7] keep-all break-keep max-w-[730px] lg:mx-auto">
            {description}
          </p>
        </div>

        {/* 탭 버튼 영역 (모바일 가로 스크롤 허용, 데스크톱 중앙 정렬) */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0 lg:justify-center">
          <div className="flex gap-2">
            {workCases.map((wc, idx) => (
              <button
                key={wc.caseId}
                type="button"
                onClick={() => handleCaseSelect(idx)}
                className={`px-4 py-2 text-sm font-extrabold rounded-full border transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-accent/40 ${
                  activeIdx === idx
                    ? "bg-brand-accent text-white border-brand-accent"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                사례 {String(wc.caseNumber).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>

        {/* 메인 사례 컨테이너 패널 */}
        <div 
          className="p-5 lg:p-8 bg-zinc-50 border border-zinc-150 rounded-[16px] lg:rounded-[20px] shadow-sm space-y-6 lg:space-y-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          
          {/* 1. 모바일 뷰: 전·후 자동 슬라이더 (lg:hidden) */}
          <div className="block lg:hidden relative">
            <div 
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200 bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* 전 슬라이드 (fade 효과 전환) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-[400ms] ${
                  slideIdx === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <span className="absolute left-3 top-3 px-2.5 py-1 bg-red-50 text-red-600 text-xs font-black rounded-md z-20">
                  {isLocationVerified ? "작업 전" : "점검 전 상태 예시"}
                </span>
                <img
                  src={activeCase.beforeImage}
                  alt={activeCase.beforeAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* 후 슬라이드 (fade 효과 전환) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-[400ms] ${
                  slideIdx === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <span className="absolute left-3 top-3 px-2.5 py-1 bg-blue-50 text-brand-accent text-xs font-black rounded-md z-20">
                  {isLocationVerified ? "작업 후" : "보수 마감 예시"}
                </span>
                <img
                  src={activeCase.afterImage}
                  alt={activeCase.afterAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* 이전, 다음 버튼 */}
              <button 
                type="button"
                onClick={handlePrev}
                aria-label="이전 상태 보기"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                &larr;
              </button>
              <button 
                type="button"
                onClick={handleNext}
                aria-label="다음 상태 보기"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                &rarr;
              </button>
            </div>

            {/* 인디케이터 (1 / 2 표시) */}
            <div className="flex justify-center items-center gap-1.5 mt-3">
              <span className={`w-2 h-2 rounded-full transition-all ${slideIdx === 0 ? "bg-brand-accent scale-110" : "bg-zinc-300"}`} />
              <span className={`w-2 h-2 rounded-full transition-all ${slideIdx === 1 ? "bg-brand-accent scale-110" : "bg-zinc-300"}`} />
              <span className="text-[12px] text-zinc-400 font-extrabold ml-1">{slideIdx === 0 ? "1 / 2" : "2 / 2"}</span>
            </div>
          </div>

          {/* 2. PC 뷰: 작업 전 / 작업 후 이미지 2열 구성 (hidden lg:grid) */}
          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 bg-red-50 text-red-600 text-xs font-black rounded-md">
                {isLocationVerified ? "작업 전" : "점검 전 상태 예시"}
              </span>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200">
                <img
                  src={activeCase.beforeImage}
                  alt={activeCase.beforeAlt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 bg-blue-50 text-brand-accent text-xs font-black rounded-md">
                {isLocationVerified ? "작업 후" : "보수 마감 예시"}
              </span>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200">
                <img
                  src={activeCase.afterImage}
                  alt={activeCase.afterAlt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 작업 설명 정보 4열 바인딩 (수평 구분선 처리) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm pt-6 border-t border-zinc-200">
            <div>
              <span className="block text-[12px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">작업 전 상태</span>
              <p className="text-zinc-700 leading-relaxed font-semibold">{activeCase.symptom}</p>
            </div>
            <div>
              <span className="block text-[12px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">확인 부위</span>
              <p className="text-zinc-700 leading-relaxed font-semibold">{activeCase.inspectionPoint}</p>
            </div>
            <div>
              <span className="block text-[12px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">작업 내용</span>
              <p className="text-zinc-700 leading-relaxed font-semibold">{activeCase.workPerformed}</p>
            </div>
            <div>
              <span className="block text-[12px] font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">작업 후 상태</span>
              <p className="text-zinc-700 leading-relaxed font-semibold">{activeCase.afterState}</p>
            </div>
          </div>

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

          <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <a
              href={`tel:${siteConfig.phonePlaceholder}`}
              className="w-full sm:w-[200px] h-[52px] flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white text-[15px] font-extrabold rounded-xl shadow-md shadow-brand-accent/10 transition-all text-center"
            >
              전화로 지역 상담
            </a>
            <a
              href={siteConfig.kakaoUrlPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[200px] h-[52px] flex items-center justify-center bg-[#fee500] hover:bg-[#fdd835] text-black text-[15px] font-extrabold rounded-xl transition-all text-center"
            >
              카카오톡으로 작업 가능 지역 문의
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. FAQ (상태 관리형 아코디언)
interface FAQSectionProps {
  customFaqs?: { q: string; a: string }[];
  dynamicRegionName?: string;
  dynamicServiceName?: string;
}

export function FAQSection({ customFaqs, dynamicRegionName, dynamicServiceName }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const displayFaqs = getFAQList(customFaqs, dynamicRegionName, dynamicServiceName);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-24 bg-zinc-50 border-b border-zinc-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">도움말</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">자주 묻는 질문 (FAQ)</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {displayFaqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className="bg-white border border-zinc-150 rounded-[12px] sm:rounded-2xl shadow-sm overflow-hidden"
              >
                {/* 질문 토글 버튼 */}
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full text-left p-4 sm:p-5 hover:bg-zinc-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:ring-inset flex justify-between items-center gap-4 group"
                >
                  <h3 className="text-[15px] sm:text-lg font-bold text-zinc-900 flex items-start gap-2.5 leading-tight sm:leading-snug pr-4">
                    <span className="text-brand-accent font-black select-none">Q.</span>
                    <span className="group-hover:text-brand-accent transition-colors">{faq.q}</span>
                  </h3>
                  {/* Chevron 아이콘 */}
                  <span 
                    className={`text-zinc-400 group-hover:text-brand-accent transition-transform duration-300 font-extrabold text-[15px] sm:text-lg select-none shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    } motion-reduce:transition-none`}
                  >
                    &#9662;
                  </span>
                </button>

                {/* 답변 콘텐츠 영역 (짧은 아코디언 슬라이드 전환) */}
                <div
                  id={`faq-answer-${i}`}
                  className={`transition-all duration-[250ms] ease-in-out ${
                    isOpen ? "max-h-[500px] border-t border-zinc-100" : "max-h-0 pointer-events-none"
                  } overflow-hidden motion-reduce:transition-none`}
                >
                  <div className="p-4 sm:p-5 bg-zinc-50/30">
                    <p className="text-[14px] sm:text-base text-zinc-600 leading-relaxed pl-5 whitespace-pre-line font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 7. 최종 CTA
interface FinalCTAProps {
  activeServiceName?: string;
  regionName?: string;
}

export function FinalCTA({ activeServiceName, regionName }: FinalCTAProps) {
  const isDynamic = !!(activeServiceName && regionName);

  // 1. 상단 라벨
  const labelText = "빠른 상담 안내";

  // 2. H2 타이틀
  const h2Text = isDynamic
    ? `${regionName} ${activeServiceName}, 증상이 반복되면 먼저 상담하세요`
    : "비 올 때 반복되는 누수, 원인부터 확인하세요";

  // 3. 설명문 분기 처리
  let descText = "물자국 위치와 발생 시점을 알려주시면 점검이 필요한 부위와 상담 절차를 안내합니다.";
  
  if (isDynamic) {
    const isLeakType = ["빗물누수", "창틀누수", "외벽누수"].includes(activeServiceName);
    const isCockingType = ["창틀코킹", "창틀실리콘", "샷시실리콘"].includes(activeServiceName);

    if (isLeakType) {
      descText = "물자국 위치와 비가 올 때 나타나는 증상을 알려주시면 외벽·창틀 중 확인이 필요한 범위를 안내합니다.";
    } else if (isCockingType) {
      descText = "갈라짐과 들뜸 상태를 사진으로 보내주시면 기존 코킹 확인과 시공 상담 절차를 안내합니다.";
    } else {
      descText = "현재 증상과 외부 마감 상태를 알려주시면 확인이 필요한 부위와 상담 절차를 안내합니다.";
    }
  }

  return (
    <section className="py-[62px] lg:py-[82px] text-white relative overflow-hidden px-[18px] sm:px-6 lg:px-0 pb-[80px] md:pb-[62px] bg-cover bg-center" style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}>
      {/* 어두운 반투명 가독성 보호용 마스크 오버레이 */}
      <div className="absolute inset-0 bg-zinc-950/75 z-0"></div>
      
      {/* 장식용 은은한 그라데이션 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.2),transparent_70%)] z-0"></div>
      
      <div className="max-w-4xl mx-auto text-left lg:text-center relative z-10 flex flex-col items-start lg:items-center">
        {/* 상단 라벨 */}
        <span className="text-[13px] sm:text-sm lg:text-[15px] font-bold text-brand-accent tracking-wider uppercase mb-3.5 lg:mb-[20px] select-none">
          {labelText}
        </span>

        {/* H2 타이틀 */}
        <h2 className="text-[29px] sm:text-3xl lg:text-[44px] font-black tracking-tight lg:tracking-[-0.03em] leading-[1.28] lg:leading-[1.22] whitespace-pre-line keep-all break-keep max-w-[750px] mb-[18px] lg:mb-[24px]">
          {h2Text}
        </h2>

        {/* 설명문 */}
        <p className="text-zinc-200 text-[15px] sm:text-base lg:text-[17px] max-w-xl lg:max-w-[660px] font-medium leading-[1.7] keep-all break-keep mb-6 lg:mb-[32px]">
          {descText}
        </p>

        {/* CTA 버튼 세트 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-[15px] w-full max-w-md lg:mx-auto mb-3.5 lg:mb-[16px]">
          <a
            href={`tel:${siteConfig.phonePlaceholder}`}
            className="w-full sm:w-[200px] h-[54px] lg:h-[56px] flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-extrabold rounded-xl shadow-md transition-all text-center"
          >
            전화로 증상 상담
          </a>
          <a
            href={siteConfig.kakaoUrlPlaceholder}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-[200px] h-[54px] lg:h-[56px] flex items-center justify-center bg-[#fee500] hover:bg-[#fdd835] text-black text-base font-extrabold rounded-xl transition-all text-center"
          >
            사진 보내 상담
          </a>
        </div>

        {/* 보조 안내 */}
        <p className="text-zinc-400 text-[13px] lg:text-[13px] font-semibold tracking-wide leading-relaxed">
          사진을 함께 보내주시면 증상 확인에 도움이 됩니다.
        </p>
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
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-lg">
              <Image
                src="/images/brand/rainguard-logo-symbol.webp"
                alt="레인가드 로고"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight block leading-tight">{siteConfig.brandName}</span>
              <span className="text-zinc-600 text-xs font-semibold block mt-0.5">충남 전역 서비스 지점</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-600 border-t border-zinc-900/50">
          <p>&copy; {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span>사업자 명: <strong className="text-zinc-400 font-semibold">김재현</strong></span>
            <span>&bull;</span>
            <span>상호명: <strong className="text-zinc-400 font-semibold">올케어 서비스</strong></span>
            <span>&bull;</span>
            <span>사업자 번호: <strong className="text-zinc-400 font-semibold">405-15-02677</strong></span>
            <span>&bull;</span>
            <span>
              연락처:{" "}
              <a 
                href={`tel:${siteConfig.phonePlaceholder}`}
                className="text-brand-accent hover:underline font-extrabold hover:text-brand-accent-hover transition-colors"
              >
                {siteConfig.phonePlaceholder}
              </a>
            </span>
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
