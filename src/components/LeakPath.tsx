import { PathStep } from "@/types";

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

  return (
    <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">
            {hasDynamicList 
              ? (isCockingGroup ? `${dynamicServiceName} 손상 진행 과정` : `${dynamicServiceName} 원인과 유입 경로`) 
              : "누수 원인을 찾는 핵심"
            }
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight keep-all break-keep">
            {hasDynamicList 
              ? (isCockingGroup 
                  ? `${dynamicRegionName} ${dynamicServiceName}, 노후와 들뜸이 시작된 부위부터 확인합니다` 
                  : `${dynamicRegionName} ${dynamicServiceName}, 물이 들어온 지점부터 확인합니다`)
              : "물이 보이는 곳과 들어오는 곳은 다를 수 있습니다"
            }
          </p>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base leading-relaxed keep-all break-keep max-w-2xl mx-auto">
            {hasDynamicList ? (
              isCockingGroup
                ? "실리콘의 갈라짐과 접합부 들뜸은 작은 틈을 만들고, 빗물이 침투할 수 있는 원인이 될 수 있습니다."
                : "실내 물자국과 실제 유입 지점은 다를 수 있어 외벽 균열, 창틀 접합부와 실리콘 상태를 함께 확인해야 합니다."
            ) : (
              "외벽의 작은 균열이나 창틀 접합부로 들어온 빗물은 벽체 내부를 따라 이동한 뒤 실내 물자국으로 나타납니다."
            )}
          </p>
        </div>

        {/* 경로 가로/세로 레이아웃 흐름 */}
        <div className="relative">
          {/* 모바일에서는 세로선, 데스크톱에서는 가로선 데코레이션 */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-zinc-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {displayPaths.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 단계 표시 원형 */}
                <div className="w-12 h-12 rounded-full bg-brand-accent text-white flex items-center justify-center font-black text-lg mb-4 shadow-md shadow-brand-accent/20">
                  {p.step}
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2">{p.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs">{p.desc}</p>
                
                {/* 모바일 하향 화살표 지시자 */}
                {idx < 3 && (
                  <div className="lg:hidden mt-6 text-brand-accent animate-bounce">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
