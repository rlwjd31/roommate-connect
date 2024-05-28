import { IconType } from '@/types/icon.type';
import { SignUpType } from '@/types/signUp.type';

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

export {
  houseTypeDisplayData,
  rentalTypeDisplayData,
  smokeDisplayData,
  petDisplayData,
  genderDisplayData,
  mateNumberDisplayData,
};
