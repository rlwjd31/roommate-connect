import { useRecoilValue } from 'recoil';

import { ProfileModalAtom } from '@/stores/globalModal.store';
import ModalBackdrop from '@/components/organisms/modals/ModalBackdrop';

export default function ProfileModal() {
  const { isOpen } = useRecoilValue(ProfileModalAtom);

  return isOpen ? (
    <ModalBackdrop modalType="Profile">
      <div>ConfirmModal</div>
    </ModalBackdrop>
  ) : null;
}
