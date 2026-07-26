import { RegionData } from "@/types";

export const regions: RegionData[] = [
  {
    name: "천안시",
    alias: ["천안"],
    subRegions: [
      {
        name: "동남구",
        alias: ["천안 동남구", "천안시 동남구"],
        subRegions: [
          { name: "목천읍", alias: ["목천읍", "천안 목천읍"] },
          { name: "풍세면", alias: ["풍세면", "천안 풍세면"] },
          { name: "광덕면", alias: ["광덕면", "천안 광덕면"] },
          { name: "북면", alias: ["북면", "천안 북면"] },
          { name: "성남면", alias: ["성남면", "천안 성남면"] },
          { name: "수신면", alias: ["수신면", "천안 수신면"] },
          { name: "병천면", alias: ["병천면", "천안 병천면"] },
          { name: "동면", alias: ["동면", "천안 동면"] },
          { name: "중앙동", alias: ["중앙동", "천안 중앙동"] },
          { name: "문성동", alias: ["문성동", "천안 문성동"] },
          { name: "원성동", alias: ["원성동", "천안 원성동"] },
          { name: "봉명동", alias: ["봉명동", "천안 봉명동"] },
          { name: "일봉동", alias: ["일봉동", "천안 일봉동"] },
          { name: "신방동", alias: ["신방동", "천안 신방동"] },
          { name: "청룡동", alias: ["청룡동", "천안 청룡동"] },
          { name: "신안동", alias: ["신안동", "천안 신안동"] }
        ]
      },
      {
        name: "서북구",
        alias: ["천안 서북구", "천안시 서북구"],
        subRegions: [
          { name: "성환읍", alias: ["성환읍", "천안 성환읍"] },
          { name: "성거읍", alias: ["성거읍", "천안 성거읍"] },
          { name: "직산읍", alias: ["직산읍", "천안 직산읍"] },
          { name: "입장면", alias: ["입장면", "천안 입장면"] },
          { name: "성정동", alias: ["성정동", "천안 성정동", "서북구 성정동", "천안시 서북구 성정동"] },
          { name: "쌍용동", alias: ["쌍용동", "천안 쌍용동"] },
          { name: "백석동", alias: ["백석동", "천안 백석동"] },
          { name: "불당동", alias: ["불당동", "천안 불당동"] },
          { name: "부성동", alias: ["부성동", "천안 부성동"] }
        ]
      }
    ]
  },
  {
    name: "아산시",
    alias: ["아산"],
    subRegions: [
      { name: "염치읍", alias: ["염치읍", "아산 염치읍"] },
      { name: "배방읍", alias: ["배방읍", "아산 배방읍", "아산시 배방읍"] },
      { name: "송악면", alias: ["송악면", "아산 송악면"] },
      { name: "탕정면", alias: ["탕정면", "아산 탕정면"] },
      { name: "음봉면", alias: ["음봉면", "아산 음봉면"] },
      { name: "둔포면", alias: ["둔포면", "아산 둔포면"] },
      { name: "영인면", alias: ["영인면", "아산 영인면"] },
      { name: "인주면", alias: ["인주면", "아산 인주면"] },
      { name: "선장면", alias: ["선장면", "아산 선장면"] },
      { name: "도고면", alias: ["도고면", "아산 도고면"] },
      { name: "신창면", alias: ["신창면", "아산 신창면"] },
      { name: "온양동", alias: ["온양동", "아산 온양동", "온양1동", "온양2동", "온양3동", "온양4동", "온양5동", "온양6동"] }
    ]
  },
  {
    name: "태안군",
    alias: ["태안"],
    subRegions: [
      { name: "태안읍", alias: ["태안읍", "태안 태안읍"] },
      { name: "안면읍", alias: ["안면읍", "태안 안면읍", "태안군 안면읍"] },
      { name: "고남면", alias: ["고남면", "태안 고남면"] },
      { name: "남면", keywordName: "태안-남면", alias: ["남면", "태안 남면", "태안군 남면"] },
      { name: "근흥면", alias: ["근흥면", "태안 근흥면"] },
      { name: "소원면", alias: ["소원면", "태안 소원면"] },
      { name: "원북면", alias: ["원북면", "태안 원북면"] },
      { name: "이원면", alias: ["이원면", "태안 이원면"] }
    ]
  },
  {
    name: "당진시",
    alias: ["당진"],
    subRegions: [
      { name: "합덕읍", alias: ["합덕읍", "당진 합덕읍"] },
      { name: "송악읍", alias: ["송악읍", "당진 송악읍", "당진시 송악읍"] },
      { name: "고대면", alias: ["고대면", "당진 고대면"] },
      { name: "석문면", alias: ["석문면", "당진 석문면"] },
      { name: "대호지면", alias: ["대호지면", "당진 대호지면"] },
      { name: "정미면", alias: ["정미면", "당진 정미면"] },
      { name: "면천면", alias: ["면천면", "당진 면천면"] },
      { name: "순성면", alias: ["순성면", "당진 순성면"] },
      { name: "우강면", alias: ["우강면", "당진 우강면"] },
      { name: "신평면", alias: ["신평면", "당진 신평면"] },
      { name: "송산면", alias: ["송산면", "당진 송산면"] },
      { name: "당진동", alias: ["당진동", "당진1동", "당진2동", "당진3동"] }
    ]
  },
  {
    name: "서산시",
    alias: ["서산"],
    subRegions: [
      { name: "대산읍", alias: ["대산읍", "서산 대산읍"] },
      { name: "인지면", alias: ["인지면", "서산 인지면"] },
      { name: "부석면", alias: ["부석면", "서산 부석면"] },
      { name: "팔봉면", alias: ["팔봉면", "서산 팔봉면"] },
      { name: "지곡면", alias: ["지곡면", "서산 지곡면"] },
      { name: "성연면", alias: ["성연면", "서산 성연면"] },
      { name: "음암면", alias: ["음암면", "서산 음암면"] },
      { name: "운산면", alias: ["운산면", "서산 운산면"] },
      { name: "해미면", alias: ["해미면", "서산 해미면"] },
      { name: "고북면", alias: ["고북면", "서산 고북면"] },
      { name: "부춘동", alias: ["부춘동", "서산 부춘동"] },
      { name: "동문동", alias: ["동문동", "서산 동문동", "동문1동", "동문2동"] },
      { name: "활성동", alias: ["활성동", "서산 활성동"] },
      { name: "석남동", alias: ["석남동", "서산 석남동"] }
    ]
  },
  {
    name: "공주시",
    alias: ["공주"],
    subRegions: [
      { name: "유구읍", alias: ["유구읍", "공주 유구읍"] },
      { name: "이인면", alias: ["이인면", "공주 이인면"] },
      { name: "탄천면", alias: ["탄천면", "공주 탄천면"] },
      { name: "계룡면", alias: ["계룡면", "공주 계룡면"] },
      { name: "반포면", alias: ["반포면", "공주 반포면"] },
      { name: "의당면", alias: ["의당면", "공주 의당면"] },
      { name: "사곡면", alias: ["사곡면", "공주 사곡면"] },
      { name: "신풍면", alias: ["신풍면", "공주 신풍면"] },
      { name: "우성면", alias: ["우성면", "공주 우성면"] },
      { name: "중학동", alias: ["중학동", "공주 중앙동"] },
      { name: "웅진동", alias: ["웅진동", "공주 웅진동"] },
      { name: "금학동", alias: ["금학동", "공주 금학동"] },
      { name: "옥룡동", alias: ["옥룡동", "공주 옥룡동"] },
      { name: "신관동", alias: ["신관동", "공주 신관동"] },
      { name: "월송동", alias: ["월송동", "공주 월송동"] }
    ]
  },
  {
    name: "보령시",
    alias: ["보령"],
    subRegions: [
      { name: "웅천읍", alias: ["웅천읍", "보령 웅천읍"] },
      { name: "주포면", alias: ["주포면", "보령 주포면"] },
      { name: "주교면", alias: ["주교면", "보령 주교면"] },
      { name: "오천면", alias: ["오천면", "보령 오천면"] },
      { name: "천북면", alias: ["천북면", "보령 천북면"] },
      { name: "청소면", alias: ["청소면", "보령 청소면"] },
      { name: "청라면", alias: ["청라면", "보령 청라면"] },
      { name: "남포면", alias: ["남포면", "보령 남포면"] },
      { name: "주산면", alias: ["주산면", "보령 주산면"] },
      { name: "미산면", alias: ["미산면", "보령 미산면"] },
      { name: "성주면", alias: ["성주면", "보령 성주면"] },
      { name: "대천동", alias: ["대천동", "보령 대천동", "대천1동", "대천2동", "대천3동", "대천4동", "대천5동"] }
    ]
  },
  {
    name: "논산시",
    alias: ["논산"],
    subRegions: [
      { name: "강경읍", alias: ["강경읍", "논산 강경읍"] },
      { name: "연무읍", alias: ["연무읍", "논산 연무읍"] },
      { name: "성동면", alias: ["성동면", "논산 성동면"] },
      { name: "광석면", alias: ["광석면", "논산 광석면"] },
      { name: "노성면", alias: ["노성면", "논산 노성면"] },
      { name: "상월면", alias: ["상월면", "논산 상월면"] },
      { name: "부적면", alias: ["부적면", "논산 부적면"] },
      { name: "연산면", alias: ["연산면", "논산 연산면"] },
      { name: "벌곡면", alias: ["벌곡면", "논산 벌곡면"] },
      { name: "양촌면", alias: ["양촌면", "논산 양촌면"] },
      { name: "가야곡면", alias: ["가야곡면", "논산 가야곡면"] },
      { name: "은진면", alias: ["은진면", "논산 은진면"] },
      { name: "채운면", alias: ["채운면", "논산 채운면"] },
      { name: "취암동", alias: ["취암동", "논산 취암동"] },
      { name: "부창동", alias: ["부창동", "논산 부창동"] }
    ]
  },
  {
    name: "계룡시",
    alias: ["계룡"],
    subRegions: [
      { name: "두마면", alias: ["두마면", "계룡 두마면"] },
      { name: "엄사면", alias: ["엄사면", "계룡 엄사면"] },
      { name: "신도안면", alias: ["신도안면", "계룡 신도안면"] },
      { name: "금암동", alias: ["금암동", "계룡 금암동"] }
    ]
  },
  {
    name: "금산군",
    alias: ["금산"],
    subRegions: [
      { name: "금산읍", alias: ["금산읍", "금산군 금산읍"] },
      { name: "제원면", alias: ["제원면", "금산군 제원면"] },
      { name: "부리면", alias: ["부리면", "금산군 부리면"] },
      { name: "군북면", alias: ["군북면", "금산군 군북면"] },
      { name: "남일면", alias: ["남일면", "금산군 남일면"] },
      { name: "남이면", alias: ["남이면", "금산군 남이면"] },
      { name: "진산면", alias: ["진산면", "금산군 진산면"] },
      { name: "복수면", alias: ["복수면", "금산군 복수면"] },
      { name: "추부면", alias: ["추부면", "금산군 추부면"] }
    ]
  },
  {
    name: "부여군",
    alias: ["부여"],
    subRegions: [
      { name: "부여읍", alias: ["부여읍", "부여군 부여읍"] },
      { name: "규암면", alias: ["규암면", "부여군 규암면"] },
      { name: "은산면", alias: ["은산면", "부여군 은산면"] },
      { name: "외산면", alias: ["외산면", "부여군 외산면"] },
      { name: "내산면", alias: ["내산면", "부여군 내산면"] },
      { name: "구룡면", alias: ["구룡면", "부여군 구룡면"] },
      { name: "홍산면", alias: ["홍산면", "부여군 홍산면"] },
      { name: "옥산면", alias: ["옥산면", "부여군 옥산면"] },
      { name: "남면", keywordName: "부여-남면", alias: ["부여 남면", "부여군 남면"] },
      { name: "충화면", alias: ["충화면", "부여군 충화면"] },
      { name: "양화면", alias: ["양화면", "부여군 양화면"] },
      { name: "임천면", alias: ["임천면", "부여군 임천면"] },
      { name: "장암면", alias: ["장암면", "부여군 장암면"] },
      { name: "세도면", alias: ["세도면", "부여군 세도면"] },
      { name: "석성면", alias: ["석성면", "부여군 석성면"] },
      { name: "초촌면", alias: ["초촌면", "부여군 초촌면"] }
    ]
  },
  {
    name: "서천군",
    alias: ["서천"],
    subRegions: [
      { name: "장항읍", alias: ["장항읍", "서천 장항읍"] },
      { name: "서천읍", alias: ["서천읍", "서천 서천읍"] },
      { name: "마서면", alias: ["마서면", "서천 마서면"] },
      { name: "화양면", alias: ["화양면", "서천 화양면"] },
      { name: "기산면", alias: ["기산면", "서천 기산면"] },
      { name: "한산면", alias: ["한산면", "서천 한산면"] },
      { name: "마산면", alias: ["마산면", "서천 마산면"] },
      { name: "시초면", alias: ["시초면", "서천 시초면"] },
      { name: "문산면", alias: ["문산면", "서천 문산면"] },
      { name: "판교면", alias: ["판교면", "서천 판교면"] },
      { name: "종천면", alias: ["종천면", "서천 종천면"] },
      { name: "비인면", alias: ["비인면", "서천 비인면"] },
      { name: "서면", alias: ["서면", "서천 서면"] }
    ]
  },
  {
    name: "청양군",
    alias: ["청양"],
    subRegions: [
      { name: "청양읍", alias: ["청양읍", "청양 청양읍"] },
      { name: "운곡면", alias: ["운곡면", "청양 운곡면"] },
      { name: "대치면", alias: ["대치면", "청양 대치면"] },
      { name: "정산면", alias: ["정산면", "청양 정산면"] },
      { name: "목면", alias: ["목면", "청양 목면"] },
      { name: "청남면", alias: ["청남면", "청양 청남면"] },
      { name: "장평면", alias: ["장평면", "청양 장평면"] },
      { name: "남양면", alias: ["남양면", "청양 남양면"] },
      { name: "화성면", alias: ["화성면", "청양 화성면"] },
      { name: "비봉면", alias: ["비봉면", "청양 비봉면"] }
    ]
  },
  {
    name: "홍성군",
    alias: ["홍성"],
    subRegions: [
      { name: "홍성읍", alias: ["홍성읍", "홍성 홍성읍"] },
      { name: "광천읍", alias: ["광천읍", "홍성 광천읍"] },
      { name: "홍북읍", alias: ["홍북읍", "홍성 홍북읍"] },
      { name: "금마면", alias: ["금마면", "홍성 금마면"] },
      { name: "홍동면", alias: ["홍동면", "홍성 홍동면"] },
      { name: "장곡면", alias: ["장곡면", "홍성 장곡면"] },
      { name: "은하면", alias: ["은하면", "홍성 은하면"] },
      { name: "결성면", alias: ["결성면", "홍성 결성면"] },
      { name: "서부면", alias: ["서부면", "홍성 서부면"] },
      { name: "갈산면", alias: ["갈산면", "홍성 갈산면"] },
      { name: "구항면", alias: ["구항면", "홍성 구항면"] }
    ]
  },
  {
    name: "예산군",
    alias: ["예산"],
    subRegions: [
      { name: "예산읍", alias: ["예산읍", "예산 예산읍"] },
      { name: "삽교읍", alias: ["삽교읍", "예산 삽교읍"] },
      { name: "대술면", alias: ["대술면", "예산 대술면"] },
      { name: "신양면", alias: ["신양면", "예산 신양면"] },
      { name: "광시면", alias: ["광시면", "예산 광시면"] },
      { name: "대흥면", alias: ["대흥면", "예산 대흥면"] },
      { name: "응봉면", alias: ["응봉면", "예산 응봉면"] },
      { name: "덕산면", alias: ["덕산면", "예산 덕산면"] },
      { name: "봉산면", alias: ["봉산면", "예산 봉산면"] },
      { name: "고덕면", alias: ["고덕면", "예산 고덕면"] },
      { name: "신암면", alias: ["신암면", "예산 신암면"] },
      { name: "오가면", alias: ["오가면", "예산 오가면"] }
    ]
  },
  {
    name: "대전",
    displayName: "대전",
    keywordName: "대전",
    alias: ["대전시"],
    regionGroup: "daejeon",
    regionType: "city",
    enabled: true,
    indexable: true,
    subRegions: [
      {
        name: "동구",
        displayName: "동구",
        alias: ["대전 동구", "대전시 동구"],
        regionGroup: "daejeon",
        regionType: "district",
        enabled: true,
        indexable: true,
        subRegions: [
          { name: "중앙동", keywordName: "대전-중앙동", alias: ["대전 중앙동", "동구 중앙동", "대전시 동구 중앙동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "신인동", alias: ["신인동", "대전 신인동", "동구 신인동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "효동", alias: ["효동", "대전 효동", "동구 효동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "판암동", alias: ["판암1동", "판암2동", "대전 판암동", "동구 판암동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "용운동", alias: ["용운동", "대전 용운동", "동구 용운동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "대동", alias: ["대동", "대전 대동", "동구 대동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "자양동", alias: ["자양동", "대전 자양동", "동구 자양동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "가양동", alias: ["가양1동", "가양2동", "대전 가양동", "동구 가양동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "용전동", alias: ["용전동", "대전 용전동", "동구 용전동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "성남동", alias: ["성남동", "대전 성남동", "동구 성남동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "홍도동", alias: ["홍도동", "대전 홍도동", "동구 홍도동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "삼성동", alias: ["삼성동", "대전 삼성동", "동구 삼성동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "대청동", alias: ["대청동", "대전 대청동", "동구 대청동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "산내동", alias: ["산내동", "대전 산내동", "동구 산내동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true }
        ]
      },
      {
        name: "중구",
        displayName: "중구",
        alias: ["대전 중구", "대전시 중구"],
        regionGroup: "daejeon",
        regionType: "district",
        enabled: true,
        indexable: true,
        subRegions: [
          { name: "은행선화동", alias: ["은행선화동", "대전 은행선화동", "중구 은행선화동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "목동", alias: ["목동", "대전 목동", "중구 목동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "중촌동", alias: ["중촌동", "대전 중촌동", "중구 중촌동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "대흥동", alias: ["대흥동", "대전 대흥동", "중구 대흥동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "문창동", alias: ["문창동", "대전 문창동", "중구 문창동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "석교동", alias: ["석교동", "대전 석교동", "중구 석교동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "대사동", alias: ["대사동", "대전 대사동", "중구 대사동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "부사동", alias: ["부사동", "대전 부사동", "중구 부사동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "용두동", alias: ["용두동", "대전 용두동", "중구 용두동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "오류동", alias: ["오류동", "대전 오류동", "중구 오류동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "태평동", alias: ["태평1동", "태평2동", "대전 태평동", "중구 태평동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "유천동", alias: ["유천1동", "유천2동", "대전 유천동", "중구 유천동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "문화동", alias: ["문화1동", "문화2동", "대전 문화동", "중구 문화동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "산성동", alias: ["산성동", "대전 산성동", "중구 산성동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true }
        ]
      },
      {
        name: "서구",
        displayName: "서구",
        alias: ["대전 서구", "대전시 서구"],
        regionGroup: "daejeon",
        regionType: "district",
        enabled: true,
        indexable: true,
        subRegions: [
          { name: "복수동", alias: ["복수동", "대전 복수동", "서구 복수동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "도마동", alias: ["도마1동", "도마2동", "대전 도마동", "서구 도마동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "정림동", alias: ["정림동", "대전 정림동", "서구 정림동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "변동", alias: ["변동", "대전 변동", "서구 변동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "용문동", alias: ["용문동", "대전 용문동", "서구 용문동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "탄방동", alias: ["탄방동", "대전 탄방동", "서구 탄방동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "둔산동", alias: ["둔산1동", "둔산2동", "둔산3동", "대전 둔산동", "서구 둔산동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "괴정동", alias: ["괴정동", "대전 괴정동", "서구 괴정동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "가장동", alias: ["가장동", "대전 가장동", "서구 가장동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "내동", alias: ["내동", "대전 내동", "서구 내동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "갈마동", alias: ["갈마1동", "갈마2동", "대전 갈마동", "서구 갈마동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "월평동", alias: ["월평1동", "월평2동", "월평3동", "대전 월평동", "서구 월평동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "만년동", alias: ["만년동", "대전 만년동", "서구 만년동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "가수원동", alias: ["가수원동", "대전 가수원동", "서구 가수원동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "도안동", alias: ["도안동", "대전 도안동", "서구 도안동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "관저동", alias: ["관저1동", "관저2동", "대전 관저동", "서구 관저동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "기성동", alias: ["기성동", "대전 기성동", "서구 기성동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true }
        ]
      },
      {
        name: "유성구",
        displayName: "유성구",
        alias: ["대전 유성구", "대전시 유성구"],
        regionGroup: "daejeon",
        regionType: "district",
        enabled: true,
        indexable: true,
        subRegions: [
          { name: "진잠동", alias: ["진잠동", "대전 진잠동", "유성구 진잠동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "원신흥동", alias: ["원신흥동", "대전 원신흥동", "유성구 원신흥동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "상대동", alias: ["상대동", "대전 상대동", "유성구 상대동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "온천동", alias: ["온천1동", "온천2동", "대전 온천동", "유성구 온천동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "노은동", alias: ["노은1동", "노은2동", "노은3동", "대전 노은동", "유성구 노은동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "신성동", alias: ["신성동", "대전 신성동", "유성구 신성동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "전민동", alias: ["전민동", "대전 전민동", "유성구 전민동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "구즉동", alias: ["구즉동", "대전 구즉동", "유성구 구즉동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "관평동", alias: ["관평동", "대전 관평동", "유성구 관평동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "학하동", alias: ["학하동", "대전 학하동", "유성구 학하동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true }
        ]
      },
      {
        name: "대덕구",
        displayName: "대덕구",
        alias: ["대전 대덕구", "대전시 대덕구"],
        regionGroup: "daejeon",
        regionType: "district",
        enabled: true,
        indexable: true,
        subRegions: [
          { name: "오정동", alias: ["오정동", "대전 오정동", "대덕구 오정동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "대화동", alias: ["대화동", "대전 대화동", "대덕구 대화동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "회덕동", alias: ["회덕동", "대전 회덕동", "대덕구 회덕동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "비래동", alias: ["비래동", "대전 비래동", "대덕구 비래동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "송촌동", alias: ["송촌동", "대전 송촌동", "대덕구 송촌동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "중리동", alias: ["중리동", "대전 중리동", "대덕구 중리동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "법동", alias: ["법1동", "법2동", "대전 법동", "대덕구 법동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "신탄진동", alias: ["신탄진동", "대전 신탄진동", "대덕구 신탄진동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "석봉동", alias: ["석봉동", "대전 석봉동", "대덕구 석봉동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "덕암동", alias: ["덕암동", "대전 덕암동", "대덕구 덕암동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true },
          { name: "목상동", alias: ["목상동", "대전 목상동", "대덕구 목상동"], regionGroup: "daejeon", regionType: "dong", enabled: true, indexable: true }
        ]
      }
    ]
  },
  {
    name: "세종",
    displayName: "세종",
    keywordName: "세종",
    alias: ["세종시"],
    regionGroup: "sejong",
    regionType: "city",
    enabled: true,
    indexable: true,
    subRegions: [
      { name: "조치원읍", displayName: "조치원읍", keywordName: "조치원읍", alias: ["조치원", "세종 조치원읍", "세종시 조치원읍"], regionGroup: "sejong", regionType: "eup", enabled: true, indexable: true },
      { name: "연기면", displayName: "연기면", keywordName: "연기면", alias: ["세종 연기면", "세종시 연기면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "연동면", displayName: "연동면", keywordName: "연동면", alias: ["세종 연동면", "세종시 연동면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "부강면", displayName: "부강면", keywordName: "부강면", alias: ["부강", "세종 부강면", "세종시 부강면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "금남면", displayName: "금남면", keywordName: "금남면", alias: ["세종 금남면", "세종시 금남면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "장군면", displayName: "장군면", keywordName: "장군면", alias: ["세종 장군면", "세종시 장군면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "연서면", displayName: "연서면", keywordName: "연서면", alias: ["세종 연서면", "세종시 연서면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "전의면", displayName: "전의면", keywordName: "전의면", alias: ["세종 전의면", "세종시 전의면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "전동면", displayName: "전동면", keywordName: "전동면", alias: ["세종 전동면", "세종시 전동면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "소정면", displayName: "소정면", keywordName: "소정면", alias: ["세종 소정면", "세종시 소정면"], regionGroup: "sejong", regionType: "myeon", enabled: true, indexable: true },
      { name: "한솔동", displayName: "한솔동", keywordName: "한솔동", alias: ["세종 한솔동", "세종시 한솔동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "도담동", displayName: "도담동", keywordName: "도담동", alias: ["세종 도담동", "세종시 도담동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "아름동", displayName: "아름동", keywordName: "아름동", alias: ["세종 아름동", "세종시 아름동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "종촌동", displayName: "종촌동", keywordName: "종촌동", alias: ["세종 종촌동", "세종시 종촌동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "고운동", displayName: "고운동", keywordName: "고운동", alias: ["세종 고운동", "세종시 고운동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "보람동", displayName: "보람동", keywordName: "보람동", alias: ["세종 보람동", "세종시 보람동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "새롬동", displayName: "새롬동", keywordName: "새롬동", alias: ["세종 새롬동", "세종시 새롬동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "대평동", displayName: "대평동", keywordName: "대평동", alias: ["세종 대평동", "세종시 대평동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "소담동", displayName: "소담동", keywordName: "소담동", alias: ["세종 소담동", "세종시 소담동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "다정동", displayName: "다정동", keywordName: "다정동", alias: ["세종 다정동", "세종시 다정동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "해밀동", displayName: "해밀동", keywordName: "해밀동", alias: ["세종 해밀동", "세종시 해밀동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "반곡동", displayName: "반곡동", keywordName: "반곡동", alias: ["세종 반곡동", "세종시 반곡동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "나성동", displayName: "나성동", keywordName: "나성동", alias: ["세종 나성동", "세종시 나성동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "어진동", displayName: "어진동", keywordName: "어진동", alias: ["세종 어진동", "세종시 어진동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true },
      { name: "집현동", displayName: "집현동", keywordName: "집현동", alias: ["세종 집현동", "세종시 집현동"], regionGroup: "sejong", regionType: "dong", enabled: true, indexable: true }
    ]
  }
];
