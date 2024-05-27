import { Session } from '@supabase/supabase-js';
import { z } from 'zod';

// * Email 로그인 검증 및 타입
export const EmailAuth = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' }),
  password: z
    .string({ required_error: '암호를 입력해주세요.' })
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
});
export type EmailAuthType = z.infer<typeof EmailAuth>;

// * 미인증 유저가 로그인 할 경우 인증할 때 사용할 타입
export const VerifyEmail = EmailAuth.pick({ email: true }).extend({
  token: z
    .string({ required_error: '인증번호을 입력해주세요' })
    .length(6, { message: '인증번호는 6자입니다.' }),
});
export type VerifyEmailType = z.infer<typeof VerifyEmail>;

// * 추가 과정(API)이 필요한 데이터 타입
export type UserAdditionalType = {
  birth?: number;
  gender?: number;
};
const UserAdditional = z.object({
  birth: z.number().optional(),
  gender: z.number().optional(),
});
export type UserAdditionalType = z.infer<typeof UserAdditional>;

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
