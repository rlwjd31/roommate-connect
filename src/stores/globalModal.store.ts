import { atom, errorSelector, selectorFamily } from 'recoil';

import {
  AlertModalState,
  ConfirmModalState,
  GlobalModalState,
  ModalStateByType,
  ModalType,
  ProfileModalState,
} from '@/types/modal.type';

// ! TODO: 나중에 isOpen을 false로 바꾸어야 한다.
export const GlobalModalAtom = atom<GlobalModalState>({
  key: 'globalModalstate',
  default: {
    isOpen: false,
    modalType: 'Alert',
  },
});

export const AlertModalAtom = atom<AlertModalState>({
  key: 'alertModalState',
  default: {
    type: 'Alert',
    title: '',
    message: '',
    buttonContent: '',
    onClick: () => {},
  },
});

export const ConfirmModalAtom = atom<ConfirmModalState>({
  key: 'confirmModalState',
  default: {
    type: 'Confim',
    title: '',
    message: '',
    onClickCancel: () => {},
    onClickConfirm: () => {},
    confirmButtonContent: '',
    cancelButtonContent: '',
  },
});

export const ProfileModalAtom = atom<ProfileModalState>({
  key: 'profileModalState',
  default: {
    type: 'Profile',
  },
});

export default {};
