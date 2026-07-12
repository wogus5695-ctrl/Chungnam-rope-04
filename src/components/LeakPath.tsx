export default function LeakPath() {
  const paths = [
    {
      step: "01",
      name: "외벽 균열 유입",
      desc: "옹벽의 미세한 크랙 틈새로 빗물이 흡수됩니다."
    },
    {
      step: "02",
      name: "샷시·외벽 접합부 침투",
      desc: "샤시 틀과 콘크리트 마감재가 만나는 접점이 벌어집니다."
    },
    {
      step: "03",
      name: "창틀 상부와 프레임 침적",
      desc: "내부로 파고든 수분이 샷시 프레임 상부에 고여 고정됩니다."
    },
    {
      step: "04",
      name: "실내 벽지·몰딩 변색",
      desc: "최종적으로 벽지와 몰딩 마감재를 적시며 습기를 노출시킵니다."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">원인 및 전파 경로</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">누수 유입 경로</p>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base">
            빗물이 외부에서 실내 마감재까지 이어지는 대표적인 4단계 누수 진입 메커니즘입니다.
          </p>
        </div>

        {/* 경로 가로/세로 레이아웃 흐름 */}
        <div className="relative">
          {/* 모바일에서는 세로선, 데스크톱에서는 가로선 데코레이션 */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-zinc-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {paths.map((p, idx) => (
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
