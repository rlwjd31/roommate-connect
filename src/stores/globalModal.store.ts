import { atom, errorSelector, selectorFamily } from 'recoil';

import {
  AlertModalState,
  ConfirmModalState,
  // GlobalModalState,
  ModalStateByType,
  ModalType,
  ProfileModalState,
} from '@/types/modal.type';

export const GlobalModalAtom = atom<ModalType>({
  key: 'globalModalstate',
  default: 'Alert'
});

export const AlertModalAtom = atom<AlertModalState>({
  key: 'alertModalState',
  default: {
    isOpen: false,
    type: 'Alert',
    title: '',
    message: '',
    buttonContent: '',
    onClickConfirm: () => {},
  },
});

export const ConfirmModalAtom = atom<ConfirmModalState>({
  key: 'confirmModalState',
  default: {
    isOpen: false,
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
    isOpen: false,
    type: 'Profile',
    onClickConfirm: () => {},
  },
});

export const ModalSelector = selectorFamily({
  key: 'modalPropsByType',
  get:
    <P extends ModalType>(modalType: P) =>
    ({ get }) => {
      switch (modalType) {
        case 'Alert':
          return get(AlertModalAtom) as ModalStateByType[P];
        case 'Confirm':
          return get(ConfirmModalAtom) as ModalStateByType[P];
        case 'Profile':
          return get(ProfileModalAtom) as ModalStateByType[P];
        default:
          errorSelector('Undefined cannot be a value of ModalType.');
          throw new Error('Undefined cannot be a value of ModalType.');
      }
    },
  set:
    <P extends ModalType>(modalType: P) =>
    ({ set }, newModalState) => {
      switch (modalType) {
        case 'Alert':
          set(AlertModalAtom, newModalState as AlertModalState);
          break;
        case 'Confirm':
          set(ConfirmModalAtom, newModalState as ConfirmModalState);
          break;
        case 'Profile':
          set(ProfileModalAtom, newModalState as ProfileModalState);
          break;
        default:
          // eslint-disable-next-line no-console
          errorSelector(`Received unexpected modal type: ${modalType}`);
          throw new Error(`Received unexpected modal type: ${modalType}`);
      }
    },
});

export default {};
