import React from "react";
import { getEnvCheckPoint, getEnvDescription, RegionEnvType } from "@/lib/regionEnv";

interface RegionalEnvSectionProps {
  regionName: string;
  serviceName: string;
  envType: RegionEnvType;
}

export default function RegionalEnvSection({ regionName, serviceName, envType }: RegionalEnvSectionProps) {
  if (envType === "일반 혼합형") return null;

  const desc = getEnvDescription(envType, regionName, serviceName);
  const checkPoint = getEnvCheckPoint(envType);

  return (
    <section className="py-10 sm:py-14 bg-blue-50/50 border-b border-zinc-100 px-5 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-blue-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-brand-accent">
              <span>📍</span>
              <span>{regionName} 건물에서 먼저 보는 곳</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-primary tracking-tight">
              {regionName} 현장 환경을 고려한 {serviceName} 점검
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-medium">
              {desc}
            </p>
          </div>
          <div className="w-full md:w-auto bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 flex-shrink-0">
            <span className="block text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">우선 확인</span>
            <p className="text-xs sm:text-sm font-bold text-zinc-800 break-keep">{checkPoint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
