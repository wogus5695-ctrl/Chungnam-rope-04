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
    { q: "창틀 누수의 주요 원인은 무엇인가요?", a: "시간이 지나면서 실리콘 코킹이 노후되어 갈라지고, 외벽 미세 균열로 빗물이 침투하는 것이 주요 원인입니다." },
    { q: "기존 실리콘을 제거하지 않고 덧방 시공을 하나요?", a: "기존 코킹의 접착 상태와 손상 범위에 따라 철거 여부를 결정합니다. 접착력이 풀린 부위에 덧칠을 하면 재누수가 발생할 수 있으므로 상태에 맞게 보수합니다." },
    { q: "비가 오지 않는 화창한 날에도 점검이 가능한가요?", a: "네, 화창한 날씨에 외벽 균열과 실리콘 노후 상태를 더 정밀하게 확인할 수 있어 사전 점검 및 시공을 권장합니다." }
  ];

  const baseFaqs = customFaqs && customFaqs.length > 0 ? customFaqs.map(f => ({ ...f })) : [...defaultFaqs];

  if (envType && envType !== "일반 혼합형") {
    const envFaq = getEnvFAQItem(envType);
    if (baseFaqs.length >= 5) {
      baseFaqs[4] = envFaq;
    } else {
      baseFaqs.push(envFaq);
    }
  }

  // FAQ 5개 유지 및 질문 단축 (의미 유지)
  const displayFaqs = baseFaqs.slice(0, 5).map(item => {
    let q = item.q;
    if (q.includes("가장 주요한 원인은")) q = "창틀 누수의 주요 원인은 무엇인가요?";
    else if (q.includes("기존 실리콘을 왜 긁어내고")) q = "기존 실리콘을 철거하고 시공해야 하나요?";
    else if (q.includes("덧방(기존 실리콘 위에 덧칠) 시공을 하면 안 되나요")) q = "기존 실리콘 위에 덧칠해도 되나요?";
    else if (q.includes("일반 실리콘과 다른가요")) q = "창틀 전용 실리콘은 일반 제품과 다른가요?";
    else if (q.includes("소음이나 먼지가 많이 발생하나요")) q = "작업 시 먼지나 소음이 많이 나나요?";
    else if (q.includes("빗물 차단 효과는 얼마나 유지되나요")) q = "보수 후 얼마나 유지되나요?";
    else if (q.includes("특정 창가에서만 물이 스며드는 이유")) q = "특정 창문에서만 비가 새는 이유는?";
    else if (q.includes("벽지가 젖어 들어가는데 즉시 공사해야 하나요")) q = "벽지가 젖으면 바로 공사해야 하나요?";
    else if (q.includes("윗집 누수로 인해서 우리 집 창틀에")) q = "윗세대 틈으로도 빗물이 들어오나요?";
    else if (q.includes("가구나 바닥 오염을 방지해 주시나요")) q = "실내 가구 오염 방지 보양을 해주나요?";
    else if (q.includes("수분 측정기를 사용하나요")) q = "누수 점검 시 수분 측정기를 사용하나요?";
    else if (q.includes("태풍이나 강풍이 불 때만 비가 새고")) q = "강풍이 불 때만 비가 새는 이유는?";
    else if (q.includes("윗세대의 외부 틈을 타고 흘러내리는")) q = "윗세대 틈으로도 빗물이 들어오나요?";
    else if (q.includes("비가 내리는 중에도 빗물 누수 보수 작업이")) q = "비 오는 날에도 보수할 수 있나요?";
    else if (q.includes("얼마 동안 수압 저항력이 지속되나요")) q = "보수 후 얼마나 유지되나요?";
    else if (q.includes("외벽 로프 조사를 병행하나요")) q = "고층 외벽도 로프 조사를 진행하나요?";
    else if (q.includes("입주민이나 공용 공간에 피해는 없나요")) q = "고층 작업 시 입주민에 영향이 있나요?";
    else if (q.includes("부분 보수만 할 수도 있나요")) q = "전체 공사 없이 부분 보수만 가능한가요?";
    return { q, a: item.a };
  });

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

