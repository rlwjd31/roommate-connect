import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import BadgeIcon from '@/components/molecules/BadgeIcon';
import { HouseData } from '@/components/templates/HouseDetail/HouseDetailTemplate';
import {
  genderInfo,
  petInfo,
  smokingInfo,
} from '@/constants/profileDetailInfo';

type UserInfoCardProps = {
  houseData: HouseData;
};

export default function UserInfoCard({ houseData }: UserInfoCardProps) {
  return (
    <Container.FlexCol className="gap-11 text-brown">
      <Container.FlexRow className="items-center gap-4 ">
        <Avatar.XL
          src={houseData.user?.avatar}
          className="hidden mobile:block"
        />
        <Avatar.M
          src={houseData.user?.avatar}
          className="block mobile:hidden"
        />
        <Typography.Head3>{houseData.user?.name}</Typography.Head3>
      </Container.FlexRow>
      <Container.FlexCol className="gap-6">
        <Typography.SubTitle1>자기소개</Typography.SubTitle1>
        <Container.FlexRow className="flex-wrap gap-2">
          <BadgeIcon.Outline iconType={genderInfo[houseData.user.gender].icon}>
            <Typography.P2 className="py-2.5">
              {genderInfo[houseData.user.gender].text}
            </Typography.P2>
          </BadgeIcon.Outline>
          <BadgeIcon.Outline
            iconType={smokingInfo[(houseData.user_lifestyle.smoking)].icon}
          >
            <Typography.P2 className="py-2.5">
              {smokingInfo[houseData.user_lifestyle.smoking].text}
            </Typography.P2>
          </BadgeIcon.Outline>
          <BadgeIcon.Outline
            iconType={petInfo[houseData.user_lifestyle?.pet].icon}
          >
            <Typography.P2 className="py-2.5">
              {petInfo[houseData.user_lifestyle.pet].text}
            </Typography.P2>
          </BadgeIcon.Outline>
        </Container.FlexRow>
      </Container.FlexCol>
      <Container.FlexCol className="gap-6">
        <Typography.SubTitle1>라이프 스타일</Typography.SubTitle1>
        <Container.FlexRow className="flex-wrap gap-x-2 gap-y-3">
          {houseData.user_lifestyle?.appeals.map(appeal => (
            <Badge.Outline
              key={appeal}
              focus={false}
              active={false}
              hover={false}
              className="rounded-3xl px-5 pb-[9px] pt-[10px]"
            >
              <Typography.P2>{appeal}</Typography.P2>
            </Badge.Outline>
          ))}
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
