import { PathStep } from "@/types";
import Image from "next/image";

interface LeakPathProps {
  pathList?: PathStep[];
  dynamicRegionName?: string;
  dynamicServiceName?: string;
}

export default function LeakPath({ pathList, dynamicRegionName, dynamicServiceName }: LeakPathProps) {
  const defaultPaths = [
    {
      step: "01",
      name: "틈과 균열 발생",
      desc: "노후 실리콘과 외벽 마감에 미세한 틈이 생깁니다."
    },
    {
      step: "02",
      name: "빗물 침투",
      desc: "비바람을 받은 빗물이 틈을 통해 내부로 스며듭니다."
    },
    {
      step: "03",
      name: "벽체 내부 이동",
      desc: "들어온 물이 창틀과 벽체 내부를 따라 이동합니다."
    },
    {
      step: "04",
      name: "실내 흔적 발생",
      desc: "벽지와 몰딩의 물자국이나 변색으로 나타납니다."
    }
  ];

  const hasDynamicList = !!(dynamicRegionName && dynamicServiceName);

  // 코킹/실리콘 계열 vs 누수 계열 4단계 분기 정의
  const isCockingGroup = ["창틀코킹", "창틀실리콘", "샷시실리콘"].includes(dynamicServiceName || "");
  
  const dynamicPaths = isCockingGroup
    ? [
        {
          step: "01",
          name: "실리콘 노후화",
          desc: "햇빛과 온도 변화로 실리콘이 굳고 갈라집니다."
        },
        {
          step: "02",
          name: "접합부 들뜸",
          desc: "실리콘이 창틀이나 외벽에서 떨어져 틈이 생깁니다."
        },
        {
          step: "03",
          name: "틈새 빗물 유입",
          desc: "비바람을 받은 빗물이 벌어진 접합부로 스며듭니다."
        },
        {
          step: "04",
          name: "누수 흔적 발생",
          desc: "창틀 주변의 물자국과 습기, 변색으로 나타납니다."
        }
      ]
    : defaultPaths;

  const displayPaths = hasDynamicList ? dynamicPaths : defaultPaths;

  const imageAlt = hasDynamicList
    ? `${dynamicRegionName} ${dynamicServiceName} 원인과 누수 유입 경로를 설명하는 현장 이미지`
    : "외벽과 창틀을 따라 실내로 이동하는 빗물 누수 경로";

  return (
    <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100 px-5 sm:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-left lg:text-center max-w-3xl lg:mx-auto mb-7 sm:mb-9 lg:mb-[48px]">
          <h2 className="text-[13px] sm:text-sm font-bold text-brand-accent tracking-wider uppercase mb-2 sm:mb-[12px]">
            {hasDynamicList 
              ? (isCockingGroup ? `${dynamicServiceName} 손상 진행 과정` : `${dynamicServiceName} 원인과 유입 경로`) 
              : "누수 원인을 찾는 핵심"
            }
          </h2>
          <p className="text-[28px] sm:text-3xl lg:text-[42px] font-black text-brand-primary tracking-tight lg:tracking-[-0.03em] leading-[1.3] lg:leading-[1.25] keep-all break-keep">
            {hasDynamicList 
              ? (isCockingGroup 
                  ? `${dynamicRegionName} ${dynamicServiceName}, 노후와 들뜸이 시작된 부위부터 확인합니다` 
                  : `${dynamicRegionName} ${dynamicServiceName}, 물이 들어온 지점부터 확인합니다`)
              : "물이 보이는 곳과 들어오는 곳은 다를 수 있습니다"
            }
          </p>
          <p className="text-zinc-500 mt-3 text-[15px] sm:text-base lg:text-[18px] leading-relaxed lg:leading-[1.7] keep-all break-keep max-w-[760px] lg:mx-auto">
            {hasDynamicList ? (
              isCockingGroup
                ? "실리콘의 갈라짐과 접합부 들뜸은 작은 틈을 만들고, 빗물이 침투할 수 있는 원인이 될 수 있습니다."
                : "실내 물자국과 실제 유입 지점은 다를 수 있어 외벽 균열, 창틀 접합부와 실리콘 상태를 함께 확인해야 합니다."
            ) : (
              "외벽의 작은 균열이나 창틀 접합부로 들어온 빗물은 벽체 내부를 따라 이동한 뒤 실내 물자국으로 나타납니다."
            )}
          </p>
        </div>

        {/* 데스크톱(lg 이상): 이미지-단계 결합 단일 거대 패널(좌 60% : 우 40%) */}
        {/* 모바일/태블릿: 상단 이미지 패널 + 하단 세로형 단계 리스트 순차 노출 */}
        <div className="hidden lg:flex w-full h-[580px] bg-white border border-zinc-100 rounded-[24px] overflow-hidden shadow-sm">
          {/* 왼쪽 이미지 영역 (60%) */}
          <div className="relative w-[60%] h-full bg-zinc-200">
            <Image
              src="/images/symptoms/leak-path-panel.jpg"
              alt={imageAlt}
              fill
              loading="lazy"
              sizes="60vw"
              style={{ objectFit: "cover", objectPosition: "center 45%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/30 to-transparent" />
          </div>

          {/* 오른쪽 4단계 세로 목록 영역 (40%) */}
          <div className="w-[40%] h-full flex flex-col justify-between divide-y divide-zinc-100 bg-white">
            {displayPaths.map((p, idx) => (
              <div key={idx} className="flex-1 flex flex-col justify-center px-8 xl:px-[36px] py-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-brand-accent/70 tracking-wider">STEP {p.step}</span>
                </div>
                <h3 className="text-[19px] xl:text-[21px] font-[800] text-zinc-900 mb-1">{p.name}</h3>
                <p className="text-[14px] xl:text-[15px] text-zinc-500 leading-normal">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 모바일/태블릿 뷰포트 레이아웃 */}
        <div className="lg:hidden flex flex-col gap-7 sm:gap-9">
          {/* 상단 이미지 패널 */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[18px] overflow-hidden bg-zinc-200">
            <Image
              src="/images/symptoms/leak-path-panel.jpg"
              alt={imageAlt}
              fill
              loading="lazy"
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 45%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/45 to-transparent" />
          </div>

          {/* 하단 4단계 2x2 콤팩트 카드 그리드 */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {displayPaths.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center p-3.5 sm:p-4 bg-white border border-zinc-150 rounded-[14px] h-[125px] sm:h-[135px] text-left"
              >
                <span className="text-[12px] font-bold text-brand-accent/80 tracking-wider mb-0.5 sm:mb-1 block">STEP {p.step}</span>
                <h3 className="text-[15px] sm:text-[16px] font-[800] text-zinc-900 mb-1 leading-tight line-clamp-1">{p.name}</h3>
                <p className="text-[13px] text-zinc-500 leading-[1.5] line-clamp-2">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
