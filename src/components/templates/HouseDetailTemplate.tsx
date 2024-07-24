import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Icon from '@/components/atoms/Icon';
import Img from '@/components/atoms/Img';
import TextArea from '@/components/atoms/TextArea';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { supabase } from '@/libs/supabaseClient';
import { UserType } from '@/types/auth.type';
import {
  rentalTypesInfo,
  genderInfo,
  smokingInfo,
  petInfo,
  floorInfo,
  houseTypesInfo,
  mateNumInfo,
} from '@/constants/profileDetailInfo';
import { HouseFormType } from '@/types/house.type';
import { SessionAtom } from '@/stores/auth.store';
import BadgeIcon from '@/components/molecules/BadgeIcon';

// TODO: HouseData Type은 유하꺼랑 합쳐지면 import
type HouseData = Omit<HouseFormType, 'rental_type'> & {
  created_at: string;
  updated_at: string;
  floor: keyof typeof floorInfo;
  user: User | null;
  user_lifestyle: LifeStyle | null;
  rental_type: keyof typeof rentalTypesInfo;
  user_mate_style: MateStyle | null;
};

type User = Pick<UserType, 'id' | 'name' | 'avatar'> & {
  gender: keyof typeof genderInfo;
};

type LifeStyle = {
  smoking: keyof typeof smokingInfo;
  pet: keyof typeof petInfo;
  appeals: string[];
};

type MateStyle = {
  mate_gender: number;
  mate_number: number;
  mate_appeals: string[];
  prefer_mate_age: number[];
};

export default function HouseDetailTemplate() {
  const { houseId } = useParams();
  const [houseData, setHouseData] = useState<HouseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHouseOwner, setIsHouseOwner] = useState(false);
  const session = useRecoilValue(SessionAtom);

  // TODO: try-catch
  const fetchData = async () => {
    const { data: house, error } = await supabase
      .from('house')
      .select(
        `*, user(id, name, avatar, gender), user_lifestyle(smoking, pet, appeals), user_mate_style(mate_gender, mate_number, mate_appeals, prefer_mate_age)`,
      )
      .eq('id', houseId ?? '')
      .single();
    if (error) {
      console.log(error.message);
    }
    return house;
  };

  const fetchBookmark = async () => {
    const { data: user_bookmark, error } = await supabase
      .from('user_bookmark')
      .select('*')
      .eq('id', session?.user.id ?? '')
      .eq('house_id', houseId ?? '')
      .single();
    if (error) {
      console.log('d', error.message);
    }
    return user_bookmark;
  };

  // TODO: 초기 렌더링 / 업데이트 로직 분리
  // TODO: Loading상태에 따른 loading page rendering
  useEffect(() => {
    (async () => {
      const houseUserInfo = await fetchData();
      setHouseData(houseUserInfo as HouseData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(false);
      if (session) {
        const bookmarks = await fetchBookmark();
        console.error('bookmarks=>', bookmarks);
        if (houseData?.user_id === session?.user.id) {
          setIsHouseOwner(true);
        }

        if (bookmarks) {
          setIsBookmarked(true);
        }
      }
    })();
  }, [session, houseData]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // TODO: fallback ui
  if (!houseData) {
    return <h1 className="text-4xl">하우스 데이터 없음...</h1>;
  }

  // houseData
  const { created_at: createdAt, updated_at: updatedAt } = houseData;

  const formDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const termArray = houseData.term.map(value => {
    const years = Math.floor(value / 12);
    const months = value % 12;
    if (years === 0) {
      return `최소 ${months}개월에서 `;
    }
    if (months === 0) {
      return `${years}년 이상`;
    }
    return `${years}년 ${months}개월 이상`;
  });

  return (
    <Container.FlexCol className="gap-8 pb-32 ">
      <Container.FlexRow className="gap-5">
        <Img
          className="size-[390px] laptop:size-[440px] desktop:size-[588px]"
          src={houseData.house_img[0]}
        />
        <Container.Grid className="hidden max-h-[440px] grid-cols-2 grid-rows-2 gap-5 laptop:grid desktop:max-h-[588px]">
          {houseData &&
            houseData.house_img
              .slice(0, 4)
              .map((src, index) => (
                <Img key={src} src={src} alt={`house image ${index + 1}`} />
              ))}
        </Container.Grid>
      </Container.FlexRow>
      <Container.FlexCol>
        <Container.FlexCol className="gap-[3.25rem]">
          <Container.FlexCol className="gap-4">
            <Container.FlexRow className="items-center">
              <Typography.Head2 className="pr-3 text-brown">
                {houseData && houseData.post_title}
              </Typography.Head2>
              {isHouseOwner && (
                <>
                  <Button.Ghost className="p-[0.5625rem] text-brown">
                    <Icon type="edit" className="block tablet:hidden" />
                    <Typography.P3 className="hidden tablet:block">
                      수정
                    </Typography.P3>
                  </Button.Ghost>
                  <Button.Ghost className="p-[0.5625rem] text-brown">
                    <Icon type="delete" className="block tablet:hidden" />
                    <Typography.P3 className="hidden tablet:block ">
                      삭제
                    </Typography.P3>
                  </Button.Ghost>
                </>
              )}
            </Container.FlexRow>
            <Container.FlexRow className="gap-3">
              <Typography.P2 className="text-brown1">
                최근 등록일 {formDate(createdAt)}
              </Typography.P2>
              <Divider.Row className="border-l-0" />
              <Typography.P2 className="text-brown1">
                최근 수정일 {formDate(updatedAt)}
              </Typography.P2>
            </Container.FlexRow>
          </Container.FlexCol>
          <Container.FlexRow className="justify-between	">
            <Container.FlexRow className="gap-3">
              {isHouseOwner ? (
                <Button.Fill className="rounded-lg p-5 text-white">
                  <Typography.P1>신청 현황</Typography.P1>
                </Button.Fill>
              ) : (
                <>
                  <Button.Fill className="rounded-lg p-5 text-white">
                    <Typography.P1>룸메이트 신청</Typography.P1>
                  </Button.Fill>
                  <Button.Outline className="rounded-lg bg-white p-5 text-brown ">
                    <Typography.P1>메시지 보내기</Typography.P1>
                  </Button.Outline>
                </>
              )}
            </Container.FlexRow>
            <Container.FlexRow className="gap-5">
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost
                  iconType={isBookmarked ? 'fill-heart' : 'heart'}
                />
                <Typography.Span1 className="text-brown1">43</Typography.Span1>
              </Container.FlexCol>
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost iconType="share" />
                <Typography.Span1 className="text-brown1">
                  공유
                </Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
          </Container.FlexRow>
        </Container.FlexCol>
        <Divider.Col className="my-8 laptop:my-11" />
        <Container className="flex flex-col justify-between gap-14 laptop:gap-20 desktop:flex-row">
          <Container.FlexCol className="flex-1 gap-11 text-brown">
            <Container.FlexRow className="items-center gap-4 ">
              {/* TODO: Avatar component 적용 */}
              <Img
                className="size-12 shrink-0 cursor-pointer rounded-full bg-transparent shadow-avatar"
                src={houseData.user?.avatar}
              />
              <Typography.Head3>{houseData.user?.name}</Typography.Head3>
            </Container.FlexRow>
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>자기소개</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                <BadgeIcon.Outline
                  iconType={genderInfo[houseData.user.gender].icon}
                >
                  <Typography.P2 className="py-2.5">
                    {genderInfo[houseData.user.gender].text}
                  </Typography.P2>
                </BadgeIcon.Outline>
                <BadgeIcon.Outline
                  iconType={smokingInfo[houseData.user_lifestyle.smoking].icon}
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
                {houseData.user_lifestyle?.appeals.map(value => (
                  <Badge.Outline
                    key={value}
                    focus={false}
                    active={false}
                    hover={false}
                    className="rounded-3xl px-5 pb-[9px] pt-[10px]"
                  >
                    <Typography.P2>{value}</Typography.P2>
                  </Badge.Outline>
                ))}
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexCol>
          <Container.FlexCol className="flex-1 gap-10 rounded-lg bg-brown6 px-[0.65625rem] py-[1.8125rem] text-brown laptop:gap-11 laptop:p-8">
            <Container.FlexCol className="gap-5 ">
              <Container.FlexRow className="gap-4">
                <Container.FlexRow className="gap-2">
                  <Typography.Head3>
                    {rentalTypesInfo[houseData.rental_type]}
                  </Typography.Head3>
                  <Typography.Head3>
                    {houseData.deposit_price}/{houseData.monthly_price}
                  </Typography.Head3>
                </Container.FlexRow>
                <Divider.Col />
                <Typography.P1 className="leading-6">
                  관리비 {houseData.manage_price}만원
                </Typography.P1>
              </Container.FlexRow>
              <Typography.P2>
                {houseData.region}시 {houseData.district}
              </Typography.P2>
            </Container.FlexCol>
            <Container.FlexCol className="gap-5">
              <Typography.SubTitle1>하우스 소개</Typography.SubTitle1>
              <Container.FlexRow className="items-center gap-3">
                <Icon type={houseTypesInfo[houseData.house_type].icon} />
                <Badge.Fill
                  active={false}
                  focus={false}
                  hover={false}
                  className="rounded-3xl px-5 py-2 text-white"
                >
                  <Typography.P2>
                    {houseTypesInfo[houseData.house_type].text}
                  </Typography.P2>
                </Badge.Fill>
                <Container.FlexRow className="gap-3 ">
                  <Typography.P2>{houseData.house_size}평</Typography.P2>
                  <Divider.Col />
                  <Typography.P2>방 {houseData.room_num}개</Typography.P2>
                  <Divider.Col />
                  <Typography.P2>{floorInfo[houseData.floor]}</Typography.P2>
                </Container.FlexRow>
              </Container.FlexRow>
            </Container.FlexCol>
            <Container.FlexCol className="gap-5">
              <Typography.SubTitle1>이런 특징이 있어요</Typography.SubTitle1>
              <Container.FlexRow className="flex-wrap gap-x-2 gap-y-3">
                {houseData.house_appeal.map(value => (
                  <Badge.Fill
                    focus={false}
                    hover={false}
                    active={false}
                    className="rounded-3xl px-5 py-2 text-white"
                    key={value}
                  >
                    <Typography.P2>{value}</Typography.P2>
                  </Badge.Fill>
                ))}
              </Container.FlexRow>
            </Container.FlexCol>
            {/* //!TODO: UI 수정 및 데이터 user_mate_style 에서 가져오기 */}
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>원하는 룸메이트</Typography.SubTitle1>
              <Container.FlexRow className="items-center gap-5">
                <Typography.SubTitle3>기간</Typography.SubTitle3>
                <Badge.Outline
                  className="rounded-full px-4"
                  focus={false}
                  active={false}
                  hover={false}
                >
                  <Typography.P2 className="py-2.5">{termArray}</Typography.P2>
                </Badge.Outline>
              </Container.FlexRow>
              <Container.FlexCol className="gap-3">
                <Container.FlexRow className="items-center gap-5">
                  <Typography.SubTitle3>특징</Typography.SubTitle3>
                  <Container.FlexRow className="gap-2">
                    <BadgeIcon.Outline
                      iconType={
                        genderInfo[houseData.user_mate_style.mate_gender].icon
                      }
                    >
                      <Typography.P2 className="py-2.5">
                        {genderInfo[houseData.user_mate_style.mate_gender].text}
                      </Typography.P2>
                    </BadgeIcon.Outline>
                    <BadgeIcon.Outline
                      iconType={
                        mateNumInfo[houseData.user_mate_style?.mate_number].icon
                      }
                    >
                      <Typography.P2>
                        {
                          mateNumInfo[houseData.user_mate_style?.mate_number]
                            .text
                        }
                      </Typography.P2>
                    </BadgeIcon.Outline>
                    <Badge.Outline
                      className="rounded-full px-4"
                      focus={false}
                      active={false}
                      hover={false}
                    >
                      <Typography.P2>
                        {houseData.user_mate_style.prefer_mate_age[0]}살-
                        {houseData.user_mate_style.prefer_mate_age[1]}살
                      </Typography.P2>
                    </Badge.Outline>
                  </Container.FlexRow>
                </Container.FlexRow>
                <Container.FlexRow className="flex-wrap items-center gap-x-2 gap-y-3 pl-[3.125rem]">
                  {houseData.user_mate_style.mate_appeals.map(value => (
                    <Badge.Outline
                      focus={false}
                      active={false}
                      hover={false}
                      className="rounded-full px-4"
                      key={value}
                    >
                      <Typography.P2 className="py-2.5">{value}</Typography.P2>
                    </Badge.Outline>
                  ))}
                </Container.FlexRow>
              </Container.FlexCol>
            </Container.FlexCol>
          </Container.FlexCol>
        </Container>
        <Container.FlexCol className="gap-7 py-[3.25rem] text-brown laptop:py-[4.5rem] ">
          <Typography.SubTitle1>상세설명</Typography.SubTitle1>
          <Container.FlexCol className="rounded-lg bg-brown6 p-8">
            <pre className="whitespace-pre-wrap leading-5">
              {houseData.describe}
            </pre>
          </Container.FlexCol>
        </Container.FlexCol>
        <Divider.Row />
        <Container.FlexCol className="gap-8 pt-8">
          <Typography.SubTitle1 className="text-brown">
            댓글 2개
          </Typography.SubTitle1>
          <Container.FlexCol className="items-center gap-8 laptop:items-end">
            <TextArea
              type="text"
              name="comment"
              className="min-h-[11.5625rem] overflow-scroll"
              placeholder="댓글을 남겨보세요."
              rows={5}
            />
            <Button.Fill className="w-full justify-center rounded-lg py-4 text-white laptop:w-auto laptop:px-10 laptop:py-[1.125rem]">
              <Typography.SubTitle3>등록</Typography.SubTitle3>
            </Button.Fill>
          </Container.FlexCol>
        </Container.FlexCol>
      </Container.FlexCol>
      <Container.FlexCol>
        <Container.FlexCol className="gap-7 py-[1.875rem]">
          <Container.FlexRow className="justify-between">
            <Container.FlexRow className="items-center gap-[0.9375rem] ">
              <Icon type="avatar" />
              <Container.FlexCol className="gap-3 text-brown">
                <Typography.P1>user123</Typography.P1>
                <Typography.Span1>1시간 전</Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
            <Container.FlexRow className="gap-2 text-brown">
              <Button.Ghost className="p-[0.625rem]">
                <Typography.P2>답변</Typography.P2>
              </Button.Ghost>
              <Button.Ghost className="p-[0.625rem]">
                <Typography.P2>수정</Typography.P2>
              </Button.Ghost>
              <Button.Ghost className="p-[0.625rem]">
                <Typography.P2>삭제</Typography.P2>
              </Button.Ghost>
            </Container.FlexRow>
          </Container.FlexRow>
          <Typography.P2 className="text-brown">신청 보내봅니다!</Typography.P2>
        </Container.FlexCol>
        <Divider.Col className="mb-8" />
        <Container.FlexCol className="gap-7 py-[1.875rem]">
          <Container.FlexRow className="justify-between">
            <Container.FlexRow className="items-center gap-[0.9375rem] ">
              <Icon type="avatar" />
              <Container.FlexCol className="gap-3 text-brown">
                <Typography.P1>user1234</Typography.P1>
                <Typography.Span1>1시간 전</Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
            <Container.FlexRow className="gap-2 text-brown">
              <Button.Ghost className="p-[0.625rem]">
                <Typography.P2>답변</Typography.P2>
              </Button.Ghost>
            </Container.FlexRow>
          </Container.FlexRow>
          <Typography.P2 className="text-brown">
            보증금 올리고 월세 낮춰도 될까요?
          </Typography.P2>
        </Container.FlexCol>
        <Divider.Col className="mb-8" />
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
