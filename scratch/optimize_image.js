import sharp from "sharp";
import path from "path";
import fs from "fs";

const sourcePath = "C:/Users/wogus/.gemini/antigravity/brain/3d9960c6-9a48-41b6-88c5-662881fb253f/media__1783767710402.jpg";
const destDir = "C:/Users/wogus/OneDrive/Desktop/로프_충남_레인가드/public/images/seo";
const destPath = path.join(destDir, "rainguard-search-thumbnail.jpg");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 100KB 이상을 맞추기 위해 품질 및 설정을 조절
sharp(sourcePath)
  .resize({
    width: 1200,
    height: 630,
    fit: "cover",
    position: "center"
  })
  .toFormat("jpeg", {
    quality: 85, // 품질 소폭 상향
    chromaSubsampling: "4:4:4",
    force: true
  })
  .toFile(destPath)
  .then((info) => {
    console.log("Image processed successfully:", info);
    console.log("File size in bytes:", fs.statSync(destPath).size);
  })
  .catch((err) => {
    console.error("Error processing image:", err);
  });
