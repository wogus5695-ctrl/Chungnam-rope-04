import { ServiceData } from "@/types";

export type RegionEnvType =
  | "해안형"
  | "도심 공동주택형"
  | "산업시설형"
  | "농촌·저층형"
  | "도심·산업 복합형"
  | "해안·산업 복합형"
  | "일반 도심·저층형"
  | "신도시 공동주택형"
  | "읍·면 저층 혼합형"
  | "일반 혼합형";

// 충청남도 및 대전·세종 표본 시·군·구·읍·면·동 환경 유형 맵
const envMap: Record<string, RegionEnvType> = {
  // 충남 15개 시·군 기본 분류
  "천안시": "도심 공동주택형",
  "아산시": "도심·산업 복합형",
  "당진시": "해안·산업 복합형",
  "서산시": "도심·산업 복합형",
  "태안군": "해안형",
  "보령시": "해안형",
  "논산시": "농촌·저층형",
  "공주시": "농촌·저층형",
  "계룡시": "도심 공동주택형",
  "금산군": "농촌·저층형",
  "부여군": "농촌·저층형",
  "서천군": "해안형",
  "청양군": "농촌·저층형",
  "홍성군": "도심·산업 복합형",
  "예산군": "농촌·저층형",

  // 읍·면·동 세부 특성 오버라이드 (충남)
  "성정동": "도심 공동주택형",
  "불당동": "도심 공동주택형",
  "쌍용동": "도심 공동주택형",
  "직산읍": "산업시설형",
  "성거읍": "산업시설형",
  "배방읍": "도심·산업 복합형",
  "탕정면": "산업시설형",
  "음봉면": "산업시설형",
  "송악면": "농촌·저층형",
  "도고면": "농촌·저층형",
  "송악읍": "해안·산업 복합형",
  "석문면": "산업시설형",
  "신평면": "해안형",
  "합덕읍": "농촌·저층형",
  "대산읍": "산업시설형",
  "지곡면": "산업시설형",
  "동문동": "도심 공동주택형",
  "안면읍": "해안형",
  "태안-남면": "해안형",
  "소원면": "해안형",
  "원북면": "해안형",
  "대천동": "해안형",
  "웅천읍": "해안형",
  "오천면": "해안형",
  "홍북읍": "도심 공동주택형",
  "홍성읍": "도심 공동주택형",
  "삽교읍": "도심 공동주택형",
  "고덕면": "산업시설형",
  "신관동": "도심 공동주택형",
  "취암동": "도심 공동주택형",
  "장항읍": "해안·산업 복합형",

  // 대전광역시 표본
  "대전": "도심 공동주택형",
  "대전시": "도심 공동주택형",
  "동구": "일반 도심·저층형",
  "중구": "일반 도심·저층형",
  "서구": "도심 공동주택형",
  "유성구": "도심 공동주택형",
  "대덕구": "도심·산업 복합형",
  "둔산동": "도심 공동주택형",
  "관저동": "도심 공동주택형",
  "노은동": "도심 공동주택형",
  "신탄진동": "도심·산업 복합형",

  // 세종특별자치시 전체 읍·면·동
  "세종": "신도시 공동주택형",
  "세종시": "신도시 공동주택형",
  "조치원읍": "읍·면 저층 혼합형",
  "연기면": "읍·면 저층 혼합형",
  "연동면": "읍·면 저층 혼합형",
  "부강면": "읍·면 저층 혼합형",
  "금남면": "읍·면 저층 혼합형",
  "장군면": "읍·면 저층 혼합형",
  "연서면": "읍·면 저층 혼합형",
  "전의면": "읍·면 저층 혼합형",
  "전동면": "읍·면 저층 혼합형",
  "소정면": "읍·면 저층 혼합형"
};

export function getRegionEnvType(rootParentName: string, regionName: string, parentName?: string): RegionEnvType {
  if (envMap[regionName]) return envMap[regionName];
  if (parentName && envMap[parentName]) return envMap[parentName];
  if (envMap[rootParentName]) return envMap[rootParentName];
  return "일반 혼합형";
}

export function getRegionLevel(regionName: string): "시·군" | "구" | "읍·면" | "동" {
  if (regionName.endsWith("시") || regionName.endsWith("군") || regionName === "대전" || regionName === "세종") return "시·군";
  if (regionName.endsWith("구")) return "구";
  if (regionName.endsWith("읍") || regionName.endsWith("면")) return "읍·면";
  return "동";
}

export function getLevelSuffix(regionName: string): string {
  const lvl = getRegionLevel(regionName);
  switch (lvl) {
    case "시·군":
      return `${regionName} 전역 관내 중심`;
    case "구":
      return `${regionName} 관할 구역`;
    case "읍·면":
      return `${regionName} 읍·면 지역 밀착`;
    case "동":
    default:
      return `${regionName} 도심 주거 단지`;
  }
}

export function getEnvDescription(envType: RegionEnvType, regionName: string, serviceName: string): string {
  const lvlSuffix = getLevelSuffix(regionName);
  switch (envType) {
    case "해안형":
      return `${regionName}(${lvlSuffix}) 지역은 해안과 인접하여 강한 외부 비바람 및 습기에 노출될 가능성이 있습니다. 건물 외벽 마감재 접합부와 지붕·창호 테두리의 이격 상태를 우선적으로 함께 점검하는 것이 유리합니다.`;
    case "도심 공동주택형":
      return `${regionName}(${lvlSuffix}) 도심 공동주택 및 상가 건물 환경에서는 고층 창호 실리콘 들뜸과 옥상 난간 파라펫, 우수 배수관 테두리 조인을 우선적으로 점검하는 편이 유리합니다. 전문 로프 접근 및 공용 공간 보양 조건에 맞춰 안전하게 작업 범위를 산정합니다.`;
    case "산업시설형":
      return `${regionName}(${lvlSuffix}) 산업 및 물류 환경에서는 공장·창고 건물 판넬 지붕의 고정 피스 와셔 부식, 용마루 이음새 틈, 대형 창호 조인트의 유격을 꼼꼼하게 확인할 필요가 있습니다.`;
    case "농촌·저층형":
      return `${regionName}(${lvlSuffix}) 저층 주택 및 일반 건물 환경에서는 노후 방수층 부풀음과 지붕·외벽 이음새 상태를 확인하여 전면 재시공 대신 알맞은 부분 보수를 검토할 수 있습니다.`;
    case "도심·산업 복합형":
      return `${regionName}(${lvlSuffix}) 도심 및 산업시설 복합 환경에서는 공장·창고·상가가 혼재된 건물의 판넬 지붕 용마루 이음부, 피스·와셔 고정부, 외벽 판넬 조인트를 우선적으로 점검합니다. 넓은 작업 면적과 구조체 거동 특성에 맞춰 정밀 보수를 안내합니다.`;
    case "해안·산업 복합형":
      return `${regionName}(${lvlSuffix}) 해안 및 산업 복합 환경에서는 비바람 영향과 판넬/금속 지붕 구조체의 신축 거동 특성을 감안해 용마루 틈새와 볼트 패킹, 이음새 조인트를 점검해야 합니다.`;
    case "일반 도심·저층형":
      return `${regionName}(${lvlSuffix}) 원도심 및 저층 상가·주택 혼재 환경에서는 노후 외벽 균열과 기존 방수층 이격을 우선 점검합니다. 건물 구조와 노화 정도에 따라 전면 공사 대신 꼭 필요한 부위 위주의 알맞은 부분 보수 범위를 구별합니다.`;
    case "신도시 공동주택형":
      return `${regionName}(${lvlSuffix}) 신도시 공동주택 및 업무시설 환경에서는 고층 창호 접합부, 옥상 구조물 기초, 파라펫 난간 및 배수구 테두리를 우선적으로 점검합니다. 단지 내 공용부 작업 조건과 로프 접근 여건을 종합 고려합니다.`;
    case "읍·면 저층 혼합형":
      return `${regionName}(${lvlSuffix}) 읍·면 저층 건물 및 소규모 사업장 환경에서는 단독주택, 저층 상가, 창고의 노후 지붕 이음새와 기존 방수층 상태를 점검합니다. 현장 조건에 맞춰 불필요한 공사를 피하고 부분 보수 가능 범위를 안내합니다.`;
    case "일반 혼합형":
    default:
      return `${regionName}(${lvlSuffix}) 현장의 건물 위치, 층수, 외벽 마감재 및 지붕 구조적 특징을 종합적으로 고려하여 현장 상태에 최적화된 방수 및 코킹 점검 범위를 안내합니다.`;
  }
}

export function getEnvHeroSubtitle(envType: RegionEnvType, baseSubtitle: string): string {
  switch (envType) {
    case "해안형":
      return `${baseSubtitle} 해안 비바람 및 외부 습기 노출 조건까지 다각도로 고려하여 보수 범위를 조율합니다.`;
    case "도심 공동주택형":
      return `${baseSubtitle} 공동주택·상가의 고층 창호 및 옥상 파라펫 접근 조건을 고려해 점검합니다.`;
    case "산업시설형":
      return `${baseSubtitle} 공장·창고 대형 판넬 및 피스 고정부의 작업 면적 여건에 맞춰 시공합니다.`;
    case "농촌·저층형":
      return `${baseSubtitle} 단독주택 및 저층 건물의 노후 방수층을 확인해 불필요한 공사를 피하고 부분 보수를 정립합니다.`;
    case "도심·산업 복합형":
      return `${baseSubtitle} 공장·창고 및 사업장의 대형 판넬 지붕·외벽 이음새와 피스 고정부 조건을 검토합니다.`;
    case "해안·산업 복합형":
      return `${baseSubtitle} 해풍 영향과 판넬/금속 건물 이음부 수축 거동을 고려하여 기밀 보강을 실시합니다.`;
    case "일반 도심·저층형":
      return `${baseSubtitle} 원도심 주택 및 저층 상가의 노후 외벽과 기존 방수층 상태를 확인해 부분 보수를 정립합니다.`;
    case "신도시 공동주택형":
      return `${baseSubtitle} 신도시 공동주택·업무시설의 고층 창호 및 옥상 구조물 공용부 작업을 고려해 점검합니다.`;
    case "읍·면 저층 혼합형":
      return `${baseSubtitle} 읍·면 단독주택 및 저층 상가의 노후 지붕·방수층을 확인해 부분 보수 범위를 정립합니다.`;
    case "일반 혼합형":
    default:
      return baseSubtitle;
  }
}

export function getEnvCheckPoint(envType: RegionEnvType): string {
  switch (envType) {
    case "해안형":
      return "외부 비바람 및 강풍 수압 노출 위치와 금속/창호 접합부 씰링 밀착 상태";
    case "도심 공동주택형":
      return "아파트/상가 고층 로프 접근성, 옥상 파라펫 옹벽 손상 및 공용 공간 보양 여건";
    case "산업시설형":
      return "대형 판넬 지붕/외벽 겹침 조인트 길이 및 피스 와셔 방수 캡 충진 수량";
    case "농촌·저층형":
      return "저층 건물 바탕면 노후 방수층 절개 범위 및 국소 부분 보수 적용성";
    case "도심·산업 복합형":
      return "판넬 지붕/외벽 겹침 조인트, 고정 피스·와셔 방수 캡 및 대형 작업 면적 구배";
    case "해안·산업 복합형":
      return "해풍 저항형 내후성 하이브리드 시트 및 피스 볼트 패킹 보강 범위";
    case "일반 도심·저층형":
      return "원도심 저층 상가·주택 외벽 균열 및 기존 방수층 들뜸, 국소 부분 보수 적용 가능성";
    case "신도시 공동주택형":
      return "신도시 공동주택 고층 창호 접합부, 옥상 구조물 기초, 파라펫 난간 및 공용부 작업 조건";
    case "읍·면 저층 혼합형":
      return "읍·면 단독주택/저층 상가 지붕 이음새, 노후 방수층 바닥 및 부분 보수 가능 범위";
    case "일반 혼합형":
    default:
      return "건물 층수, 작업 면적, 로프 접근성 및 기존 마감재 노후 손상도";
  }
}

export function getEnvProcessStep1(envType: RegionEnvType): string {
  switch (envType) {
    case "해안형":
      return "1단계: 외부 비바람 노출 각도 및 창호/금속 접합 조인트 유격 현장 진단";
    case "도심 공동주택형":
      return "1단계: 공동주택·상가 고층 창호 및 옥상 파라펫 옹벽 손상 현장 진단";
    case "산업시설형":
      return "1단계: 대형 판넬 지붕/외벽 겹침선 및 고정 피스 와셔 부식 진단";
    case "농촌·저층형":
      return "1단계: 저층 주택 바닥/지붕 노후 방수층 및 부분 보수 적용 가능성 진단";
    case "도심·산업 복합형":
      return "1단계: 공장·창고 판넬 지붕 겹침선 및 고정 피스 부식·유격 현장 진단";
    case "해안·산업 복합형":
      return "1단계: 해풍 영향 및 판넬/금속 지붕 조인트 피스 이격 진단";
    case "일반 도심·저층형":
      return "1단계: 원도심 저층 건물의 외벽 균열 및 노후 방수층 부분 보수 적합성 진단";
    case "신도시 공동주택형":
      return "1단계: 신도시 공동주택·업무시설 고층 창호 및 옥상 구조물 배수관 진단";
    case "읍·면 저층 혼합형":
      return "1단계: 읍·면 저층 주택·상가 지붕 이음새 및 노후 방수층 부분 보수 범위 진단";
    case "일반 혼합형":
    default:
      return "1단계: 현장 건물 구조 및 외부 마감 손상 상태 진단";
  }
}

export function getEnvFAQItem(envType: RegionEnvType): { q: string; a: string } {
  switch (envType) {
    case "해안형":
      return {
        q: "바람이 강하거나 외부 습기에 노출되기 쉬운 위치의 건물은 수명이 다른가요?",
        a: "비바람의 영향을 수시로 받는 건물은 마감재 접합부에 변응형 고신율 내후성 실란트를 적용하여 신축 유연성을 확보하는 것이 바람직합니다."
      };
    case "도심 공동주택형":
      return {
        q: "아파트나 상가 고층 창틀 공사 시 입주민이나 공용 공간에 피해는 없나요?",
        a: "전문 로프 접근 시스템을 적용하고 실내외 보양 작업을 거쳐 공용 공간 오염과 피해를 예방하며 점검합니다."
      };
    case "산업시설형":
      return {
        q: "공장이나 창고처럼 지붕 면적이 넓은 건물도 부분 보수가 가능한가요?",
        a: "전체 재시공 없이 빗물이 유입되는 판넬 겹침선과 피스 볼트 캡 부위 위주로 정밀 부분 방수 처리가 가능합니다."
      };
    case "농촌·저층형":
      return {
        q: "저층 주택 옥상이나 지붕의 오래된 방수층을 전체 철거해야 하나요?",
        a: "방수층 부풀음이 국소적이고 슬래브 상태가 양호하면 불필요한 전체 철거 없이 노후 부위 면처리 후 부분 보수를 진행합니다."
      };
    case "도심·산업 복합형":
      return {
        q: "공장이나 창고처럼 판넬 지붕 면적이 넓은 건물도 부분 방수가 가능한가요?",
        a: "전체 재시공 없이 빗물이 유입되는 판넬 용마루 겹침선과 피스 볼트 캡 부위를 중심으로 정밀 부분 방수를 진행할 수 있습니다."
      };
    case "해안·산업 복합형":
      return {
        q: "해풍과 진동 노출이 있는 판넬 건물 지붕 방수는 어떻게 진행되나요?",
        a: "바람에 들뜨기 쉬운 용마루와 판넬 겹침선에 고밀착 방수 테이핑과 전용 피스 캡을 씌워 수압을 차단합니다."
      };
    case "일반 도심·저층형":
      return {
        q: "원도심 저층 건물이나 상가 주택도 전체 공사 없이 부분 방수가 가능한가요?",
        a: "건물 전체를 재시공하지 않고 빗물이 직접 들어오는 외벽 균열과 누수 유입 부위를 우선 선택적으로 보수할 수 있습니다."
      };
    case "신도시 공동주택형":
      return {
        q: "신도시 아파트나 업무용 건물 옥상 방수 점검 시 공용 공간 조건은 어떻게 되나요?",
        a: "옥상 구조물 기초 및 배수관 테두리 상태를 정밀 체크하며, 단지 내 관리 기준과 공용 공간 보양 수칙을 준수하여 진단합니다."
      };
    case "읍·면 저층 혼합형":
      return {
        q: "읍·면 지역 단독주택이나 저층 건물 지붕도 부분 보수가 가능한가요?",
        a: "노후 상태를 정밀 점검한 후 지붕 이음새나 결함 부위 위주로 알맞은 부분 보수를 검토하여 불필요한 지출을 방지합니다."
      };
    case "일반 혼합형":
    default:
      return {
        q: "건물 위치나 구조에 따라 방수 공법 선택이 왜 중요한가요?",
        a: "층수, 외벽 재질, 옥상 구배에 따라 유입 수압과 마모도가 다르므로 현장 상태에 최적화된 공법을 매칭해야 재발을 방지합니다."
      };
  }
}

export function sortRelativeServices(servicesList: ServiceData[], activeServiceName: string, envType: RegionEnvType): ServiceData[] {
  const filtered = servicesList.filter(s => s.name !== activeServiceName);
  
  let preferredNames: string[] = [];

  if (activeServiceName === "옥상방수") {
    preferredNames = ["우레탄방수", "건물방수", "지붕방수", "빗물누수", "외벽방수"];
  } else if (activeServiceName === "지붕방수" && (envType === "도심·산업 복합형" || envType === "산업시설형" || envType === "해안·산업 복합형")) {
    preferredNames = ["건물방수", "외벽방수", "빗물누수", "옥상방수", "우레탄방수"];
  } else if (activeServiceName === "창틀실리콘") {
    preferredNames = ["창틀코킹", "샷시실리콘", "창틀누수", "외벽누수", "빗물누수"];
  } else if (envType === "해안형") {
    preferredNames = ["지붕방수", "외벽방수", "샷시실리콘", "빗물누수", "우레탄방수"];
  } else if (envType === "도심 공동주택형" || envType === "신도시 공동주택형") {
    preferredNames = ["창틀코킹", "옥상방수", "창틀누수", "우레탄방수", "외벽방수"];
  } else if (envType === "도심·산업 복합형" || envType === "산업시설형" || envType === "해안·산업 복합형") {
    preferredNames = ["지붕방수", "건물방수", "우레탄방수", "외벽방수", "샷시실리콘"];
  } else if (envType === "일반 도심·저층형" || envType === "읍·면 저층 혼합형" || envType === "농촌·저층형") {
    preferredNames = ["외벽방수", "옥상방수", "건물방수", "창틀코킹", "지붕방수"];
  }

  if (preferredNames.length > 0) {
    filtered.sort((a, b) => {
      const idxA = preferredNames.indexOf(a.name);
      const idxB = preferredNames.indexOf(b.name);
      const scoreA = idxA === -1 ? 99 : idxA;
      const scoreB = idxB === -1 ? 99 : idxB;
      return scoreA - scoreB;
    });
  }

  return filtered.slice(0, 5);
}
