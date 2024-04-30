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
  onClickConfirm: () => void;
};

export type ConfirmModalState = {
  type: 'Confim';
  title: string;
  message: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  confirmButtonContent: string;
  cancelButtonContent: string;
};

export type ProfileModalState = {
  type: 'Profile';
  onClickConfirm: () => void;
};
