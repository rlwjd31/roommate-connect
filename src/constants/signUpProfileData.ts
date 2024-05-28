import { IconType } from '@/types/icon.type';
import { SignUpType } from '@/types/signUp.type';

const stepDisplayData = [
  {
    stepTitle: '내가 찾는 집',
    stepNum: 1,
    stepContents: [
      {
        labelName: '집 유형, 매물 종류',
        carouselCurrentStep: 0,
      },
      {
        labelName: '위치, 기간',
        carouselCurrentStep: 1,
      },
      {
        labelName: '가격대',
        carouselCurrentStep: 2,
      },
    ],
  },
  {
    stepTitle: '나의 라이프스타일',
    stepNum: 2,
    stepContents: [
      {
        labelName: '흡연, 반려동물',
        carouselCurrentStep: 3,
      },
      {
        labelName: '나의 라이프스타일 어필',
        carouselCurrentStep: 4,
      },
    ],
  },
  {
    stepTitle: '내가 원하는 룸메이트',
    stepNum: 3,
    stepContents: [
      {
        labelName: '성별, 인원 수',
        carouselCurrentStep: 5,
      },
      {
        labelName: '원하는 라이프스타일 어필',
        carouselCurrentStep: 6,
      },
    ],
  },
];

const houseTypeDisplayData: {
  displayValue: string;
  stateValue: SignUpType['type'];
  iconType: IconType;
}[] = [
  {
    displayValue: '원룸/오피스텔',
    stateValue: 0,
    iconType: 'studio-officetel',
  },
  {
    displayValue: '빌라/연립',
    stateValue: 1,
    iconType: 'villa-townhouse',
  },
  {
    displayValue: '아파트',
    stateValue: 2,
    iconType: 'apartment',
  },
  {
    displayValue: '단독주택',
    stateValue: 3,
    iconType: 'single-family-house',
  },
];

const rentalTypeDisplayData: {
  displayValue: string;
  stateValue: SignUpType['rental_type'];
}[] = [
  {
    displayValue: '월세',
    stateValue: 1,
  },
  {
    displayValue: '반전세',
    stateValue: 2,
  },
  {
    displayValue: '전세',
    stateValue: 3,
  },
  {
    displayValue: '상관없음',
    stateValue: 0,
  },
];

const smokeDisplayData: {
  displayValue: string;
  stateValue: SignUpType['smoking'];
  iconType: IconType;
}[] = [
  {
    displayValue: '흡연자',
    stateValue: true,
    iconType: 'smoke',
  },
  {
    displayValue: '비흡연자',
    stateValue: false,
    iconType: 'none-smoke',
  },
];

const petDisplayData: {
  displayValue: string;
  stateValue: SignUpType['pet'];
  iconType: IconType;
}[] = [
  {
    displayValue: '반려동물 키워요',
    stateValue: 1,
    iconType: 'pet-lover',
  },
  {
    displayValue: '반려동물 NO',
    stateValue: 2,
    iconType: 'none-pet-lover',
  },
  {
    displayValue: '상관없어요',
    stateValue: 0,
    iconType: 'dont-mind-pet',
  },
];

const genderDisplayData: {
  displayValue: string;
  stateValue: SignUpType['gender'];
  iconType: IconType;
}[] = [
  {
    displayValue: '남성',
    stateValue: 1,
    iconType: 'male',
  },
  {
    displayValue: '여성',
    stateValue: 2,
    iconType: 'female',
  },
  {
    displayValue: '상관없어요',
    stateValue: 0,
    iconType: 'dont-mind-sex',
  },
];

const mateNumberDisplayData: {
  displayValue: string;
  stateValue: SignUpType['mates_number'];
}[] = [
  {
    displayValue: '1명',
    stateValue: 1,
  },
  {
    displayValue: '2명',
    stateValue: 2,
  },
  {
    displayValue: '3명',
    stateValue: 3,
  },
  {
    displayValue: '상관없어요',
    stateValue: 0,
  },
];

const signUpProfileValidationConfig = {
  0: {
    fields: ['houseType', 'rentalType'],
    messages: {
      houseType: '집 유형을 선택해주세요',
      rentalType: '매물 종류를 선택해주세요',
    },
  },
  1: {
    fields: ['regions'],
    messages: {
      regions: '위치를 선택해주세요',
    },
  },
  3: {
    fields: ['smoking', 'pet'],
    messages: {
      smoking: '흡연 여부를 선택해주세요',
      pet: '반려동물 여부를 선택해주세요',
    },
  },
  4: {
    fields: ['appeals'],
    messages: {
      appeals: '어필을 입력해주세요',
    },
  },
  5: {
    fields: ['gender', 'matesNumber'],
    messages: {
      gender: '성별을 선택해주세요',
      matesNumber: '인원 수를 선택해주세요',
    },
  },
  6: {
    fields: ['mateAppeals'],
    messages: {
      mateAppeals: '어필을 입력해주세요',
    },
  },
} as const;

export type ValidationConfig = typeof signUpProfileValidationConfig;
export type ValidationStep = keyof ValidationConfig;
export type ValidationStepFieldName =
  keyof ValidationConfig[ValidationStep]['messages'];

export {
  stepDisplayData,
  houseTypeDisplayData,
  rentalTypeDisplayData,
  smokeDisplayData,
  petDisplayData,
  genderDisplayData,
  mateNumberDisplayData,
  signUpProfileValidationConfig,
};
