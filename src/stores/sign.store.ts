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

export const SignupProfileStateSelector = selectorFamily({
  key: 'signupProfileStateSelector',
  get:
    <K extends keyof SignUpType>(param: K) =>
    ({ get }) =>
      get(SignUpProfileState)[param],
  set:
    <K extends keyof SignUpType>(param: K) =>
    ({ set }, newValue) =>
      set(SignUpProfileState, prevState => ({
        ...prevState,
        [param]: newValue,
      })),
});

export default {};
