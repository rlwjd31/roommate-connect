import Badge from '@/components/atoms/Badge';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import BadgeIcon from '@/components/molecules/BadgeIcon';
import {
  BadgeContainer,
  MyActivityTemplateProps,
} from '@/components/templates/MyPage/MyActivity.template';
import {
  genderInfo,
  mateNumInfo,
  petInfo,
  smokingInfo,
} from '@/constants/profileDetailInfo';

export default function UserProfileCard({ user }: MyActivityTemplateProps) {
  return (
    <Container.FlexCol className="rounded-xl bg-brown6 p-8">
      <Container.FlexRow className="items-center">
        <Typography.SubTitle2 className="text-brown">
          자기 소개
        </Typography.SubTitle2>
      </Container.FlexRow>
      <BadgeContainer className="pb-[3.25rem] pt-6">
        {/* TODO IconType 수정  */}
        <BadgeIcon.Outline
          iconType={genderInfo[user.gender].icon}
          iconClassName="h-5.5"
        >
          <Typography.P2 className="pt-1">
            {genderInfo[user.gender].text}
          </Typography.P2>
        </BadgeIcon.Outline>
        <BadgeIcon.Outline
          iconType={
            smokingInfo[
              JSON.stringify(user.user_lifestyle.smoking) as 'true' | 'false'
            ].icon
          }
          iconClassName="h-5"
        >
          <Typography.P2 className="pt-1">
            {
              smokingInfo[
                JSON.stringify(user.user_lifestyle.smoking) as 'true' | 'false'
              ].text
            }
          </Typography.P2>
        </BadgeIcon.Outline>
        <BadgeIcon.Outline
          iconType={petInfo[user.user_lifestyle.pet].icon}
          iconClassName="h-5.5"
        >
          <Typography.P2 className="pt-1">
            {petInfo[user.user_lifestyle.pet].text}
          </Typography.P2>
        </BadgeIcon.Outline>
      </BadgeContainer>
      <Container.FlexRow>
        <Container.FlexCol className="gap-y-5">
          <Typography.SubTitle2 className="text-brown">
            나의 라이프스타일
          </Typography.SubTitle2>
          <BadgeContainer className="pb-[3.25rem]">
            {user.user_lifestyle.appeals &&
              user.user_lifestyle.appeals.map(value => (
                <Badge.Outline
                  key={value}
                  hover={false}
                  active={false}
                  focus={false}
                >
                  <Typography.P2>{value}</Typography.P2>
                </Badge.Outline>
              ))}
          </BadgeContainer>
        </Container.FlexCol>
      </Container.FlexRow>
      <Container.FlexRow>
        <Container.FlexCol>
          <Typography.SubTitle2 className="pb-5 text-brown">
            내가 원하는 룸메이트
          </Typography.SubTitle2>
          <BadgeContainer className="pb-4">
            <BadgeIcon.Outline
              iconType={mateNumInfo[user.user_mate_style.mate_number].icon}
              iconClassName="h-5.5"
            >
              <Typography.P2 className="pt-1">
                {mateNumInfo[user.user_mate_style.mate_number].text}
              </Typography.P2>
            </BadgeIcon.Outline>
            <BadgeIcon.Outline
              iconType={genderInfo[user.user_mate_style.mate_gender].icon}
              iconClassName="h-5.5"
            >
              <Typography.P2 className="pt-1">
                {genderInfo[user.user_mate_style.mate_gender].text}
              </Typography.P2>
            </BadgeIcon.Outline>
          </BadgeContainer>
          <BadgeContainer>
            {user.user_mate_style.mate_appeals &&
              user.user_mate_style.mate_appeals.map(value => (
                <Badge.Outline
                  key={value}
                  hover={false}
                  active={false}
                  focus={false}
                >
                  <Typography.P2>{value}</Typography.P2>
                </Badge.Outline>
              ))}
          </BadgeContainer>
        </Container.FlexCol>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
