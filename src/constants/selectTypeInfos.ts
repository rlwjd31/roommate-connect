import { IconType } from "@/types/icon.type";
import { SignUpType } from "@/types/signUp.type";

export const houseTypeInfos: {
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

export const rentalTypeInfos: {
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

export const matesNumInfo = [
  {
    displayValue: '1명',
    stateValue: 1,
  },
  {
    displayValue: '2명',
    stateValue: 2,
  },
  {
    displayValue: '3명 이상',
    stateValue: 3,
  },
  {
    displayValue: '상관없어요',
    stateValue: 0,
  },
];
