# SEARCH_THUMBNAIL_QA.md

## 기본 정보
* **고정 파일 경로**: `public/images/seo/rainguard-search-thumbnail.jpg`
* **배포 절대 URL**: `https://rainguard-chungnam.co.kr/images/seo/rainguard-search-thumbnail.jpg`
* **이미지 규격**: 1200 × 630 px
* **이미지 용량**: 102,152 bytes (약 100KB)

## 적용 및 검사
* **적용 대상**:
  1. 메인 페이지 (`/`)
  2. 지역별 서비스 지도 (`/sitemap-chungnam`)
  3. 모든 유효한 읍·면·동 &times; 서비스 6종 동적 키워드 랜딩 페이지 (`/?k=지역명-작업명`)
* **검사한 페이지**:
  - `http://localhost:3000/` (메인 페이지)
  - `http://localhost:3000/sitemap-chungnam` (지도 허브)
  - `http://localhost:3000/?k=배방읍-창틀코킹` (동적 랜딩)
  - `http://localhost:3000/?k=성정동-빗물누수` (동적 랜딩)
  - `http://localhost:3000/?k=안면읍-창틀누수` (동적 랜딩)
  - `http://localhost:3000/?k=송악읍-외벽누수` (동적 랜딩)
* **HTTP 응답 상태**: `200 OK` (모든 로컬 접속 및 빌드 최적화 라우트 정상 응답 확인)
* **메타데이터 검사 결과**:
  - `og:image` 및 Open Graph 10종 메타데이터가 서버 렌더링된 초기 HTML 소스코드 내부에 정확하게 포함되는 것을 확인하였습니다.
  - JSON-LD 구조화 데이터(`ImageObject`, `Service` 내 `image` 필드)의 이미지 참조 주소가 `og:image`와 100% 일치합니다.

## 변경 금지 사항
* 대표 이미지 파일명(`rainguard-search-thumbnail.jpg`) 및 저장 디렉토리 경로는 추후 지역/서비스 키워드 확장이나 UI 리뉴얼 시에도 영구히 유지되어야 합니다.
* Next.js 이미지 최적화 주소나 빌드 해시 주소를 og:image 주소로 사용하지 않으며, 항상 고정된 절대 경로 정적 리소스를 제공합니다.

## 남아 있는 문제
* 없음
