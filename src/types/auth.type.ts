import { Session } from '@supabase/supabase-js';

export type EmailAuthType = {
  name: string;
  birth: number;
  gender: number;
  email: string;
  password: string;
  token?: string;
};

// * 미인증 유저가 로그인 할 경우 인증할 때 사용할 타입
export type VerifyEmailType = Omit<EmailAuthType, 'password'>;

// * 추가 과정(API)이 필요한 데이터 타입
export type UserAdditionalType = {
  birth?: number;
  gender?: number;
};

// * 회원가입 시 사용되는 타입
export type SignUpUserType = EmailAuthType &
  UserAdditionalType & { name: string };

// * 상태로 관리할 User 의 타입
export type UserType = UserAdditionalType & {
  avatar: string;
  email: string;
  id: string;
  name: string;
  nickname: string | null;
  status: number;
};

// * 로그인 후 LocalStorage 타입
export type UserLocalStorageType = Session;

// * Social 종류
export type SocialType = 'kakao' | 'google';

// * Kakao API 요청 시 반환타입
export type KakaoOAuthType = {
  id: number;
  connected_at: string;
  synched_at: string;
  kakao_account: {
    has_birthyear: boolean;
    birthyear_needs_agreement: boolean;
    birthyear: string;
    has_birthday: boolean;
    birthday_needs_agreement: boolean;
    birthday: string;
    birthday_type: string;
    has_gender: boolean;
    gender_needs_agreement: boolean;
    gender: string;
  } | null;
};

// * Google API 요청 시 반환타입
export type GoogleOAuthType = {
  resourceName: string;
  etag: string;
  genders: [
    {
      metadata: {
        primary: boolean;
        source: {
          type: string;
          id: string;
        };
      };
      value: string;
      formattedValue: string;
    },
  ];
  birthdays: [
    {
      metadata: {
        primary: boolean;
        source: {
          type: string;
          id: string;
        };
      };
      date: {
        year: number;
        month: number;
        day: number;
      };
    },
    {
      metadata: {
        source: {
          type: string;
          id: string;
        };
      };
      date: {
        year: number;
        month: number;
        day: number;
      };
    },
  ];
};
