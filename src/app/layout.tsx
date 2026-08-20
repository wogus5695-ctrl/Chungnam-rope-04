import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cnrainguard.co.kr"),
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  verification: {
    google: "RXIyQv1IJykHuQc8P2TlanIdllwp8I1yKD7-P212tlc",
    other: {
      "naver-site-verification": "4ebb2c6ec0e74edc41c1bdff6d763c5d7098d801"
    }
  },
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/favicon.ico"
      }
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="image_src" href={siteConfig.SEARCH_THUMBNAIL_URL} />
        <meta property="og:image" content={siteConfig.SEARCH_THUMBNAIL_URL} />
        <meta property="og:image:width" content={siteConfig.SEARCH_THUMBNAIL_WIDTH.toString()} />
        <meta property="og:image:height" content={siteConfig.SEARCH_THUMBNAIL_HEIGHT.toString()} />
        <meta property="og:image:alt" content={siteConfig.SEARCH_THUMBNAIL_ALT} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {/* 네이버 크롤러 수집 1순위 대표 이미지 (1px 실제 렌더링으로 hidden 판정 회피) */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "1px", overflow: "hidden", opacity: 0.01, zIndex: -1 }}>
          <img
            src={siteConfig.SEARCH_THUMBNAIL_URL}
            alt={siteConfig.SEARCH_THUMBNAIL_ALT}
            width={siteConfig.SEARCH_THUMBNAIL_WIDTH}
            height={siteConfig.SEARCH_THUMBNAIL_HEIGHT}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
