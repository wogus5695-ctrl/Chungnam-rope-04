export interface WorkCase {
  caseId: string;
  caseNumber: number;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  serviceType: string; // "general" 또는 쉼표(,) 구분 결합 지원
  verifiedLocation: string | null;
  symptom: string;
  inspectionPoint: string;
  workPerformed: string;
  afterState: string;
}

export const workCases: WorkCase[] = [
  {
    caseId: "case-1",
    caseNumber: 1,
    beforeImage: "/images/symptoms/1%20%EC%A0%84.JPG",
    afterImage: "/images/symptoms/1%20%ED%9B%84.JPG",
    beforeAlt: "방수 시공 전 외부 마감 상태",
    afterAlt: "방수 시공 완료 후 외부 마감 상태",
    serviceType: "general,외벽방수,옥상방수,건물방수,지붕방수,우레탄방수",
    verifiedLocation: null,
    symptom: "시공 전 접합부 균열 상태 확인",
    inspectionPoint: "외부 마감면과 틈새 조인트 점검",
    workPerformed: "특수 외장 균열 탄성 보수 시공",
    afterState: "보수 마감 완료 상태"
  },
  {
    caseId: "case-2",
    caseNumber: 2,
    beforeImage: "/images/symptoms/2%EC%A0%84.JPG",
    afterImage: "/images/symptoms/2%ED%9B%84.JPG",
    beforeAlt: "방수 시공 전 외부 마감 상태",
    afterAlt: "방수 시공 완료 후 외부 마감 상태",
    serviceType: "general,외벽방수,옥상방수,건물방수,지붕방수,우레탄방수",
    verifiedLocation: null,
    symptom: "시공 전 접합부 균열 상태 확인",
    inspectionPoint: "외부 마감면과 틈새 조인트 점검",
    workPerformed: "특수 외장 균열 탄성 보수 시공",
    afterState: "보수 마감 완료 상태"
  },
  {
    caseId: "case-3",
    caseNumber: 3,
    beforeImage: "/images/symptoms/3%EC%A0%84.jpg",
    afterImage: "/images/symptoms/3%ED%9B%84.jpg",
    beforeAlt: "방수 시공 전 외부 마감 상태",
    afterAlt: "방수 시공 완료 후 외부 마감 상태",
    serviceType: "general,외벽방수,옥상방수,건물방수,지붕방수,우레탄방수",
    verifiedLocation: null,
    symptom: "시공 전 접합부 균열 상태 확인",
    inspectionPoint: "외부 마감면과 틈새 조인트 점검",
    workPerformed: "특수 외장 균열 탄성 보수 시공",
    afterState: "보수 마감 완료 상태"
  },
  {
    caseId: "case-4",
    caseNumber: 4,
    beforeImage: "/images/symptoms/4%EC%A0%84.JPG",
    afterImage: "/images/symptoms/4%ED%9B%84.JPG",
    beforeAlt: "방수 시공 전 외부 마감 상태",
    afterAlt: "방수 시공 완료 후 외부 마감 상태",
    serviceType: "general,외벽방수,옥상방수,건물방수,지붕방수,우레탄방수",
    verifiedLocation: null,
    symptom: "시공 전 접합부 균열 상태 확인",
    inspectionPoint: "외부 마감면과 틈새 조인트 점검",
    workPerformed: "특수 외장 균열 탄성 보수 시공",
    afterState: "보수 마감 완료 상태"
  },
  {
    caseId: "case-5",
    caseNumber: 5,
    beforeImage: "/images/symptoms/5%EC%A0%84.JPG",
    afterImage: "/images/symptoms/5%ED%9B%84.JPG",
    beforeAlt: "방수 시공 전 외부 마감 상태",
    afterAlt: "방수 시공 완료 후 외부 마감 상태",
    serviceType: "general,외벽방수,옥상방수,건물방수,지붕방수,우레탄방수",
    verifiedLocation: null,
    symptom: "시공 전 접합부 균열 상태 확인",
    inspectionPoint: "외부 마감면과 틈새 조인트 점검",
    workPerformed: "특수 외장 균열 탄성 보수 시공",
    afterState: "보수 마감 완료 상태"
  }
];
