import Badge from '@/components/atoms/Badge';
import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import {
  BadgeContainer,
  MyActivityTemplateProps,
} from '@/components/templates/MyPage/MyActivity/MyActivity.template';
import { houseTypesInfo, rentalTypesInfo } from '@/constants/profileDetailInfo';
import { generateUnitByPrice, generateUnitByTerm } from '@/libs/generateUnit';

export default function HouseProfileCard({ user }: MyActivityTemplateProps) {
  return (
    <Container.FlexCol className="rounded-xl bg-brown6 p-8">
      <Container.FlexRow className="items-center gap-x-[1.25rem] pb-8">
        <Icon type="studio-officetel" />
        <Typography.SubTitle2 className="text-brown">
          내가 찾는 집
        </Typography.SubTitle2>
      </Container.FlexRow>
      <Container.FlexCol className="gap-y-5">
        <BadgeContainer>
          <Typography.P3 className="pr-[1.25rem] text-brown">
            유형
          </Typography.P3>
          <Badge.Outline
            className="mr-2"
            hover={false}
            active={false}
            focus={false}
          >
            <Typography.P2>
              {houseTypesInfo[user.user_looking_house.type].text}
            </Typography.P2>
          </Badge.Outline>
          <Badge.Outline hover={false} active={false} focus={false}>
            <Typography.P2>
              {rentalTypesInfo[user.user_looking_house.rental_type]}
            </Typography.P2>
          </Badge.Outline>
        </BadgeContainer>
        <BadgeContainer className="flex-wrap gap-y-4">
          <Typography.P3 className="pr-[1.25rem] text-brown">
            위치
          </Typography.P3>
          {user.user_looking_house.regions &&
            user.user_looking_house.regions.map(region => (
              <Badge.Outline
                key={region}
                hover={false}
                active={false}
                focus={false}
                className="mr-2"
              >
                <Typography.P2>{region}</Typography.P2>
              </Badge.Outline>
            ))}
        </BadgeContainer>
        <BadgeContainer>
          <Typography.P3 className="pr-[1.25rem] text-brown">
            기간
          </Typography.P3>
          <Badge.Outline
            className="mr-2"
            hover={false}
            active={false}
            focus={false}
          >
            <Typography.P2>{`최소 ${generateUnitByTerm(user.user_looking_house.term[0], 25)}부터 최대 ${generateUnitByTerm(user.user_looking_house.term[1], 25)} 까지`}</Typography.P2>
          </Badge.Outline>
        </BadgeContainer>
      </Container.FlexCol>
      <Container.FlexRow className="items-center gap-x-[1.25rem] pb-6 pt-9">
        <Icon type="year-rental-price" />
        <Typography.SubTitle2 className="text-brown">
          가격대
        </Typography.SubTitle2>
      </Container.FlexRow>
      <Container.FlexRow className="flex-wrap gap-4">
        <BadgeContainer>
          <Typography.P3 className="pr-3 text-brown">보증금</Typography.P3>
          <Badge.Outline
            className="!mr-0"
            hover={false}
            active={false}
            focus={false}
          >
            <Typography.P2>{`${generateUnitByPrice(user.user_looking_house.deposit_price[0], 10001)} ~ ${generateUnitByPrice(user.user_looking_house.deposit_price[1], 10001)}`}</Typography.P2>
          </Badge.Outline>
        </BadgeContainer>
        <BadgeContainer>
          <Typography.P3 className="pr-4 text-brown">월세</Typography.P3>
          <Badge.Outline
            className="!mr-0"
            hover={false}
            active={false}
            focus={false}
          >
            <Typography.P2>{`${generateUnitByPrice(user.user_looking_house.monthly_rental_price[0], 501)} ~ ${generateUnitByPrice(user.user_looking_house.monthly_rental_price[1], 501)}`}</Typography.P2>
          </Badge.Outline>
        </BadgeContainer>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
