import { FC } from 'react';

import Container from '@/components/atoms/Container';
import AlertModal, {
  AlertModalProps,
} from '@/components/organisms/modals/AlertModal';
import ConfirmModal, {
  ConfirmModalProps,
} from '@/components/organisms/modals/ConfirmModal';
import ProfileModal, {
  ProfileModalProps,
} from '@/components/organisms/modals/ProfileModal';

type ModalType = 'Alert' | 'Confirm' | 'Profile';

type ModalTypeProps = {
  Alert: AlertModalProps;
  Confirm: ConfirmModalProps;
  Profile: ProfileModalProps;
};

type GlobalModalProps<T extends ModalType> = {
  modalType: T;
  modalProps: ModalTypeProps[T];
};

// eslint-disable-next-line react-refresh/only-export-components
const TypesOfModals: {
  [T in ModalType]: FC<ModalTypeProps[T]>;
} = {
  Alert: AlertModal,
  Confirm: ConfirmModal,
  Profile: ProfileModal,
};

export default function GlobalModal<T extends ModalType>({
  modalType,
  modalProps,
}: GlobalModalProps<T>) {
  const SelectedModal: FC<ModalTypeProps[T]> = TypesOfModals[modalType];

  return (
    <Container.FlexRow className="fixed left-0 top-0 z-50 h-[100vh] w-[100vw] items-center justify-center bg-[#6D6D6D]/50">
      <SelectedModal {...modalProps} />
    </Container.FlexRow>
  );
}

