const routePaths = {
  root: '/',
  about: '/about',
  chat: '/chat',
  chatRoom: (chatRoomId?: string) =>
    chatRoomId ? `/chat/${chatRoomId}` : '/chat/:chatRoomId',
  lounge: '/lounge',
  house: '/house',
  houseRegister: '/house/regist',
  houseEdit: (houseId?: string) =>
    houseId ? `/house/edit/${houseId}` : '/house/edit/:houseId',
  houseDetail: (houseId?: string) =>
    houseId ? `/house/${houseId}` : '/house/:houseId',
  sign: '/sign',
  signIn: '/sign/in',
  signUp: '/sign/up',
  signUpEmail: '/sign/up/email',
  signUpInfo: '/sign/up/info',
  signPasswordReset: '/sign/password',
  signUpdatePassword: '/sign/update-password',
  signUpProfileIntro: '/signup-intro',
  signUpProfile: '/signup-profile',
  signUpProfileOutro: '/signup-outro',
  componentTest: '/component-test',
  myPage: '/mypage',
  myActivity: '/mypage/activity',
  myBookmark: '/mypage/bookmark',
  myAccount: '/mypage/account',
  myMate: '/mypage/mate',
  myAlarm: '/mypage/alarm',
  myTheme: '/mypage/theme',
} as const;

const routeHeaderInfo: {
  [key in keyof typeof routePaths | 'default']: {
    logo?: boolean;
    gnb?: boolean;
    userMenu?: boolean;
    gnbBottomSTablet?: boolean;
  };
} = {
  default: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  root: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  about: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  chat: {
    logo: true,
    gnb: true,
    userMenu: true,
    gnbBottomSTablet: true,
  },
  chatRoom: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  lounge: {
    logo: true,
    gnb: true,
    userMenu: true,
    gnbBottomSTablet: true,
  },
  house: {
    logo: true,
    gnb: true,
    userMenu: true,
    gnbBottomSTablet: true,
  },
  houseRegister: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  houseEdit: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  houseDetail: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  sign: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signIn: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signUp: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signUpEmail: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signUpInfo: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signPasswordReset: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signUpdatePassword: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signUpProfileIntro: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signUpProfile: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  signUpProfileOutro: {
    logo: true,
    gnb: false,
    userMenu: false,
  },
  componentTest: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myPage: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myActivity: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myBookmark: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myAccount: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myMate: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myAlarm: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
  myTheme: {
    logo: true,
    gnb: true,
    userMenu: true,
  },
} as const;

export { routePaths, routeHeaderInfo };
