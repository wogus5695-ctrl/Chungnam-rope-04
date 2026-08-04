import Image from "next/image";
import { siteConfig } from "@/config/site";

interface SeoThumbnailCardProps {
  alt: string;
}

export default function SeoThumbnailCard({ alt }: SeoThumbnailCardProps) {
  return (
    <section className="py-6 bg-white border-b border-zinc-100 px-4 sm:px-6 lg:px-0">
      <div className="max-w-[1000px] mx-auto">
        <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden shadow-sm border border-zinc-100 bg-zinc-50">
          <Image
            src={siteConfig.SEARCH_THUMBNAIL_PATH}
            alt={alt}
            fill
            sizes="(max-width: 1000px) 100vw, 1000px"
            priority={true}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
