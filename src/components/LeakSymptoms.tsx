import Image from "next/image";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

interface LeakSymptomsProps {
  dynamicRegionName?: string;
  dynamicServiceName?: string;
}

export default function LeakSymptoms({ dynamicRegionName, dynamicServiceName }: LeakSymptomsProps) {
  const defaultSymptoms = [
    {
      title: "창틀 틈새 빗물 유입",
      desc: "비바람이 칠 때 창틀 아래나 모서리로 물이 고입니다.",
      image: "/images/symptoms/symptom-1.jpg"
    },
    {
      title: "벽지·몰딩 변색",
      desc: "천장·몰딩 주변이 누렇게 변하고 벽지가 눅눅해집니다.",
      image: "/images/symptoms/symptom-2.jpg"
    },
    {
      title: "실리콘 갈라짐·들뜸",
      desc: "외부 실리콘이 갈라지거나 틈이 생겨 떨어져 있습니다.",
      image: "/images/symptoms/symptom-3.jpg"
    },
    {
      title: "외벽 균열 누수",
      desc: "비 온 뒤 외벽 안쪽으로 습기와 물자국이 번집니다.",
      image: "/images/symptoms/symptom-4.jpg"
    }
  ];

  // 동적 페이지의 symptomList 맵핑에도 이미지 대응되도록 설정
  const symptomImages = [
    "/images/symptoms/symptom-1.jpg",
    "/images/symptoms/symptom-2.jpg",
    "/images/symptoms/symptom-3.jpg",
    "/images/symptoms/symptom-4.jpg"
  ];

  const hasDynamicList = !!(dynamicRegionName && dynamicServiceName);
  const targetServiceData = dynamicServiceName ? services.find(s => s.name === dynamicServiceName) : null;

  const displaySymptoms = targetServiceData?.symptomObjects && targetServiceData.symptomObjects.length > 0
    ? targetServiceData.symptomObjects.map((s, idx) => ({ ...s, image: symptomImages[idx % symptomImages.length] }))
    : defaultSymptoms;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-zinc-100 px-5 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-left lg:text-center max-w-3xl lg:mx-auto mb-9 sm:mb-12 lg:mb-[46px]">
          <h2 className="text-[13px] sm:text-sm font-bold text-brand-accent tracking-wider uppercase mb-2 sm:mb-[12px]">
            {hasDynamicList ? `${dynamicServiceName} 점검이 필요한 신호` : "놓치기 쉬운 누수 신호"}
          </h2>
          <p className="text-[26px] sm:text-3xl lg:text-[40px] font-black text-brand-primary tracking-tight lg:tracking-[-0.03em] leading-[1.3] lg:leading-[1.25] keep-all break-keep">
            {hasDynamicList ? (
              <>
                {dynamicRegionName} {dynamicServiceName}, <span className="text-brand-accent">이런 증상이 반복</span>되면 확인이 필요합니다
              </>
            ) : (
              <>
                비 온 뒤 <span className="text-brand-accent">이런 흔적이 반복</span>된다면 누수 원인을 확인해야 합니다
              </>
            )}
          </p>
          <div className="text-zinc-500 mt-3 sm:mt-4 lg:mt-[16px] text-[15px] sm:text-base lg:text-[18px] leading-relaxed lg:leading-[1.7] keep-all break-keep max-w-[760px] lg:mx-auto">
            {hasDynamicList ? (
              <>
                {dynamicRegionName} 현장에서 아래와 같은 흔적이 반복된다면, 내부 마감 손상이 커지기 전에 <span className="underline decoration-brand-accent/50 underline-offset-4 font-bold text-zinc-800">실제 유입 경로와 외부 마감 상태</span>를 확인해야 합니다.
              </>
            ) : (
              <p>
                <span className="text-brand-accent font-extrabold">비가 올 때 반복</span>되는 물자국과 변색이 관찰된다면, 내부 마감 손상이 커지기 전에 <span className="underline decoration-brand-accent/50 underline-offset-4 font-bold text-zinc-800">실제 유입 경로</span>를 확인해야 합니다.
              </p>
            )}
          </div>
        </div>

        {/* 모바일에서는 flex-col 세로 리스트의 가로형 콤팩트 카드 형태, md 이상에서는 기존 4열 그리드 */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {displaySymptoms.map((s, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 border border-zinc-100 rounded-[16px] overflow-hidden hover:shadow-lg lg:hover:shadow-md transition-all duration-300 group flex flex-row md:flex-col h-[145px] md:h-full"
            >
              {/* 실사 원인 이미지 삽입 (모바일 가로형 콤팩트 비중 35% 적용, PC 4:3 가로 고정비율 설정) */}
              <div className="relative w-[35%] md:w-full h-full md:h-44 lg:h-auto lg:aspect-[4/3] overflow-hidden bg-zinc-200 flex-shrink-0">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  loading="lazy"
                  sizes="(max-w-768px) 35vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-5 lg:p-[24px] flex-grow flex flex-col justify-center md:justify-between w-[65%] md:w-auto">
                <div>
                  <h3 className="text-[17px] sm:text-lg lg:text-[20px] font-[800] text-brand-accent mb-1.5 sm:mb-2 tracking-tight leading-[1.3] truncate lg:whitespace-normal lg:line-clamp-2">{s.title}</h3>
                  <p className="text-[14px] sm:text-sm lg:text-[15px] text-zinc-600 leading-[1.55] lg:leading-[1.65] line-clamp-2 lg:line-clamp-3">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 콤팩트 전환 안내 영역 추가 */}
        <div className="mt-9 sm:mt-[36px] lg:mt-[48px] pt-8 lg:pt-[36px] border-t border-zinc-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl text-left">
            <h4 className="text-[18px] sm:text-xl lg:text-[22px] font-black text-brand-primary tracking-tight mb-2">
              위 증상이 비 올 때 반복되나요?
            </h4>
            <p className="text-[14px] sm:text-base lg:text-[16px] text-zinc-500 font-semibold leading-relaxed">
              물자국 위치와 비가 샐 때의 상황을 알려주시면 우선 확인할 부위를 안내합니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
            <a
              href={siteConfig.phoneHref}
              className="w-full sm:w-[180px] h-[52px] lg:h-[54px] flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white text-[15px] lg:text-[16px] font-extrabold rounded-xl shadow-md shadow-brand-accent/10 transition-all text-center"
            >
              전화로 증상 상담
            </a>
            <a
              href={siteConfig.kakaoUrlPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[180px] h-[52px] lg:h-[54px] flex items-center justify-center bg-[#fee500] hover:bg-[#fdd835] text-black text-[15px] lg:text-[16px] font-extrabold rounded-xl transition-all text-center"
            >
              사진 보내 상담
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
