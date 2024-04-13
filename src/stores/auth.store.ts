import { atom, AtomEffect } from 'recoil';

import { UserLocalStorageType, UserType } from '@/types/auth.type';

const UserAtomEffect =
  (key: string): AtomEffect<UserType | null> =>
  ({ setSelf }) => {
    const storageUser = localStorage.getItem(key);
    if (storageUser !== null) {
      const userObject = JSON.parse(storageUser) as UserLocalStorageType;
      const { id } = userObject.user;
      const { name, nickname, gender, email, avatar, birth, status } =
        userObject.user.user_metadata;
      setSelf({
        id,
        name,
        nickname,
        gender,
        email,
        avatar,
        birth,
        status,
      });
    }
  };

export const UserAtom = atom<UserType | null>({
  key: 'userAtom',
  default: null,
  effects: [UserAtomEffect('sb-vkgzfgadnhdgapepgjlp-auth-token')],
});
