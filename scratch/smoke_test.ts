import { parseKeyword, getFlatRegions } from "../src/lib/keyword";
import { services } from "../src/data/services";

// 테스트할 6대 대표 조합 목록
const testCases = [
  "배방읍-창틀코킹",
  "배방읍-외벽누수",
  "성정동-빗물누수",
  "성정동-샷시실리콘",
  "안면읍-창틀누수",
  "송악읍-창틀실리콘"
];

console.log("=== [9단계] 통합 QA 자동 검사 진행 ===");

// 1. 대표 테스트 조합 확인
testCases.forEach(tc => {
  const parsed = parseKeyword(tc);
  if (!parsed) {
    console.error(`❌ 테스트 실패: 키워드 분리 오류 [${tc}]`);
    process.exit(1);
  }
  if (parsed.isAlias) {
    console.error(`❌ 테스트 실패: canonical 키워드가 alias로 인식됨 [${tc}]`);
    process.exit(1);
  }
  console.log(`✅ 통과: ${tc} -> 지역: ${parsed.region.fullName}, 서비스: ${parsed.service.name}`);
});

// 2. 전체 지역(180개) * 서비스 6종 (총 1,080개 조합) 검증
const flatRegions = getFlatRegions();
let totalSuccess = 0;

flatRegions.forEach(r => {
  services.forEach(s => {
    const key = `${r.name}-${s.name}`;
    const parsed = parseKeyword(key);
    if (!parsed || parsed.isAlias || parsed.canonicalKey !== key) {
      console.error(`❌ 조합 생성 오류 발견: [${key}]`);
      process.exit(1);
    }
    totalSuccess++;
  });
});

console.log(`✅ 100% 검증 통과: 총 ${totalSuccess}개 전량 조합에 대한 URL 파싱 및 정규화 오류 없음!`);
console.log("=======================================");
export {};
