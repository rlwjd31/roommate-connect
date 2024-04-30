import { useRecoilValue } from 'recoil';

import { ProfileModalAtom } from '@/stores/globalModal.store';

export default function ProfileModal() {
  const profileModalState = useRecoilValue(ProfileModalAtom);

  return <div>ConfirmModal</div>;
}
