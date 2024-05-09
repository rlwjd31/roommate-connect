import { MouseEvent, ReactNode } from 'react';
import { useResetRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import { ModalType } from '@/types/modal.type';
import { ModalSelector } from '@/stores/globalModal.store';

type ModalContainerType = {
  children: ReactNode;
  modalType: ModalType;
};

export default function ModalBackdrop({
  children,
  modalType,
}: ModalContainerType) {
  const resetModalState = useResetRecoilState(ModalSelector(modalType));

  const onClickOutsideCloseModal = ({
    currentTarget,
    target,
  }: MouseEvent<HTMLDivElement>) => {
    if (currentTarget === target) {
      resetModalState();
    }
  };

  return (
    <Container.FlexRow
      onClick={onClickOutsideCloseModal}
      className="fixed left-0 top-0 z-50 h-[100vh] w-[100vw] cursor-pointer items-center justify-center bg-[#6D6D6D]/50"
    >
      {children}
    </Container.FlexRow>
  );
}
