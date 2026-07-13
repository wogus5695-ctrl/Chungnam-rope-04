import { regions } from "@/data/regions";
import { services } from "@/data/services";

import { RegionData } from "@/types";

// 평탄화된 읍면동 및 구 목록을 얻어오는 헬퍼 함수
export interface FlatRegion {
  name: string;      // 성정동
  fullName: string;  // 천안시 서북구 성정동
  canonicalName: string; // 성정동
  parentName: string; // 서북구 또는 아산시 등 상위 명칭
  rootParentName: string; // 천안시 또는 아산시 등 최상위 명칭
  aliases: string[];
}

export function getFlatRegions(): FlatRegion[] {
  const list: FlatRegion[] = [];

  function traverse(node: RegionData, parentPath: string[] = [], parentName: string = "", rootParentName: string = "") {
    const currentPath = [...parentPath, node.name];
    const fullName = currentPath.join(" ");

    const currentRoot = rootParentName || node.name;
    const isMatchTarget = node.name.endsWith("읍") || node.name.endsWith("면") || node.name.endsWith("동") || node.name.endsWith("시") || node.name.endsWith("군");
    
    if (isMatchTarget) {
      list.push({
        name: node.name,
        fullName,
        canonicalName: node.name,
        parentName: parentName,
        rootParentName: currentRoot,
        aliases: node.alias || []
      });
    }

    if (node.subRegions) {
      node.subRegions.forEach((sub: RegionData) => {
        traverse(sub, currentPath, node.name, currentRoot);
      });
    }
  }

  regions.forEach(r => traverse(r, [], r.name, ""));
  return list;
}

export interface ParsedKeyword {
  region: FlatRegion;
  service: typeof services[0];
  isAlias: boolean;
  canonicalKey: string; // 배방읍-창틀코킹
}

export function parseKeyword(k: string | null | undefined): ParsedKeyword | null {
  if (!k) return null;

  // k는 "배방읍-창틀코킹" 형식 또는 alias 매칭
  const parts = k.split("-");
  if (parts.length !== 2) return null;

  const [regionInput, serviceInput] = parts;

  // 서비스 검증
  const service = services.find(s => s.name === serviceInput || s.slug === serviceInput);
  if (!service) return null;

  // 지역 매칭 (대표명 또는 alias)
  const flatRegions = getFlatRegions();
  
  // 1. 대표명 매칭
  let region = flatRegions.find(r => r.name === regionInput);
  let isAlias = false;

  // 2. 대표명이 없으면 alias 매칭
  if (!region) {
    region = flatRegions.find(r => r.aliases.includes(regionInput));
    if (region) {
      isAlias = true;
    }
  }

  if (!region) return null;

  // 지역 또는 서비스 입력 형태가 canonical 표준 표기와 불일치할 시 alias 리디렉션 강제화
  if (regionInput !== region.name || serviceInput !== service.name) {
    isAlias = true;
  }

  const canonicalKey = `${region.name}-${service.name}`;

  return {
    region,
    service,
    isAlias,
    canonicalKey
  };
}

// 중복 지역 검증 함수
export function validateRegionsData(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const namesSet = new Set<string>();

  // 1. 대표 지역명 중복 검증
  const flatRegions = getFlatRegions();
  flatRegions.forEach(r => {
    if (namesSet.has(r.fullName)) {
      errors.push(`중복된 대표 지역 경로 발견: ${r.fullName}`);
    }
    namesSet.add(r.fullName);
  });

  // 2. 전체 시/군 대표명 중복 검증
  const rootNames = new Set<string>();
  regions.forEach(r => {
    if (rootNames.has(r.name)) {
      errors.push(`중복된 대표 시/군 발견: ${r.name}`);
    }
    rootNames.add(r.name);
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getFAQList(customFaqs: { q: string; a: string }[] | undefined, dynamicRegionName: string | undefined, dynamicServiceName: string | undefined) {
  const defaultFaqs = [
    { q: "창틀 누수가 일어나는 가장 주요한 원인은 무엇인가요?", a: "기본적으로 오랜 시간 자외선 및 기온 변화에 노출되며 마감 코킹이 노후화되어 갈라지는 현상과 함께, 주변 외벽 콘크리트에 생긴 미세한 거미줄형 균열로 빗물이 침입하는 것이 주요인입니다." },
    { q: "기존 실리콘을 제거하지 않고 그 위에 덧방(덧칠) 시공을 하나요?", a: "레인가드는 접착력이 현저히 감소한 노후 실리콘을 최대한 칼로 긁어내 완전히 걷어낸 후 새 제품으로 시공하는 것을 철칙으로 삼습니다. 접착면에 부유물이 남아 있으면 금방 다시 누수가 일어나기 때문입니다." },
    { q: "비가 오지 않는 화창한 날씨에도 누수 점검이 가능한가요?", a: "네, 가능합니다. 비가 오지 않을 때 외벽 균열 상태와 기존 실리콘의 노화 들뜸 정도를 훨씬 정밀하게 육안으로 파악하고 손으로 만져볼 수 있기 때문에 화창한 날 점검 및 진단을 받고 보수를 선점하시는 편이 현명합니다." }
  ];

  const hasDynamic = !!(dynamicRegionName && dynamicServiceName);
  const baseFaqs = customFaqs && customFaqs.length > 0 ? [...customFaqs] : [...defaultFaqs];

  // 공통 백업용 질문 풀
  const commonFaqsPool = [
    {
      q: "사진만으로 작업 범위와 비용을 알 수 있나요?",
      a: "사진으로 증상과 작업 부위를 1차 확인할 수 있지만, 최종 작업 범위와 비용은 건물 구조, 층수, 접근 조건과 기존 손상 상태에 따라 달라질 수 있습니다."
    },
    {
      q: "비가 온 직후에도 작업할 수 있나요?",
      a: "작업면에 수분이 남아 있으면 접착과 양생에 영향을 줄 수 있습니다. 현장 상태와 날씨를 확인한 뒤 작업 가능 시점을 안내합니다."
    },
    {
      q: "고층 건물도 로프 작업이 가능한가요?",
      a: "건물 구조, 옥상 진입, 로프 설치 위치와 안전 확보 가능 여부를 먼저 확인해야 합니다. 현장 조건에 따라 장비와 작업 방식이 달라질 수 있습니다."
    },
    {
      q: "충청남도 전 지역에 방문 가능한가요?",
      a: "지역과 일정, 건물 구조와 작업 조건을 확인한 뒤 방문 가능 여부를 안내합니다."
    },
    {
      q: "작업 기간은 얼마나 걸리나요?",
      a: "작업 면적, 기존 재료 제거 범위, 균열 상태, 장비와 인원 투입 조건에 따라 달라집니다. 정확한 일정은 작업 범위를 확인한 뒤 안내합니다."
    }
  ];

  // 1. 서비스 전용 FAQ 3개 또는 4개 추출
  let displayFaqs = baseFaqs.slice(0, 4);

  // 2. 5개가 될 때까지 공통 질문 풀에서 보충 (중복 방지)
  for (const commonFaq of commonFaqsPool) {
    if (displayFaqs.length >= 5) break;
    const isDuplicate = displayFaqs.some(df => df.q === commonFaq.q || df.q.includes(commonFaq.q.substring(0, 8)));
    if (!isDuplicate) {
      displayFaqs.push(commonFaq);
    }
  }

  // 3. 정확 일치 키워드 주입 (FAQ 5개 중 첫 번째 질문/답변에만 자연스럽게 딱 1회 주입)
  if (hasDynamic && displayFaqs.length > 0) {
    displayFaqs = displayFaqs.map((item, idx) => {
      if (idx === 0) {
        // 첫 번째 답변 뒤에 자연스럽게 접목
        return {
          q: item.q,
          a: `${dynamicRegionName} ${dynamicServiceName} 작업 전에는 기존 상태와 빗물 유입 경로를 함께 확인합니다. ${item.a}`
        };
      }
      return item;
    });
  }

  return displayFaqs.slice(0, 5);
}
