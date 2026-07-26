import { regions } from "@/data/regions";
import { services } from "@/data/services";
import { getEnvFAQItem, RegionEnvType } from "@/lib/regionEnv";

import { RegionData } from "@/types";

// 평탄화된 읍면동 및 구 목록을 얻어오는 헬퍼 함수
export interface FlatRegion {
  name: string;      // 성정동, 남면
  keywordName: string; // 성정동, 태안-남면, 부여-남면
  displayName: string; // 성정동, 태안 남면, 부여 남면
  fullName: string;  // 천안시 서북구 성정동, 태안군 남면
  canonicalName: string; // 성정동, 남면
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
    const isMatchTarget =
      node.name.endsWith("읍") ||
      node.name.endsWith("면") ||
      node.name.endsWith("동") ||
      node.name.endsWith("시") ||
      node.name.endsWith("군") ||
      node.name.endsWith("구") ||
      node.name === "대전" ||
      node.name === "세종";
    
    if (isMatchTarget) {
      const keywordName = node.keywordName || node.name;
      const displayName = node.keywordName ? node.keywordName.replace("-", " ") : node.name;

      list.push({
        name: node.name,
        keywordName,
        displayName,
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
  canonicalKey: string; // 배방읍-창틀코킹, 태안-남면-옥상방수
}

export function parseKeyword(k: string | null | undefined): ParsedKeyword | null {
  if (!k) return null;

  // 작업명 목록을 기준으로 URL의 끝부분에서 유효한 작업명을 먼저 찾고, 앞부분 전체를 지역 키워드로 처리
  const service = services.find(s => k.endsWith(`-${s.name}`) || k.endsWith(`-${s.slug}`));
  if (!service) return null;

  const matchedServiceStr = service.name === k.slice(-service.name.length) 
    ? service.name 
    : (service.slug && service.slug === k.slice(-service.slug.length) ? service.slug : service.name);

  const regionInput = k.slice(0, k.length - matchedServiceStr.length - 1);
  if (!regionInput) return null;

  const flatRegions = getFlatRegions();
  
  // 1. keywordName 고유 식별명 우선 매칭 (예: "태안-남면", "부여-남면", "배방읍")
  let region = flatRegions.find(r => r.keywordName === regionInput);
  let isAlias = false;

  // 2. keywordName으로 없으면 대표명으로 매칭 (기존 단일 "남면" 요청 시 첫 번째 태안군 남면 매칭)
  if (!region) {
    region = flatRegions.find(r => r.name === regionInput);
  }

  // 3. 대표명으로도 없으면 alias 매칭
  if (!region) {
    region = flatRegions.find(r => r.aliases.includes(regionInput));
  }

  if (!region) return null;

  const canonicalKey = `${region.keywordName}-${service.name}`;

  // 입력된 k 값이 정규 canonicalKey와 일치하지 않을 시 308 리디렉션 대상(isAlias) 설정
  if (k !== canonicalKey) {
    isAlias = true;
  }

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
  const keywordNamesSet = new Set<string>();

  // 1. 고유 키워드명 중복 검증
  const flatRegions = getFlatRegions();
  flatRegions.forEach(r => {
    if (keywordNamesSet.has(r.keywordName)) {
      errors.push(`중복된 고유 지역 keywordName 발견: ${r.keywordName} (${r.fullName})`);
    }
    keywordNamesSet.add(r.keywordName);
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

export function getFAQList(
  customFaqs: { q: string; a: string }[] | undefined,
  dynamicRegionName: string | undefined,
  dynamicServiceName: string | undefined,
  envType?: RegionEnvType
) {
  const defaultFaqs = [
    { q: "창틀 누수가 일어나는 가장 주요한 원인은 무엇인가요?", a: "기본적으로 오랜 시간 자외선 및 기온 변화에 노출되며 마감 코킹이 노후화되어 갈라지는 현상과 함께, 주변 외벽 콘크리트에 생긴 미세한 거미줄형 균열로 빗물이 침입하는 것이 주요인입니다." },
    { q: "기존 실리콘을 제거하지 않고 그 위에 덧방(덧칠) 시공을 하나요?", a: "기존 실리콘의 접착 상태와 손상 범위에 따라 전면 제거, 부분 제거 또는 보강 범위를 구분합니다. 접착력이 상실된 노후 부위를 방치하고 덧칠하면 다시 누수가 발생할 수 있으므로 현장 상태에 맞추어 보수 범위를 결정하는 것이 중요합니다." },
    { q: "비가 오지 않는 화창한 날씨에도 누수 점검이 가능한가요?", a: "네, 가능합니다. 비가 오지 않을 때 외벽 균열 상태와 기존 실리콘의 노화 들뜸 정도를 훨씬 정밀하게 육안으로 파악하고 손으로 만져볼 수 있기 때문에 화창한 날 점검 및 진단을 받고 보수를 선점하시는 편이 현명합니다." }
  ];

  const hasDynamic = !!(dynamicRegionName && dynamicServiceName);
  let baseFaqs = customFaqs && customFaqs.length > 0 ? customFaqs.map(f => ({ ...f })) : [...defaultFaqs];

  if (envType && envType !== "일반 혼합형") {
    const envFaq = getEnvFAQItem(envType);
    if (baseFaqs.length >= 5) {
      baseFaqs[4] = envFaq;
    } else {
      baseFaqs.push(envFaq);
    }
  }

  let displayFaqs = baseFaqs.slice(0, 5);

  if (hasDynamic && displayFaqs.length > 0) {
    displayFaqs = displayFaqs.map((item, idx) => {
      if (idx === 0) {
        return {
          q: item.q,
          a: `${dynamicRegionName} ${dynamicServiceName} 현장 점검 시에는 건물의 외부 마감과 빗물 유입 경로를 함께 확인합니다. ${item.a}`
        };
      }
      return item;
    });
  }

  return displayFaqs;
}

export function getHeroImageAlt(regionName?: string, serviceName?: string): string {
  if (!regionName || !serviceName) {
    return "충청남도 외벽과 창틀 누수 부위를 점검하는 레인가드 작업자";
  }

  switch (serviceName) {
    case "창틀코킹":
      return `${regionName} 창틀 외부 코킹 상태를 확인하는 작업 모습`;
    case "창틀누수":
      return `${regionName} 창틀 주변 빗물 유입 부위를 점검하는 모습`;
    case "빗물누수":
      return `${regionName} 외부 빗물 유입 경로를 점검하는 레인가드 작업자`;
    case "창틀실리콘":
      return `${regionName} 창틀 실리콘 갈라짐과 접합부를 점검하는 모습`;
    case "샷시실리콘":
      return `${regionName} 샷시 프레임과 외벽 접합부를 확인하는 작업 모습`;
    case "외벽누수":
      return `${regionName} 건물 외벽 균열과 누수 가능 부위를 점검하는 모습`;
    case "외벽방수":
      return `${regionName} 외벽 균열과 접합부 방수 상태를 확인하는 작업 모습`;
    case "옥상방수":
      return `${regionName} 옥상 바닥과 방수층 상태를 점검하는 작업 모습`;
    case "건물방수":
      return `${regionName} 건물 외벽과 방수 취약 부위를 종합 점검하는 모습`;
    case "지붕방수":
      return `${regionName} 판넬 지붕 이음부와 고정부를 점검하는 작업 모습`;
    case "우레탄방수":
      return `${regionName} 옥상 바탕면과 우레탄 방수층 상태를 확인하는 모습`;
    default:
      return `${regionName} ${serviceName} 작업 부위를 점검하는 레인가드 작업 모습`;
  }
}

