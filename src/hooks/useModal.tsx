import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

import { GlobalModalAtom, ModalSelector } from '@/stores/globalModal.store';
import { ModalStateByType, ModalType } from '@/types/modal.type';

type UseModalProps<T extends ModalType> = {
  type: T;
  modalProps: ModalStateByType[T];
};

// ! 나중에 modal을 연속적으로 띄우고 싶을 때 queue의 형태로 modal을 구현필요할 수도???

export default function useModal<T extends ModalType>({
  type,
  modalProps,
}: UseModalProps<T>) {
  const [{ isOpen, modalType }, setGlobalModalState] =
    useRecoilState(GlobalModalAtom);
  const [modal, setModal] = useRecoilState(ModalSelector(modalType));

  const openModal = () =>
    setGlobalModalState(prev => ({ ...prev, isOpen: true }));
  const closeModal = () =>
    setGlobalModalState(prev => ({ ...prev, isOpen: false }));
  const getModalState = () => modal;

  useEffect(() => {
    setGlobalModalState(prev => ({ ...prev, modalType: type }));
    setModal(
      'onClickCancel' in modalProps
        ? {
            ...modalProps,
            onClickConfirm: () => {
              modalProps.onClickConfirm();
              closeModal();
            },
            onClickCancel: () => {
              modalProps.onClickCancel();
              closeModal();
            },
          }
        : {
            ...modalProps,
            onClickConfirm: () => {
              modalProps.onClickConfirm();
              closeModal();
            },
          },
    );
  }, []);

  return { openModal, closeModal, getModalState, isModalOpen: isOpen === true };
}
