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


export default routePaths