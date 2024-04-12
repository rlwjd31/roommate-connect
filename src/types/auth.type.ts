export type EmailAuthType = {
  email: string;
  password: string;
};
export type UserAdditionalType = {
  birth?: number;
  gender?: number;
};
export type UserType = UserAdditionalType & {
  avatar: string;
  email: string;
  id: string;
  name: string;
  nickname: string | null;
  status: number;
};

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
