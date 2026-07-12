import Image from "next/image";
import { SymptomCard } from "@/types";

interface LeakSymptomsProps {
  symptomList?: SymptomCard[];
}

export default function LeakSymptoms({ symptomList }: LeakSymptomsProps) {
  const defaultSymptoms = [
    {
      title: "비가 올 때 창틀 빗물 유입",
      desc: "비바람이 칠 때 샷시 하단 틈새나 코너 주변부로 물이 고이거나 타고 흘러내리는 경우",
      image: "/images/symptoms/symptom-1.jpg"
    },
    {
      title: "벽지와 몰딩 변색 및 습기",
      desc: "창문 주변의 벽면이 지속적으로 눅눅해지거나 마감이 뜯어지며 얼룩이 생기는 현상",
      image: "/images/symptoms/symptom-2.jpg"
    },
    {
      title: "노후 실리콘 갈라짐과 들뜸",
      desc: "외부 실리콘 마감재가 세월의 영향으로 굳어져 균열이 가거나 샷시 틈에서 박리된 상태",
      image: "/images/symptoms/symptom-3.jpg"
    },
    {
      title: "외벽 균열 주변 반복 누수",
      desc: "콘크리트 외벽의 미세한 크랙을 통해 강수 발생 시마다 실내로 지속적인 침투가 반복되는 경우",
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

  const displaySymptoms = symptomList && symptomList.length > 0 
    ? symptomList.map((s, idx) => ({ ...s, image: symptomImages[idx] || symptomImages[0] })) 
    : defaultSymptoms;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">원인 파악의 시작</h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">대표적인 누수 증상</p>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base">
            아래와 같은 증상이 발견되면 내부 마감재 손상이 커지기 전에 빗물 차단 보수가 필요합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displaySymptoms.map((s, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-accent/20 transition-all duration-300 group flex flex-col"
            >
              {/* 실사 원인 이미지 삽입 */}
              <div className="relative w-full h-48 overflow-hidden bg-zinc-200">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-w-768px) 100vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
