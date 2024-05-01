import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

import { GlobalModalAtom, ModalSelector } from '@/stores/globalModal.store';
import {
  ConfirmModalState,
  ModalStateByType,
  ModalType,
} from '@/types/modal.type';

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
  const [modal, setModal] = useRecoilState(ModalSelector(type));

  const openModal = () =>
    setGlobalModalState(prev => ({ ...prev, isOpen: true }));
  const closeModal = () =>
    setGlobalModalState(prev => ({ ...prev, isOpen: false }));
  const getModalState = () => modal;

  useEffect(() => {
    setGlobalModalState(prev => ({ ...prev, modalType: type }));

    // ! closeModal과 같이 모든 button에 대한 기본 동작을 넣어주면된다.
    // ! 추후, async후 modal이 닫히게 될 기능이 있다면 closeModal()을 function scope의
    // ! 맨 하단에 위치
    const nextModalProps = {
      ...modalProps,
      onClickConfirm: () => {
        modalProps.onClickConfirm();
        closeModal();
      },
    };

    if (modalProps.type === 'Confim') {
      (nextModalProps as ConfirmModalState).onClickCancel = () => {
        modalProps.onClickCancel();
        closeModal();
      };
    }
    console.log('nextModalProps in useEffect 👇\n', nextModalProps);

    setModal({ ...nextModalProps });
  }, []);

  console.log('console modal state =>', modal);

  return { openModal, closeModal, getModalState, isModalOpen: isOpen === true };
}
