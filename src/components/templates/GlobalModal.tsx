import { useRecoilValue } from 'recoil';
import { ReactNode } from 'react';

import Container from '@/components/atoms/Container';
import AlertModal from '@/components/organisms/modals/AlertModal';
import ConfirmModal from '@/components/organisms/modals/ConfirmModal';
import ProfileModal from '@/components/organisms/modals/ProfileModal';
import { GlobalModalAtom } from '@/stores/globalModal.store';

type ModalContainerType = {
  children: ReactNode;
};

function ModalContainer({ children }: ModalContainerType) {
  return (
    <Container.FlexRow className="fixed left-0 top-0 z-50 h-[100vh] w-[100vw] items-center justify-center bg-[#6D6D6D]/50">
      {children}
    </Container.FlexRow>
  );
}

export default function GlobalModal() {
  const { modalType, isOpen } = useRecoilValue(GlobalModalAtom);

  // eslint-disable-next-line react-refresh/only-export-components
  const TypesOfModals = {
    Alert: AlertModal,
    Confirm: ConfirmModal,
    Profile: ProfileModal,
  };

  const SelectedModal = TypesOfModals[modalType];

  return isOpen ? (
    <ModalContainer>
      <SelectedModal />
    </ModalContainer>
  ) : null;
}
