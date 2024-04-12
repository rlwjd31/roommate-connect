import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { AuthError, Session } from '@supabase/supabase-js';

import { supabase } from '@/libs/supabaseClient';
import { UserAtom } from '@/stores/auth.store';
import {
  EmailAuthType,
  GoogleOAuthType,
  KakaoOAuthType,
  SocialType,
  UserAdditionalType,
  UserType,
} from '@/types/auth.type';
import { fetchGet } from '@/libs/fetch';

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

export const useSignInSocial = () => {
  const { mutate: signInSocial, isPending: isSignInSocial } = useMutation({
    mutationFn: async (payload: SocialType) => {
      const options = {
        kakao: {
          scopes: 'gender, birthday, birthyear',
        },
        google: {
          scopes:
            'https://www.googleapis.com/auth/user.gender.read, https://www.googleapis.com/auth/user.birthday.read',
        },
      };
      // * 강제로 에러를 발생 시킬 수 없음
      // * signInWithOAuth 내부 과정에서 에러가 발생하지 않으면 바로 SIGNED_IN 으로 이벤트 발생
      return supabase.auth.signInWithOAuth({
        provider: payload,
        options: options[payload],
      });
    },
    onError: error => {
      toast.update('signin', {
        render: error.message,
        autoClose: 2000,
        type: 'error',
      });
    },
    onMutate: () => {
      toast('로그인 시도 중...', { toastId: 'signin', autoClose: false });
    },
  });
  return { signInSocial, isSignInSocial };
};

// * User 의 생년월일, 성별을 얻기 위해 추가적으로 진행하는 요청
export const useUserAdditionalInfo = (session: Session) => ({
  queryKey: ['user-additional-info'],
  queryFn: async () => {
    const user: UserAdditionalType = {};
    if (session.user.app_metadata.providers.includes('kakao')) {
      const response = await fetchGet<KakaoOAuthType>(
        'https://kapi.kakao.com/v2/user/me?property_keys=["kakao_account.gender", "kakao_account.birthday", "kakao_account.birthyear"]',
        session.provider_token ?? undefined,
      );
      user.gender = response.kakao_account?.gender === 'male' ? 1 : 2;
      user.birth = Number(
        `${response.kakao_account?.birthyear.slice(2)}${response.kakao_account?.birthday}`,
      );
    } else if (session.user.app_metadata.providers.includes('google')) {
      /*
       * Google 은 이메일로 우리가 생성한 이메일 회원가입과 같은 이메일을 사용하게 되면
       * session.user.app_metadata.provider 가 먼저 생성한 것으로 처리됨
       * 그래서 session.user.app_metadata.providers 라는 객체 값에서
       * ["email", "google"] 이런 형태로 저장이 되어 있어 google 이 있을 경우 하위 로직을 실행
       * */
      const response = await fetchGet<GoogleOAuthType>(
        'https://people.googleapis.com/v1/people/me?personFields=genders,birthdays',
        session.provider_token ?? '',
      );
      user.gender = response.genders[0].value === 'male' ? 1 : 2;
      const { year, month, day } = response.birthdays[0].date;
      user.birth = Number(
        `${String(year).slice(2)}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`,
      );
    }
    return user;
  },
});
export const useUpdateUser = () => {
  // * Social 로그인에서 Gender, Birth 데이터를 DB와 연동하기 위한 훅
  const setUser = useSetRecoilState(UserAtom);
  const { mutate: updateUser, isPending: isUpdateUser } = useMutation({
    mutationFn: async (payload: UserAdditionalType) =>
      supabase.auth.updateUser({ data: { ...payload } }),
    onSuccess: async data => {
      // * 성별과 생년월일을 업데이트 후 신규 가입 시에만 닉네임 및 status(정지 여부)에 대한 값이 없어 수동으로 추가
      const { user } = data.data;
      if (user) {
        const {
          gender,
          avatar,
          birth,
          user_name: name,
          email,
        } = user.user_metadata;
        const payload = { gender, avatar, birth, name, email };
        if (!user.user_metadata.nickname) {
          const updatePayload = { status: 0, nickname: name };
          await supabase.auth.updateUser({ data: { ...updatePayload } });
          Object.assign(payload, updatePayload);
        } else {
          Object.assign(payload, {
            status: user.user_metadata.status,
            nickname: user.user_metadata.nickname,
          });
        }
        toast.update('signin', {
          render: '로그인 완료',
          autoClose: 1500,
          type: 'success',
        });
        // * Recoil 상태로 유저정보 등록
        setUser(payload as UserType);
      } else {
        throw new Error('오류가 발생했습니다. 잠시 후 다시 시도해 주세요');
      }
    },
    onError: error => {
      toast.update('signin', {
        render: error.message,
        autoClose: 2000,
        type: 'error',
      });
    },
  });
  return { updateUser, isUpdateUser };
};
