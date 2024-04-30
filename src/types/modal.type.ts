import { MouseEvent } from 'react';

export type ModalType = 'Alert' | 'Confirm' | 'Profile';

export type GlobalModalState = {
  isOpen: boolean;
  modalType: ModalType;
};

export type ModalStateByType = {
  Alert: AlertModalState;
  Confirm: ConfirmModalState;
  Profile: ProfileModalState;
};

export type AlertModalState = {
  type: 'Alert';
  title: string;
  message: string;
  buttonContent: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type ConfirmModalState = {
  type: 'Confim';
  title: string;
  message: string;
  onClickCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
  confirmButtonContent: string;
  cancelButtonContent: string;
};

export type ProfileModalState = {
  type: 'Profile';
};
