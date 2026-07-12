export interface WorkCase {
  caseId: string;
  caseNumber: number;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  serviceType: string;
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
    beforeAlt: "작업 전 외부 마감 및 접합부 상태",
    afterAlt: "보수 작업 후 외부 마감 및 접합부 상태",
    serviceType: "general",
    verifiedLocation: null,
    symptom: "작업 전 손상 상태 확인",
    inspectionPoint: "외부 마감과 접합부 상태 점검",
    workPerformed: "확인된 손상 부위 보수",
    afterState: "보수 후 마감 상태"
  },
  {
    caseId: "case-2",
    caseNumber: 2,
    beforeImage: "/images/symptoms/2%EC%A0%84.JPG",
    afterImage: "/images/symptoms/2%ED%9B%84.JPG",
    beforeAlt: "작업 전 외부 마감 및 접합부 상태",
    afterAlt: "보수 작업 후 외부 마감 및 접합부 상태",
    serviceType: "general",
    verifiedLocation: null,
    symptom: "작업 전 손상 상태 확인",
    inspectionPoint: "외부 마감과 접합부 상태 점검",
    workPerformed: "확인된 손상 부위 보수",
    afterState: "보수 후 마감 상태"
  },
  {
    caseId: "case-3",
    caseNumber: 3,
    beforeImage: "/images/symptoms/3%EC%A0%84.jpg",
    afterImage: "/images/symptoms/3%ED%9B%84.jpg",
    beforeAlt: "작업 전 외부 마감 및 접합부 상태",
    afterAlt: "보수 작업 후 외부 마감 및 접합부 상태",
    serviceType: "general",
    verifiedLocation: null,
    symptom: "작업 전 손상 상태 확인",
    inspectionPoint: "외부 마감과 접합부 상태 점검",
    workPerformed: "확인된 손상 부위 보수",
    afterState: "보수 후 마감 상태"
  },
  {
    caseId: "case-4",
    caseNumber: 4,
    beforeImage: "/images/symptoms/4%EC%A0%84.JPG",
    afterImage: "/images/symptoms/4%ED%9B%84.JPG",
    beforeAlt: "작업 전 외부 마감 및 접합부 상태",
    afterAlt: "보수 작업 후 외부 마감 및 접합부 상태",
    serviceType: "general",
    verifiedLocation: null,
    symptom: "작업 전 손상 상태 확인",
    inspectionPoint: "외부 마감과 접합부 상태 점검",
    workPerformed: "확인된 손상 부위 보수",
    afterState: "보수 후 마감 상태"
  },
  {
    caseId: "case-5",
    caseNumber: 5,
    beforeImage: "/images/symptoms/5%EC%A0%84.JPG",
    afterImage: "/images/symptoms/5%ED%9B%84.JPG",
    beforeAlt: "작업 전 외부 마감 및 접합부 상태",
    afterAlt: "보수 작업 후 외부 마감 및 접합부 상태",
    serviceType: "general",
    verifiedLocation: null,
    symptom: "작업 전 손상 상태 확인",
    inspectionPoint: "외부 마감과 접합부 상태 점검",
    workPerformed: "확인된 손상 부위 보수",
    afterState: "보수 후 마감 상태"
  }
];
