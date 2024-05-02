import { useRecoilValue } from 'recoil';

import AlertModal from '@/components/organisms/modals/AlertModal';
import ConfirmModal from '@/components/organisms/modals/ConfirmModal';
import ProfileModal from '@/components/organisms/modals/ProfileModal';
import { GlobalModalAtom } from '@/stores/globalModal.store';

export default function GlobalModal() {
  const  modalType  = useRecoilValue(GlobalModalAtom);

  // eslint-disable-next-line react-refresh/only-export-components
  const TypesOfModals = {
    Alert: AlertModal,
    Confirm: ConfirmModal,
    Profile: ProfileModal,
  };

  const SelectedModal = TypesOfModals[modalType];
  console.log('SelectedModal', SelectedModal);

  return <SelectedModal />;
}
