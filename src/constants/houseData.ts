import { HouseFormType } from '@/types/house.type';
import { IconType } from '@/types/izcon.type';
import { SignUpProfileFormType } from '@/types/signUp.type';

const floorDisplayData: {
  displayValue: string;
  stateValue: HouseFormType['floor'];
}[] = [
  {
    displayValue: '지하',
    stateValue: 0,
  },
  {
    displayValue: '반지하',
    stateValue: 1,
  },
  {
    displayValue: '지층',
    stateValue: 2,
  },
];

const matesGenderDisplayData: {
  displayValue: string;
  stateValue: SignUpProfileFormType['gender'];
  iconType: IconType;
}[] = [
  {
    displayValue: '남성',
    stateValue: 1,
    iconType: 'icon-male',
  },
  {
    displayValue: '여성',
    stateValue: 2,
    iconType: 'icon-female',
  },
  {
    displayValue: '성별 상관없어요',
    stateValue: 0,
    iconType: 'icon-gender-free',
  },
];

export { floorDisplayData, matesGenderDisplayData };
