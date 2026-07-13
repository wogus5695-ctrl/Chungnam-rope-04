import Image from "next/image";

interface LeakPathProps {
  dynamicRegionName?: string;
  dynamicServiceName?: string;
}

export default function LeakPath({ dynamicRegionName, dynamicServiceName }: LeakPathProps) {
  // desc 문자열에 직접 <span> 혹은 HTML 태그가 가미된 구조로 선언
  const defaultPaths = [
    {
      step: "01",
      name: "틈과 균열 발생",
      desc: (
        <>
          노후 실리콘과 외벽 마감에 <span className="text-brand-accent font-bold">미세한 틈</span>이 생깁니다.
        </>
      )
    },
    {
      step: "02",
      name: "빗물 침투",
      desc: (
        <>
          비바람을 받은 빗물이 <span className="text-brand-accent font-bold">틈을 통해 내부로 스며듭니다</span>.
        </>
      )
    },
    {
      step: "03",
      name: "벽체 내부 이동",
      desc: (
        <>
          들어온 물이 <span className="text-brand-accent font-bold">창틀과 벽체 내부</span>를 따라 이동합니다.
        </>
      )
    },
    {
      step: "04",
      name: "실내 흔적 발생",
      desc: (
        <>
          벽지와 몰딩의 <span className="text-brand-accent font-bold">물자국이나 변색</span>으로 나타납니다.
        </>
      )
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
            {hasDynamicList ? (
              isCockingGroup ? (
                <>
                  {dynamicRegionName} {dynamicServiceName}, 노후와 들뜸이 시작된 부위부터 확인합니다
                </>
              ) : (
                <>
                  {dynamicRegionName} {dynamicServiceName}, <span className="text-brand-accent">물이 들어온 지점</span>부터 확인합니다
                </>
              )
            ) : (
              <>
                물이 보이는 곳과 <span className="text-brand-accent">물이 들어온 지점</span>은 다를 수 있습니다
              </>
            )}
          </p>
          <p className="text-zinc-500 mt-3 text-[15px] sm:text-base lg:text-[18px] leading-relaxed lg:leading-[1.7] keep-all break-keep max-w-[760px] lg:mx-auto">
            {hasDynamicList ? (
              isCockingGroup ? (
                "실리콘의 갈라짐과 접합부 들뜸은 작은 틈을 만들고, 빗물이 침투할 수 있는 원인이 될 수 있습니다."
              ) : (
                <>
                  <span className="underline decoration-brand-accent/50 underline-offset-4 font-bold text-zinc-800">실제 유입 지점은 다를 수 있어</span> 외벽 균열, 창틀 접합부와 실리콘 상태를 함께 확인해야 합니다.
                </>
              )
            ) : (
              <>
                외벽의 작은 균열이나 창틀 접합부로 들어온 빗물은 <span className="underline decoration-brand-accent/50 underline-offset-4 font-bold text-zinc-800">실제 유입 지점은 다를 수 있어</span> 벽체 내부를 따라 이동한 뒤 실내 물자국으로 나타납니다.
              </>
            )}
          </p>
        </div>

        {/* 반응형 통합 과정 레이아웃 (HTML 1회 출력, CSS 제어) */}
        <div className="flex flex-col lg:flex-row w-full bg-white border border-zinc-100 rounded-[18px] lg:rounded-[24px] overflow-hidden shadow-sm">
          {/* 이미지 영역 (모바일 상단, 데스크톱 좌측 60%) */}
          <div className="relative w-full lg:w-[60%] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[580px] bg-zinc-200 flex-shrink-0">
            <Image
              src="/images/symptoms/leak-path-panel.jpg"
              alt={imageAlt}
              fill
              loading="lazy"
              sizes="(max-w-1024px) 100vw, 60vw"
              style={{ objectFit: "cover", objectPosition: "center 45%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f172a]/30 to-transparent" />
          </div>

          {/* 4단계 목록 영역 (모바일 하단 2x2 그리드, 데스크톱 우측 40% 세로 정렬) */}
          <div className="w-full lg:w-[40%] bg-white p-4 sm:p-5 lg:p-0 flex flex-col justify-between">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 lg:gap-0 lg:divide-y lg:divide-zinc-100 h-full">
              {displayPaths.map((p, idx) => (
                <div key={idx} className="flex flex-col justify-center p-3.5 sm:p-4 lg:px-8 xl:px-[36px] lg:py-4 bg-zinc-50/50 lg:bg-white border lg:border-none border-zinc-150 rounded-[12px] lg:rounded-none h-[125px] sm:h-[135px] lg:h-auto lg:flex-1 text-left">
                  <div className="flex items-center gap-3 mb-0.5 sm:mb-1">
                    <span className="text-[11px] lg:text-xs font-bold text-brand-accent/80 lg:text-brand-accent/70 tracking-wider">STEP {p.step}</span>
                  </div>
                  <h3 className="text-[15px] sm:text-[16px] lg:text-[19px] xl:text-[21px] font-[800] text-zinc-900 mb-1 leading-tight lg:leading-snug line-clamp-1">{p.name}</h3>
                  <div className="text-[13px] lg:text-[14px] xl:text-[15px] text-zinc-500 leading-normal line-clamp-2 lg:line-clamp-none">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
