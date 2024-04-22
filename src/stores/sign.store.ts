import { atom, selectorFamily } from 'recoil';

import { SignUpType } from '@/types/signUp.type';

export const SignUpProfileState = atom<SignUpType>({
  key: 'signUpProfileState',
  default: {
    type: undefined,
    rental_type: undefined,
    regions: [],
    deposit_price: [0, 10000],
    term: [0, 24],
    monthly_price: [0, 500],
    smoking: undefined,
    pet: undefined,
    appeals: [],
    gender: undefined,
    mates_number: undefined,
    mate_appeals: [],
  },
});

export const SignupProfileStateSelector = selectorFamily<
  SignUpType[keyof SignUpType],
  keyof SignUpType
>({
  key: 'signupProfileStateSelector',
  get:
    param =>
    ({ get }) =>
      get(SignUpProfileState)[param],
  set:
    param =>
    ({ set }, newValue) =>
      set(SignUpProfileState, prevState => ({
        ...prevState,
        [param]: newValue,
      })),
});

export default {};
