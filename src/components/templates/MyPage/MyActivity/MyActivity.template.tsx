import { ReactNode } from 'react';

import { UserInfoType } from '@/hooks/useUserInfo';
import Avatar from '@/components/atoms/Avatar';
import Container from '@/components/atoms/Container';
import BadgeButton from '@/components/molecules/BadgeButton';
import Typography from '@/components/atoms/Typography';
import Link from '@/components/atoms/Link';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import useModal from '@/hooks/useModal';
import { ProfileModifyModalState } from '@/types/modal.type';
import { routePaths } from '@/constants/route';
import MyActivityTap from '@/components/templates/MyPage/MyActivity/MyActivityTap';
import HouseProfileCard from '@/components/templates/MyPage/MyActivity/HouseProfileCard';
import UserProfileCard from '@/components/templates/MyPage/MyActivity/UserProfileCard';

export type MyActivityTemplateProps = {
  user: UserInfoType;
};

export function BadgeContainer({
  children,
  className,
}: {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}) {
  return (
    <Container.FlexRow
      className={`flex-wrap items-center gap-y-4 [&>div]:mr-2 [&>div]:rounded-full [&>div]:px-4 [&>div]:pb-[0.5625rem] [&>div]:pt-[0.6875rem] ${className} `}
    >
      {children}
    </Container.FlexRow>
  );
}

export default function MyActivityTemplate(props: MyActivityTemplateProps) {
  const { user } = props;

  const { setModalState: setProfileModifyModal } = useModal('ProfileModify');

  const profileModifyContext: ProfileModifyModalState = {
    isOpen: true,
    type: 'ProfileModify',
    userInfo: {
      ...user.user_mate_style,
      ...user.user_lifestyle,
      ...user.user_looking_house,
      ...user,
    },
  };

  return (
    <>
      <Container.FlexCol className="mb-8 gap-y-8">
        <Container.FlexRow className="gap-x-7 border-b-[0.5px] border-brown pb-8">
          <Avatar.XXL src={user.avatar} />
          <Container.FlexCol className="gap-y-3 pt-[1.625rem]">
            <Container.FlexRow className="items-center gap-x-3">
              <Typography.SubTitle1 className="text-brown">
                {user.nickname}님
              </Typography.SubTitle1>
              <Link to={routePaths.myAccount}>
                <BadgeButton.Outline
                  className="gap-x-[0.625rem] rounded-[1.875rem] px-4 py-[0.625rem]"
                  iconType="next"
                  iconClassName="h-[0.6875rem] w-[0.375rem]"
                >
                  계정 설정
                </BadgeButton.Outline>
              </Link>
            </Container.FlexRow>
            <Typography.P3 className="text-brown1">@{user.name}</Typography.P3>
          </Container.FlexCol>
        </Container.FlexRow>
        <Container.FlexRow className="items-center gap-x-3">
          <Typography.SubTitle1 className="text-brown">
            내 프로필 카드
          </Typography.SubTitle1>
          <Button.Outline
            className="rounded-[30px] px-4 py-[0.625rem]"
            onClick={() => setProfileModifyModal(profileModifyContext)}
          >
            <Typography.Span1 className="text-brown">수정</Typography.Span1>
          </Button.Outline>
        </Container.FlexRow>
        <Container.Grid className="gap-6 laptop:grid-cols-2">
          <HouseProfileCard user={user} />
          <UserProfileCard user={user} />
        </Container.Grid>
      </Container.FlexCol>
      <MyActivityTap />
    </>
  );
}
