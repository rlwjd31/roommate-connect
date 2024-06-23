import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
} from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import { supabase } from '@/libs/supabaseClient';
import { IsNotVerifiedAtom, UserAtom } from '@/stores/auth.store';
import {
  EmailAuthType,
  SignUpEmailType,
  SignUpInfoType,
  SocialType,
  UserType,
  VerifyEmailType,
} from '@/types/auth.type';
import { createToast, errorToast, successToast } from '@/libs/toast';
import { ShowVerificationAtom } from '@/stores/sign.store';

const preProcessingUserData = (
  data: AuthTokenResponsePassword | AuthResponse,
): UserType | undefined => {
  if (data.data.user?.email) {
    const { email, id } = data.data.user;
    const { gender, avatar, birth, name, nickname, status } =
      data.data.user.user_metadata;
    return {
      gender,
      avatar,
      birth,
      name,
      nickname,
      email,
      id,
      status,
    };
  }
  throw new Error(data.error?.message);
};

export const useSignUpEmail = () => {
  // const signUpEmailValue = useRecoilValue(SignUpEmailUserAtom);
  const setShowVerification = useSetRecoilState(ShowVerificationAtom);
  const { mutate: signUpEmail, isPending: isSignUpEmail } = useMutation({
    mutationFn: async (payload: SignUpEmailType) =>
      supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            name: uuid(),
            avatar: '',
            email: payload.email,
            status: 0,
          },
        },
      }),
    onMutate: () => createToast('signUp', '인증메일을 전송중입니다.'),
    onError: (error: AuthError) => {
      errorToast('signUp', error.message);
    },
    onSuccess: async () => {
      successToast('signUp', '📧 인증메일이 전송되었습니다.');
      setShowVerification(true);
    },
  });
  return { signUpEmail, isSignUpEmail };
};

export const useSignInEmail = () => {
  const setUser = useSetRecoilState(UserAtom);
  const setIsNotVerified = useSetRecoilState(IsNotVerifiedAtom);
  const { mutate: signInEmail, isPending: isSignInEmail } = useMutation({
    mutationFn: async (payload: EmailAuthType) =>
      supabase.auth.signInWithPassword(payload),
    onMutate: () => createToast('signin', '로그인 시도 중...'),
    onError: (error: AuthError) => {
      errorToast('signin', error.message);
      if (error.message === 'Email not confirmed') {
        setIsNotVerified(true);
      }
    },
    onSuccess: async data => {
      const payload = preProcessingUserData(data);
      // * Recoil 상태로 유저정보 등록
      if (payload) setUser(payload);
      successToast('signin', '로그인 성공!');
    },
  });
  return { signInEmail, isSignInEmail };
};

export const useVerifyEmail = ({
  mutateMessage,
  successMessage,
}: {
  [key: string]: string;
}) => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(UserAtom);
  const { mutate: verifyEmail, isPending: isVerifyEmail } = useMutation({
    mutationFn: async (payload: VerifyEmailType) => {
      const { email, token } = payload;
      if (token) {
        return supabase.auth.verifyOtp({ email, token, type: 'email' });
      }
      throw new Error('토큰이 없습니다.');
    },
    onMutate: () => createToast('signin', mutateMessage),
    onSuccess: async data => {
      const payload = preProcessingUserData(data);
      // * Recoil 상태로 유저정보 등록
      if (payload) setUser(payload);
      successToast('signin', successMessage);
      navigate('/sign/up/info');
    },
    onError: (error: AuthError) => {
      errorToast('signin', error.message);
    },
  });
  return { verifyEmail, isVerifyEmail };
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
    onMutate: () => createToast('signin', '로그인 시도 중...'),
    onError: error => {
      errorToast('signin', error.message);
    },
  });
  return { signInSocial, isSignInSocial };
};

export const useSignInState = () => {
  const [sessionValue, setSessionValue] = useState<Session>();

  //   // ! onAuthStateChange 를 사용하는 이유는 React-Query에서 onSuccess 로 처리를 하면 API Fetching 에 필요한 토큰 값을 받을 수 없기 때문
  //   // ! 토큰을 취득하려면 localStorage 에서 저장된 값을 불러와 하거나 onAuthStateChange 를 사용
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) setSessionValue(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return sessionValue;
};

// * User 의 생년월일, 성별을 저장
export const useUpdateUserInfo = () => {
  const navigate = useNavigate();
  const { mutate: updateUserInfo, isPending } = useMutation({
    mutationFn: async (payload: SignUpInfoType) => {
      const { error } = await supabase.auth.updateUser({
        data: { ...payload, nickname: payload.name },
      });
      if (error) throw new Error(error.message);
    },
    onMutate: () =>
      createToast('update-user-info', '기본 정보를 수정중입니다...'),
    onSuccess: () => {
      successToast('update-user-info', '✅기본 정보 수정을 완료했습니다.');
      navigate('/about');
    },
    onError: error => errorToast('update-user-info', error.message),
  });
  return { updateUserInfo, isPending };
};
