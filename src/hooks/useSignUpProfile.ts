import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { supabase } from '@/libs/supabaseClient';
import { SignUpProfileType } from '@/types/signUp.type';
import { createToast, errorToast, successToast } from '@/libs/toast';
import { UserAtom } from '@/stores/auth.store';

const useSignUpProfile = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(UserAtom);
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: SignUpProfileType) => {
      if (!user) throw new Error('Authentication Required!');
      const {
        smoking,
        pet,
        appeals,
        mate_appeals,
        mates_number,
        gender,
        monthly_rental_price,
        deposit_price,
        rental_type,
        type,
        term,
        regions,
      } = payload;
      const userLifeStyle = {
        id: user.id,
        smoking: smoking as boolean,
        pet: pet as number,
        appeals,
      };
      const userLookingHouse = {
        id: user.id,
        type: type as number,
        rental_type: rental_type as number,
        regions,
        term,
        deposit_price,
        monthly_rental_price,
      };
      // @FIXME: user_mate_style db를 바꿈에 따라 mismatch column을 변경해야 함.
      const userMateStyle = {
        id: user.id,
        gender: gender as number,
        mates_number: mates_number as number,
        mate_appeals,
      };
      return Promise.all([
        supabase.from('user_lifestyle').upsert([userLifeStyle]),
        supabase.from('user_looking_house').upsert([userLookingHouse]),
        supabase.from('user_mate_style').upsert([userMateStyle]),
      ]);
    },
    onMutate: () =>
      createToast('signUpProfile', '프로필 설정을 마무리 하고 있습니다...'),
    onError: () => errorToast('signUpProfile', '프로필 설정에 실패하였습니다.'),
    onSuccess: () => {
      successToast('signUpProfile', '프로필 설정을 완료했습니다.');
      navigate('/signup-outro');
    },
  });
  return { mutate, isPending };
};

export default useSignUpProfile;
