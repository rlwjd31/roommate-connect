import { SignUpType } from '@/types/signUp.type';
import { atom, selector } from 'recoil';
// ? type 집 유형 0: 원룸/오피스텔, 1: 빌라/연립, 2: 아파트, 3: 단독주택 @number
export const SignUpProfileTypeAtom = atom<SignUpType['type']>({
  key: 'signUpProfileTypeAtom',
  default: undefined,
});
// ? rental_type 집 대여 유형 0: 월세, 1: 전세, 2: 반 전세 @number
export const SignUpProfileRentalTypeAtom = atom<SignUpType['rental_type']>({
  key: 'signUpProfileRentalTypeAtom',
  default: undefined,
});
// ? regions 유저가 찾는 지역 >도시 (region) + 구(district) 형태의 배열 @string[]
export const SignUpProfileRegionsAtom = atom<SignUpType['regions']>({
  key: 'signUpProfileRegionsAtom',
  default: [],
});
// ? deposit_price 보증금 (전세 혹은 월세) 범위 [최소 금액, 최대 금액] (0만원~10000만원) @[number, number]
export const SignUpProfileDepositPriceAtom = atom<SignUpType['deposit_price']>({
  key: 'signUpProfileDepositPriceAtom',
  default: [0, 10000],
});
// ? term 유저가 살 기간 [최소기간, 최대 기간] (0 ~ 24)범위 @[number, number]
export const SignUpProfileTermAtom = atom<SignUpType['term']>({
  key: 'signUpProfileTermAtom',
  default: [0, 24],
});
// ? monthly_rental_price 월세 [최소 금액, 최대 금액] (0만원, 500만원) @[number, number]
export const SignUpProfileMonthlyPriceAtom = atom<SignUpType['monthly_price']>({
  key: 'signUpProfileMonthlyPriceAtom',
  default: [0, 500],
});
// ? smoking 흡연 여부 @boolean
export const SignUpProfileSmokingAtom = atom<SignUpType['smoking']>({
  key: 'signUpProfileSmokingAtom',
  default: undefined,
});
// ? pet 펫 여부 0: 상관없음, 1: 좋음, 2: 싫음 @number
export const SignUpProfilePetAtom = atom<SignUpType['pet']>({
  key: 'signUpProfilePetAtom',
  default: undefined,
});
// ? appeals 유저의 어필할 매력(배열형태) @string[]
export const SignUpProfileAppealsAtom = atom<SignUpType['appeals']>({
  key: 'signUpProfileAppealsAtom',
  default: [],
});
// ? gender 상대방의 성별 0: 상관없음, 1: 남성, 2: 여성 @number
export const SignUpProfileGenderAtom = atom<SignUpType['gender']>({
  key: 'signUpProfileGenderAtom',
  default: undefined,
});
// ? mates_number 인원수 0: 상관없음, 1: 1명, 2: 2명, 3: 3명이상 @number
export const SignUpProfileMatesNumberAtom = atom<SignUpType['mates_number']>({
  key: 'signUpProfileMateNumberAtom',
  default: undefined,
});
// ? mate_appeals 유저가 원하는 상대방의 매력 (배열형태) @string[]
export const SignUpProfileMateAppealsAtom = atom<SignUpType['mate_appeals']>({
  key: 'signUpProfileMateAppealsAtom',
  default: [],
});

export const SignUpProfileSelector = selector<SignUpType>({
  key: 'SignUpProfileSelector',
  get: ({ get }) => {
    const type = get(SignUpProfileTypeAtom);
    const rentalType = get(SignUpProfileRentalTypeAtom);
    const regions = get(SignUpProfileRegionsAtom);
    const depositPrice = get(SignUpProfileDepositPriceAtom);
    const term = get(SignUpProfileTermAtom);
    const monthlyPrice = get(SignUpProfileMonthlyPriceAtom);
    const smoking = get(SignUpProfileSmokingAtom);
    const pet = get(SignUpProfilePetAtom);
    const appeals = get(SignUpProfileAppealsAtom);
    const gender = get(SignUpProfileGenderAtom);
    const matesNumber = get(SignUpProfileMatesNumberAtom);
    const mateAppeals = get(SignUpProfileMateAppealsAtom);
    return {
      type,
      rental_type: rentalType,
      regions,
      deposit_price: depositPrice,
      term,
      monthly_price: monthlyPrice,
      smoking,
      pet,
      appeals,
      gender,
      mates_number: matesNumber,
      mate_appeals: mateAppeals,
    };
  },
});
