import { atom, errorSelector, selectorFamily } from 'recoil';

import {
  AlertModalState,
  ConfirmModalState,
  GlobalModalState,
  ModalStateByType,
  ModalType,
  ProfileModalState,
} from '@/types/modal.type';

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
export const ModalSelector = selectorFamily<
  ModalStateByType[keyof ModalStateByType],
  ModalType
>({
  key: 'modalPropsByType',
  get:
    <P extends ModalType>(modalType: P) =>
    ({ get }) => {
      switch (modalType) {
        case 'Alert':
          return get(AlertModalAtom) as AlertModalState;
        case 'Confirm':
          return get(ConfirmModalAtom) as ConfirmModalState;
        case 'Profile':
          return get(ProfileModalAtom) as ProfileModalState;
        default:
          errorSelector('Undefined cannot be a value of ModalType.');
          return get(AlertModalAtom) as AlertModalState;
      }
    },
  set:
    modalType =>
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
          console.warn(`Received unexpected modal type: ${modalType}`);
          errorSelector(`Received unexpected modal type: ${modalType}`);
      }
    },
});

export default {};
