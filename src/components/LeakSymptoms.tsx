import Image from "next/image";
import { SymptomCard } from "@/types";

interface LeakSymptomsProps {
  symptomList?: SymptomCard[];
}

export default function LeakSymptoms({ symptomList }: LeakSymptomsProps) {
  const defaultSymptoms = [
    {
      title: "창틀 틈새 빗물 유입",
      desc: "비바람이 칠 때 창틀 하단이나 모서리에서 물이 고이거나 흘러내리는 증상",
      image: "/images/symptoms/symptom-1.jpg"
    },
    {
      title: "벽지·몰딩 변색",
      desc: "창문 주변 벽지가 눅눅해지거나 몰딩을 따라 얼룩과 들뜸이 생기는 증상",
      image: "/images/symptoms/symptom-2.jpg"
    },
    {
      title: "실리콘 갈라짐·들뜸",
      desc: "외부 실리콘이 갈라지거나 창틀 접합부에서 떨어져 틈이 보이는 상태",
      image: "/images/symptoms/symptom-3.jpg"
    },
    {
      title: "외벽 균열 누수",
      desc: "외벽 균열 주변에서 비가 올 때마다 실내 물자국과 습기가 반복되는 증상",
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

  const hasDynamicList = symptomList && symptomList.length > 0;
  const displaySymptoms = hasDynamicList
    ? symptomList.map((s, idx) => ({ ...s, image: symptomImages[idx] || symptomImages[0] })) 
    : defaultSymptoms;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-sm font-bold text-brand-accent tracking-wider uppercase mb-2">
            {hasDynamicList ? "원인 파악의 시작" : "놓치기 쉬운 누수 신호"}
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight keep-all break-keep">
            {hasDynamicList 
              ? "대표적인 누수 증상" 
              : "비 온 뒤 이런 흔적이 반복된다면 누수 원인을 확인해야 합니다"
            }
          </p>
          <div className="text-zinc-500 mt-4 text-sm sm:text-base leading-relaxed keep-all break-keep max-w-2xl mx-auto">
            {hasDynamicList ? (
              "아래와 같은 증상이 발견되면 내부 마감재 손상이 커지기 전에 빗물 차단 보수가 필요합니다."
            ) : (
              <p>
                비가 올 때 <strong className="text-brand-accent font-extrabold">같은 위치에서 물자국과 변색이 반복된다면</strong>, 벽지·몰딩 등 내부 마감 손상이 커지기 전에 실제 유입 경로를 확인해야 합니다.
              </p>
            )}
          </div>
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
