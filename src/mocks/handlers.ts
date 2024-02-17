import userSendFriendHandler from '@/mocks/userSendFriendHandler';
import userThemeHandler from '@/mocks/userThemeHandler';
import userProfileHandler from '@/mocks/userProfileHandler';
import userBlockHandler from '@/mocks/userBlockHandler';
import userHouseStatusHandler from '@/mocks/userHouseStatusHandler';
import userBookmarkHandler from '@/mocks/userBookmarkHandler';

const handlers = [
  ...userSendFriendHandler,
  ...userThemeHandler,
  ...userProfileHandler,
  ...userBlockHandler,
  ...userHouseStatusHandler,
  ...userBookmarkHandler,
];

export default handlers;
