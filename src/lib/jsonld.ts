import { siteConfig } from "@/config/site";

interface LandingJsonLdData {
  regionName: string;
  serviceName: string;
  canonicalKey: string;
  shortDescription: string;
  faqs?: { q: string; a: string }[];
}

export function getJsonLd(type: "main" | "landing" | "hub", data?: LandingJsonLdData) {
  // 1. WebSite & Organization (공통 사용)
  // 공통 이미지 객체 정의
  const imageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": siteConfig.SEARCH_THUMBNAIL_URL,
    "url": siteConfig.SEARCH_THUMBNAIL_URL,
    "width": siteConfig.SEARCH_THUMBNAIL_WIDTH.toString(),
    "height": siteConfig.SEARCH_THUMBNAIL_HEIGHT.toString(),
    "caption": siteConfig.SEARCH_THUMBNAIL_ALT
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.brandName,
    "url": "https://www.cnrainguard.co.kr",
    "image": imageObject,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.cnrainguard.co.kr/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.branchName,
    "url": "https://www.cnrainguard.co.kr",
    "logo": "https://www.cnrainguard.co.kr/images/logo.png",
    "image": imageObject,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phonePlaceholder,
      "contactType": "customer service"
    }
  };

  if (type === "main") {
    // FAQPage 구조화 데이터
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "창틀 누수의 주요 원인은 무엇인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "시간이 흐르며 외부 실리콘이 자외선과 기온 차이로 갈라지거나 벽면에서 박리되는 현상, 주변 외벽 콘크리트 미세 균열로 빗물이 침입하는 것이 주요 원인입니다."
          }
        },
        {
          "@type": "Question",
          "name": "기존 실리콘 위 덧방 시공을 하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "접착력이 저하된 기존 노후 실리콘을 전량 제거하고 프라이머 도포 후 전용 실리콘을 기밀 충진하는 것을 원칙으로 삼습니다."
          }
        }
      ]
    };

    return [website, organization, faq, imageObject];
  }

  if (type === "hub") {
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "홈",
          "item": "https://www.cnrainguard.co.kr"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "충남·대전·세종 지역별 서비스",
          "item": "https://www.cnrainguard.co.kr/sitemap-chungnam"
        }
      ]
    };

    return [website, organization, breadcrumb, imageObject];
  }

  if (type === "landing" && data) {
    const { regionName, serviceName, canonicalKey, shortDescription, faqs } = data;
    
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "홈",
          "item": "https://www.cnrainguard.co.kr"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "지역별 서비스",
          "item": "https://www.cnrainguard.co.kr/sitemap-chungnam"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${regionName} ${serviceName}`,
          "item": `https://www.cnrainguard.co.kr/?k=${canonicalKey}`
        }
      ]
    };

    const service = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": serviceName,
      "provider": {
        "@type": "LocalBusiness",
        "name": siteConfig.branchName,
        "image": siteConfig.SEARCH_THUMBNAIL_URL,
        "telephone": siteConfig.phonePlaceholder,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "충청남도",
          "addressLocality": regionName
        }
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": regionName
      },
      "description": shortDescription
    };

    const faqPage = faqs && faqs.length > 0 ? {
      "@context": "https://schema.org" as const,
      "@type": "FAQPage" as const,
      "mainEntity": faqs.map((f: { q: string; a: string }) => ({
        "@type": "Question" as const,
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer" as const,
          "text": f.a
        }
      }))
    } : null;

    const returnList = [website, organization, breadcrumb, service, imageObject];
    if (faqPage) {
      returnList.push(faqPage as unknown as typeof website);
    }

    return returnList;
  }

  return [website, organization, imageObject];
}
