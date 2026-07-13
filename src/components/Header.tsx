"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* 로고 영역 */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-black text-brand-primary tracking-tight">
              <div className="relative w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] overflow-hidden rounded-lg">
                <Image
                  src="/images/brand/rainguard-logo-symbol.webp"
                  alt="레인가드 로고"
                  fill
                  sizes="(max-width: 640px) 34px, 40px"
                  className="object-contain"
                  priority
                />
              </div>
              <span>{siteConfig.brandName}</span>
              <span className="text-brand-accent font-semibold text-xs sm:text-sm ml-1 select-none">충남지점</span>
            </Link>
          </div>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-zinc-600">
            <a href="#services" className="hover:text-brand-accent transition-colors">서비스 안내</a>
            <a href="#process" className="hover:text-brand-accent transition-colors">시공 절차</a>
            <a href="#cases" className="hover:text-brand-accent transition-colors">현장 사례</a>
            <a href="#regions" className="hover:text-brand-accent transition-colors">서비스 지역</a>
            <a href="#faq" className="hover:text-brand-accent transition-colors">FAQ</a>
          </nav>

          {/* 데스크톱 CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phonePlaceholder}`}
              className="px-4 py-2 text-xs font-bold text-white bg-brand-accent hover:bg-brand-accent-hover rounded-full transition-all shadow-md shadow-brand-accent/20"
            >
              전화 문의
            </a>
            <a
              href={siteConfig.kakaoUrlPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-black bg-[#fee500] hover:bg-[#fdd835] rounded-full transition-all"
            >
              카카오톡
            </a>
          </div>

          {/* 모바일 메뉴 토글 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-zinc-600 hover:text-zinc-950 focus:outline-none"
              aria-label="메뉴 열기"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 네비게이션 드롭다운 */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-brand-accent"
          >
            서비스 안내
          </a>
          <a
            href="#process"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-brand-accent"
          >
            시공 절차
          </a>
          <a
            href="#cases"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-brand-accent"
          >
            현장 사례
          </a>
          <a
            href="#regions"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-brand-accent"
          >
            서비스 지역
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-brand-accent"
          >
            FAQ
          </a>
          <div className="pt-4 flex flex-col gap-2">
            <a
              href={`tel:${siteConfig.phonePlaceholder}`}
              className="flex justify-center items-center py-3 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold rounded-lg transition-colors text-sm"
            >
              전화 상담원 연결
            </a>
            <a
              href={siteConfig.kakaoUrlPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center py-3 bg-[#fee500] hover:bg-[#fdd835] text-black font-bold rounded-lg transition-colors text-sm"
            >
              카카오톡 실시간 상담
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
