import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AuthError } from '@supabase/supabase-js';

import { supabase } from '@/libs/supabaseClient';
import { UserAtom } from '@/stores/auth.store';
import { EmailAuthType } from '@/types/auth.type';

export const useSignInEmail = () => {
  const setUser = useSetRecoilState(UserAtom);
  const { mutate: signInEmail, isPending: isSignInEmail } = useMutation({
    mutationFn: (payload: EmailAuthType) =>
      supabase.auth.signInWithPassword(payload),
    onMutate: () => {
      toast('로그인 시도 중...', { toastId: 'signin', autoClose: false });
    },
    onError: (error: AuthError) => {
      const errorMessage: { [key: string]: string } = {
        'Failed to sign in: Invalid login credentials':
          '잘못된 이메일 또는 비밀번호입니다',
      };
      toast.update('signin', {
        render: errorMessage[error.message],
        autoClose: 2000,
        type: 'error',
      });
    },
    onSuccess: async data => {
      if (data.data.user) {
        const { email, id } = data.data.user;
        if (email) {
          const { gender, avatar, birth, name, nickname, status } =
            data.data.user.user_metadata;
          const payload = {
            gender,
            avatar,
            birth,
            name,
            nickname,
            email,
            id,
            status,
          };
          // * Recoil 상태로 유저정보 등록
          setUser(payload);
          toast.update('signin', {
            render: '로그인 성공!',
            autoClose: 2000,
            type: 'success',
          });
        } else
          throw new Error('오류가 발생했습니다. 잠시 후 다시 시도해 주세요');
      }
    },
  });
  return { signInEmail, isSignInEmail };
};
