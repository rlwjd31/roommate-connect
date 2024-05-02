export type ModalType = 'Alert' | 'Confirm' | 'Profile';

export type ModalStateByType = {
  Alert: AlertModalState;
  Confirm: ConfirmModalState;
  Profile: ProfileModalState;
};

export type AlertModalState = {
  isOpen: boolean;
  type: 'Alert';
  title: string;
  message: string;
  buttonContent: string;
  onClickConfirm: () => void;
};

export type ConfirmModalState = {
  isOpen: boolean;
  type: 'Confim';
  title: string;
  message: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  confirmButtonContent: string;
  cancelButtonContent: string;
};

export type ProfileModalState = {
  isOpen: boolean;
  type: 'Profile';
  onClickConfirm: () => void;
};
