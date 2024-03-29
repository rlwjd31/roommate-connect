import { atom, selector } from 'recoil';

export const SignUpProfileTypeAtom = atom<SignUpType['type']>({
  key: 'signUpProfileTypeAtom',
  default: undefined,
});
export const SignUpProfileRentalTypeAtom = atom<SignUpType['rental_type']>({
  key: 'signUpProfileRegionsAtom',
  default: undefined,
});
export const SignUpProfileRegionsAtom = atom<SignUpType['regions']>({
  key: 'signUpProfileRegionsAtom',
  default: [],
});
export const SignUpProfileDepositPriceAtom = atom<SignUpType['deposit_price']>({
  key: 'signUpProfileDepositPriceAtom',
  default: [1, 10000],
});
export const SignUpProfileTermAtom = atom<SignUpType['term']>({
  key: 'signUpProfileTermAtom',
  default: [1, 24],
});
export const SignUpProfileMonthlyPriceAtom = atom<SignUpType['monthly_price']>({
  key: 'signUpProfileMonthlyPriceAtom',
  default: [1, 500],
});
export const SignUpProfileSmokingAtom = atom<SignUpType['smoking']>({
  key: 'signUpProfileSmokingAtom',
  default: undefined,
});
export const SignUpProfilePetAtom = atom<SignUpType['pet']>({
  key: 'signUpProfilePetAtom',
  default: undefined,
});
export const SignUpProfileAppealsAtom = atom<SignUpType['appeals']>({
  key: 'signUpProfileAppealsAtom',
  default: [],
});
export const SignUpProfileGenderAtom = atom<SignUpType['gender']>({
  key: 'signUpProfileGenderAtom',
  default: undefined,
});
export const SignUpProfileMatesNumberAtom = atom<SignUpType['mates_number']>({
  key: 'signUpProfileMateNumberAtom',
  default: undefined,
});
export const SignUpProfileMateAppealsAtom = atom<SignUpType['mate_appeals']>({
  key: 'signUpProfileMateAppealsAtom',
  default: [],
});

export const SignUpProfileSelector = selector<SignUpType>({
  key: 'SignUpProfileSelector',
  get: ({ get }) => {
    const type = get(SignUpProfileTypeAtom);
    const rental_type = get(SignUpProfileRentalTypeAtom);
    const regions = get(SignUpProfileRegionsAtom);
    const deposit_price = get(SignUpProfileDepositPriceAtom);
    const term = get(SignUpProfileTermAtom);
    const monthly_price = get(SignUpProfileMonthlyPriceAtom);
    const smoking = get(SignUpProfileSmokingAtom);
    const pet = get(SignUpProfilePetAtom);
    const appeals = get(SignUpProfileAppealsAtom);
    const gender = get(SignUpProfileGenderAtom);
    const mates_number = get(SignUpProfileMatesNumberAtom);
    const mate_appeals = get(SignUpProfileMateAppealsAtom);
    return {
      type,
      rental_type,
      regions,
      deposit_price,
      term,
      monthly_price,
      smoking,
      pet,
      appeals,
      gender,
      mates_number,
      mate_appeals,
    };
  },
});
