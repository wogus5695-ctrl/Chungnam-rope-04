import { validateRegionsData, getFlatRegions } from "../src/lib/keyword.js";
import { services } from "../src/data/services.js";

const validation = validateRegionsData();
console.log("=== 데이터 검증 결과 ===");
console.log("지역 데이터 유효성:", validation.isValid ? "정상 (PASS)" : "오류 (FAIL)");
if (!validation.isValid) {
  console.error("오류 목록:", validation.errors);
  process.exit(1);
}

const flatRegions = getFlatRegions();
console.log(`등록된 테스트 읍면동 수: ${flatRegions.length}개`);
flatRegions.forEach(r => {
  console.log(` - ${r.fullName} (대표명: ${r.name}, Alias: [${r.aliases.join(", ")}])`);
});

console.log(`등록된 서비스 수: ${services.length}개`);
services.forEach(s => {
  console.log(` - ${s.name} (${s.slug})`);
});

console.log("========================");
export {};
