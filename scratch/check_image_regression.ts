import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { siteConfig } from "../src/config/site";

console.log("=== [대표 이미지 회귀 방지 검사] ===");

const thumbnailPath = path.join("C:/Users/wogus/OneDrive/Desktop/로프_충남_레인가드/public", siteConfig.SEARCH_THUMBNAIL_PATH);

// 1. 파일 존재 여부 검사
if (!fs.existsSync(thumbnailPath)) {
  console.error("❌ 오류: 대표 이미지 파일이 지정된 경로에 존재하지 않습니다!");
  process.exit(1);
}
console.log("✅ 통과: 대표 이미지 파일 확인");

// 2. 파일 용량 5KB 초과 검사
const stats = fs.statSync(thumbnailPath);
if (stats.size <= 5120) {
  console.error(`❌ 오류: 파일 용량(${stats.size} bytes)이 5KB 이하입니다.`);
  process.exit(1);
}
console.log(`✅ 통과: 파일 용량 검증 완료 (${stats.size} bytes)`);

// 3. 이미지 규격 1200 x 630 검사
sharp(thumbnailPath)
  .metadata()
  .then((metadata) => {
    if (metadata.width !== 1200 || metadata.height !== 630) {
      console.error(`❌ 오류: 이미지 크기 불일치 (${metadata.width}x${metadata.height})`);
      process.exit(1);
    }
    console.log("✅ 통과: 이미지 규격(1200x630px) 일치 확인");
    console.log("========================================");
  })
  .catch((err) => {
    console.error("❌ 이미지 분석 중 오류 발생:", err);
    process.exit(1);
  });
