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
