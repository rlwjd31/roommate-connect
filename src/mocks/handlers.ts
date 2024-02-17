import userSendFriendHandler from '@/mocks/userSendFriendHandler';
import userThemeHandler from '@/mocks/userThemeHandler';
import userProfileHandler from '@/mocks/userProfileHandler';
import userBlockHandler from '@/mocks/userBlockHandler';
import userHouseStatusHandler from '@/mocks/userHouseStatusHandler';
import userBookmarkHandler from '@/mocks/userBookmarkHandler';
import userFriendHandler from '@/mocks/userFriendHandler.ts';
import userAlarmSettingHandler from '@/mocks/userAlarmSettingHandler.ts';
import userActivityHandler from '@/mocks/userActivityHandler.ts';
import userHandler from '@/mocks/userHandler.ts';
import userAuthHandler from '@/mocks/userAuthHandler.ts';

const handlers = [
  ...userSendFriendHandler,
  ...userThemeHandler,
  ...userProfileHandler,
  ...userBlockHandler,
  ...userHouseStatusHandler,
  ...userBookmarkHandler,
  ...userFriendHandler,
  ...userAlarmSettingHandler,
  ...userActivityHandler,
  ...userAuthHandler,
  ...userHandler,
];

export default handlers;
