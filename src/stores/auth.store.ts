import { atom } from 'recoil';

import { UserType } from '@/types/auth.type';

export const UserAtom = atom<UserType | null>({
  key: 'userAtom',
  default: null,
});
