import { useRecoilValue } from 'recoil';

import { ProfileModalAtom } from '@/stores/globalModal.store';
import ModalContainer from '@/components/organisms/modals/ModalContainer';

export default function ProfileModal() {
  const { isOpen } = useRecoilValue(ProfileModalAtom);

  return isOpen ? (
    <ModalContainer>
      <div>ConfirmModal</div>
    </ModalContainer>
  ) : null;
}
