export interface SiteConfig {
  brandName: string;
  branchName: string;
  phonePlaceholder: string;
  kakaoUrlPlaceholder: string;
  defaultTitle: string;
  defaultDescription: string;
  operatingRegion: string;
  ogImagePlaceholder: string;
  SEARCH_THUMBNAIL_PATH: string;
  SEARCH_THUMBNAIL_URL: string;
  SEARCH_THUMBNAIL_WIDTH: number;
  SEARCH_THUMBNAIL_HEIGHT: number;
  SEARCH_THUMBNAIL_ALT: string;
  MAIN_HERO_IMAGE: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SymptomCard {
  title: string;
  desc: string;
  icon: string;
}

export interface PathStep {
  step: string;
  name: string;
  desc: string;
}

export interface CaseCard {
  title: string;
  type: string;
  desc: string;
}

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  metaDescription: string;
  symptoms: string[];
  solutions: string[];
  heroSubtitle: string;
  cause: string;
  checkPoint: string;
  solutionDetail: string;
  processDesc: string[];
  faqs: FAQItem[];
  symptomObjects: SymptomCard[];
  pathSteps: PathStep[];
  checkPoints: string[];
  caseObjects: CaseCard[];
}

export interface RegionData {
  name: string;
  keywordName?: string;
  alias?: string[];
  subRegions?: RegionData[];
}
